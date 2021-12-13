import { LineString } from '@turf/helpers';
import { mapsDataLoaded } from 'fm3/actions/mapsActions';
import {
  Alternative,
  Leg,
  routePlannerAddMidpoint,
  routePlannerPreventHint,
  routePlannerRemoveMidpoint,
  routePlannerSetFinish,
  routePlannerSetMidpoint,
  routePlannerSetMode,
  routePlannerSetParams,
  routePlannerSetResult,
  routePlannerSetStart,
  routePlannerSetTransportType,
  routePlannerSetWeighting,
  routePlannerSwapEnds,
  Step,
  Waypoint,
} from 'fm3/actions/routePlannerActions';
import { ToastAction, toastsAdd } from 'fm3/actions/toastsActions';
import { httpRequest } from 'fm3/httpRequest';
import { Processor } from 'fm3/middlewares/processorMiddleware';
import { objectToURLSearchParams } from 'fm3/stringUtils';
import { transportTypeDefs } from 'fm3/transportTypeDefs';
import { isActionOf } from 'typesafe-actions';
import { assertType } from 'typescript-is';

const updateRouteTypes = [
  routePlannerSetStart,
  routePlannerSetFinish,
  routePlannerSwapEnds,
  routePlannerAddMidpoint,
  routePlannerSetMidpoint,
  routePlannerRemoveMidpoint,
  routePlannerSetTransportType,
  routePlannerSetMode,
  routePlannerSetParams,
  routePlannerSetWeighting,
  mapsDataLoaded,
];

enum GraphhopperSign {
  UNKNOWN = -99,
  U_TURN_UNKNOWN = -98,
  U_TURN_LEFT = -8,
  KEEP_LEFT = -7,
  LEAVE_ROUNDABOUT = -6,
  TURN_SHARP_LEFT = -3,
  TURN_LEFT = -2,
  TURN_SLIGHT_LEFT = -1,
  CONTINUE_ON_STREET = 0,
  TURN_SLIGHT_RIGHT = 1,
  TURN_RIGHT = 2,
  TURN_SHARP_RIGHT = 3,
  FINISH = 4,
  REACHED_VIA = 5,
  USE_ROUNDABOUT = 6,
  IGNORE = -2147483648,
  KEEP_RIGHT = 7,
  U_TURN_RIGHT = 8,
  PT_START_TRIP = 101,
  PT_TRANSFER = 102,
  PT_END_TRIP = 103,
}

type GraphhopperInstruction = {
  distance: number;
  heading?: number;
  sign: GraphhopperSign;
  interval: [number, number];
  text: string;
  time: number;
  street_name: string;
  exit_number?: number; // only for USE_ROUNDABOUT instructions
  turn_angle?: number; // only for USE_ROUNDABOUT instructions
};

type GraphhopperPath = {
  distance: number;
  weight: number;
  time: number;
  transfers: number;
  points_encoded: boolean;
  bbox: [number, number, number, number];
  points: LineString;
  instructions: GraphhopperInstruction[];
  legs?: unknown[]; // missing in doc
  details: Record<string, [number, number, unknown][]>; // eg. {"street_name": [[0,2,"Frankfurter Straße"],[2,6,"Zollweg"]]}
  ascend: number;
  descend: number;
  snapped_waypoints: unknown; // LineString;
  points_order?: number[]; // Only present if the optimize parameter was used.
};

type GraphhopperResult = {
  paths: GraphhopperPath[];
};

type OsrmResult = {
  code: string;
  trips?: Alternative[];
  routes?: Alternative[];
  waypoints?: Waypoint[];
};

export const routePlannerFindRouteProcessor: Processor = {
  actionCreator: updateRouteTypes,
  id: 'routePlanner',
  errorKey: 'routePlanner.fetchingError',
  handle: async ({ dispatch, getState, action }) => {
    const {
      start,
      finish,
      midpoints,
      transportType,
      mode,
      weighting: weig,
    } = getState().routePlanner;

    if (!start || !finish || !transportType) {
      return;
    }

    const ttDef = transportTypeDefs[transportType];

    if (!ttDef) {
      throw new Error(`unknown transport type: ${transportType}`);
    }

    const clearResultAction = routePlannerSetResult({
      timestamp: Date.now(),
      transportType,
      alternatives: [],
      waypoints: [],
    });

    const rnfToastAction = toastsAdd({
      id: 'routePlanner',
      messageKey: 'routePlanner.routeNotFound',
      style: 'warning',
      timeout: 5000,
    });

    let data: unknown;

    try {
      if (ttDef.api === 'gh') {
        const weighting =
          weig === 'fastest' && ttDef.vehicle === 'wheelchair'
            ? 'short_fastest'
            : weig;

        const response = await httpRequest({
          getState,
          method: 'POST',
          // url: 'https://local.gruveo.com/gh/route',
          url: 'https://graphhopper.freemap.sk/route',
          data: {
            // avoid: 'toll', // wut? doesn't work
            // snap_preventions: ['trunk', 'motorway'], // without effect

            // elevation: true, // if to return also elevations

            algorithm: midpoints.length > 0 ? undefined : 'alternative_route',

            // algorithm: 'round_trip',
            // 'round_trip.distance': 50000,
            // 'round_trip.seed': 17,

            'ch.disable':
              ttDef.vehicle === 'wheelchair'
                ? weighting !== 'short_fastest'
                : weighting !== 'fastest',

            'alternative_route.max_paths': 2, // default is 2
            // 'alternative_route.max_weight_factor': 1.4,
            // 'alternative_route.max_paths': 0.6,

            instructions: true,
            details:
              ttDef.vehicle === 'bike2' ||
              ttDef.vehicle === 'mtb' ||
              ttDef.vehicle === 'racingbike'
                ? ['get_off_bike']
                : undefined,

            // profile: ttDef.profile,
            // profile: 'wheelchair',

            weighting, // fastest|short_fastest|shortest|curvature

            // turn_costs: true,
            vehicle: ttDef.vehicle,

            // optimize: String(mode === 'trip'), // not included in (free) directions API
            points_encoded: false,
            locale: getState().l10n.language,
            points: [
              [start.lon, start.lat],
              ...midpoints.map((mp) => [mp.lon, mp.lat]),
              [finish.lon, finish.lat],
            ],
          },
          expectedStatus: [200, 400],
          cancelActions: updateRouteTypes,
        });

        data = await response.json();

        if (response.status === 400) {
          dispatch(clearResultAction);

          let err: string | undefined;

          if (
            data &&
            typeof data === 'object' &&
            typeof (data as any)['message'] === 'string'
          ) {
            const msg = String((data as any)['message']);

            if (
              msg.startsWith('Cannot find point ') ||
              msg.startsWith('Connection between locations not found')
            ) {
              dispatch(rnfToastAction);
            } else {
              err = msg;
            }
          } else {
            err = '?';
          }

          if (err) {
            dispatch(
              toastsAdd({
                id: 'routePlanner',
                messageKey: 'general.operationError',
                messageParams: { err },
                style: 'danger',
                timeout: 5000,
              }),
            );
          }

          return;
        }
      } else {
        const allPoints = [
          [start.lon, start.lat].join(','),
          ...midpoints.map((mp) => [mp.lon, mp.lat].join(',')),
          [finish.lon, finish.lat].join(','),
        ].join(';');

        const response = await httpRequest({
          getState,
          url:
            `${ttDef.url.replace(
              '$MODE',
              mode === 'route' ? 'route' : 'trip',
            )}/${allPoints}?` +
            objectToURLSearchParams({
              alternatives: mode === 'route' || undefined,
              steps: true,
              geometries: 'geojson',
              roundtrip:
                mode === 'roundtrip'
                  ? true
                  : mode === 'trip'
                  ? false
                  : undefined,
              source: mode === 'route' ? undefined : 'first',
              destination: mode === 'trip' ? 'last' : undefined,
              // continue_straight: true,
              exclude: ttDef.exclude,
            }),
          expectedStatus: [200, 400],
          cancelActions: updateRouteTypes,
        });

        data = await response.json();
      }
    } catch (err) {
      dispatch(clearResultAction);

      throw err;
    }

    if (ttDef.api === 'gh') {
      const g = assertType<GraphhopperResult>(data);

      dispatch(
        routePlannerSetResult({
          timestamp: Date.now(),
          transportType,
          alternatives: g.paths.map((p) => ({
            duration: p.time,
            distance: p.distance,
            legs: (() => {
              let dist = 0;

              let time = 0;

              const legs: Leg[] = [];

              let steps: Step[] = [];

              const gob = (p.details['get_off_bike'] ?? []).filter((q) => q[2]);

              for (const instruction of p.instructions) {
                dist += instruction.distance;

                time += instruction.time;

                steps.push({
                  duration: instruction.time / 1000,
                  distance: instruction.distance,
                  // TODO
                  maneuver: {
                    // location: [0, 0],
                    type: 'continue',
                  },
                  name: instruction.text,
                  mode: gob.some(
                    (seg) =>
                      instruction.interval[0] >= seg[0] &&
                      instruction.interval[1] <= seg[1],
                  )
                    ? 'foot'
                    : 'cycling', // TODO for non-cycling...; TODO can it happen that not whole interval has the same GOB value?
                  geometry: {
                    coordinates: p.points.coordinates.slice(
                      instruction.interval[0],
                      instruction.interval[1] + 1,
                    ) as [number, number][],
                  },
                });

                if (
                  instruction.sign === GraphhopperSign.FINISH ||
                  instruction.sign === GraphhopperSign.REACHED_VIA
                ) {
                  legs.push({
                    distance: dist,
                    duration: time / 1000,
                    steps,
                  });

                  dist = 0;

                  time = 0;

                  steps = [];
                }
              }

              return legs;
            })(),
          })),
          waypoints: [],
        }),
      );
    } else {
      const { code, trips, routes, waypoints } = assertType<OsrmResult>(data);

      if (code !== 'Ok') {
        dispatch(clearResultAction);

        dispatch(rnfToastAction);

        return;
      }

      const alternatives = routes || trips || [];

      // const alts = routes || trips || [];
      //
      // const alternatives: Alternative[] =
      //   transportType === 'imhd'
      //     ? alts.map((alt: Alternative) => addMissingSegments(alt))
      //     : alts;

      dispatch(
        routePlannerSetResult({
          timestamp: Date.now(),
          transportType,
          alternatives,
          waypoints: waypoints ?? [],
        }),
      );
    }

    const showHint =
      // TODO ??? !getState().routePlanner.shapePoints &&
      !getState().routePlanner.preventHint &&
      !midpoints.length &&
      isActionOf([routePlannerSetStart, routePlannerSetFinish], action);

    if (showHint) {
      const actions: ToastAction[] = [{ nameKey: 'general.ok' }];

      if (getState().main.cookieConsentResult) {
        actions.push({
          nameKey: 'general.preventShowingAgain',
          action: routePlannerPreventHint(),
        });
      }

      dispatch(
        toastsAdd({
          id: 'routePlanner.showMidpointHint',
          messageKey: 'routePlanner.showMidpointHint',
          style: 'info',
          actions,
        }),
      );
    }
  },
};

// function coord(step: Step) {
//   return step.geometry.coordinates;
// }
//
// function addMissingSegments(alt: Alternative) {
//   const steps: Step[] = [];
//
//   const routeSteps = alt.legs.flatMap((leg) => leg.steps);
//
//   for (let i = 0; i < routeSteps.length; i += 1) {
//     const step = routeSteps[i];
//
//     const prevStep = routeSteps[i - 1];
//
//     const nextStep = routeSteps[i + 1];
//
//     const prevStepLastPoint = prevStep
//       ? coord(prevStep)[coord(prevStep).length - 1]
//       : null;
//
//     const firstPoint = coord(step)[0];
//
//     const lastShapePoint = coord(step)[coord(step).length - 1];
//
//     const nextStepFirstPoint = nextStep?.geometry.coordinates[0] ?? null;
//
//     const c = coord(step);
//
//     const coordinates = [c[0], c[1]];
//
//     if (step.mode === 'foot') {
//       if (
//         prevStepLastPoint &&
//         (Math.abs(prevStepLastPoint[0] - firstPoint[0]) > 0.0000001 ||
//           Math.abs(prevStepLastPoint[1] - firstPoint[1]) > 0.0000001)
//       ) {
//         coordinates.unshift(prevStepLastPoint);
//       }
//
//       if (
//         nextStepFirstPoint &&
//         (Math.abs(nextStepFirstPoint[0] - lastShapePoint[0]) > 0.0000001 ||
//           Math.abs(nextStepFirstPoint[1] - lastShapePoint[1]) > 0.0000001)
//       ) {
//         coordinates.push(nextStepFirstPoint);
//       }
//     }
//
//     steps.push({
//       ...step,
//       geometry: { coordinates },
//     });
//   }
//
//   return { ...alt, itinerary: steps };
// }
