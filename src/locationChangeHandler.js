import queryString from 'query-string';

import { getMapStateFromUrl, getMapStateDiffFromUrl } from 'fm3/urlMapUtils';
import {
  getTrasformedParamsIfIsOldEmbeddedFreemapUrl,
  getInfoPointDetailsIfIsOldEmbeddedFreemapUrlFormat2,
} from 'fm3/oldFreemapUtils';
import refModals from 'fm3/refModals';
import tips from 'fm3/tips/index.json';

import {
  setActiveModal,
  setTool,
  setEmbedFeatures,
} from 'fm3/actions/mainActions';
import { mapRefocus } from 'fm3/actions/mapActions';
import { routePlannerSetParams } from 'fm3/actions/routePlannerActions';
import {
  trackViewerDownloadTrack,
  trackViewerColorizeTrackBy,
  trackViewerGpxLoad,
} from 'fm3/actions/trackViewerActions';
import {
  osmLoadNode,
  osmLoadWay,
  osmLoadRelation,
  osmClear,
} from 'fm3/actions/osmActions';
import {
  infoPointAdd,
  infoPointChangeLabel,
  infoPointSetAll,
} from 'fm3/actions/infoPointActions';
import {
  galleryRequestImage,
  gallerySetFilter,
  galleryShowFilter,
  galleryShowUploadModal,
  galleryClear,
  galleryHideFilter,
  galleryHideUploadModal,
} from 'fm3/actions/galleryActions';
import {
  changesetsSetDays,
  changesetsSetAuthorName,
  changesetsSet,
} from 'fm3/actions/changesetsActions';
import { distanceMeasurementSetPoints } from 'fm3/actions/distanceMeasurementActions';
import { areaMeasurementSetPoints } from 'fm3/actions/areaMeasurementActions';
import { elevationMeasurementSetPoint } from 'fm3/actions/elevationMeasurementActions';
import { tipsShow } from 'fm3/actions/tipsActions';
import { authChooseLoginMethod, authLoginClose } from 'fm3/actions/authActions';
import {
  trackingSetTrackedDevices,
  trackingSetActive,
} from './actions/trackingActions';

const tipKeys = tips.map(([key]) => key);

export default function handleLocationChange(store, location) {
  const { getState, dispatch: dispatch0 } = store;

  const dispatch = action => {
    dispatch0({
      ...action,
      meta: { ...(action.meta || {}), isLocationChange: true },
    });
  };

  const query = queryString.parse(location.search);

  {
    const points = query.points
      ? query.points
          .split(',')
          .map(point =>
            point ? point.split('/').map(coord => parseFloat(coord)) : null,
          )
      : [];
    const pointsOk =
      points.length &&
      points.every(
        (point, i) => point !== null || (i === 0 || i === points.length - 1),
      );
    // || points.length === 2 && !Number.isNaN(point[0]) && !Number.isNaN(point[1]));

    if (
      /^(car|car-free|foot|bike|foot-stroller|ski|nordic|imhd|bikesharing)$/.test(
        query.transport,
      ) &&
      pointsOk
    ) {
      const {
        start,
        finish,
        midpoints,
        transportType,
        mode,
      } = getState().routePlanner;

      const latLons = points.map(point =>
        point ? { lat: point[0], lon: point[1] } : null,
      );
      const nextStart = latLons[0];
      const nextMidpoints = latLons.slice(1, latLons.length - 1);
      const nextFinish =
        latLons.length > 1 ? latLons[latLons.length - 1] : null;

      if (
        query.transport !== transportType ||
        serializePoint(start) !== serializePoint(nextStart) ||
        serializePoint(finish) !== serializePoint(nextFinish) ||
        midpoints.length !== nextMidpoints.length ||
        midpoints.some(
          (midpoint, i) =>
            serializePoint(midpoint) !== serializePoint(nextMidpoints[i]),
        ) ||
        (mode === 'route' ? undefined : mode) !== query['route-mode']
      ) {
        dispatch(
          routePlannerSetParams(
            nextStart,
            nextFinish,
            nextMidpoints,
            query.transport,
            ['trip', 'roundtrip'].includes(query['route-mode'])
              ? query['route-mode']
              : 'route',
          ),
        );
      }
    } else if (
      getState().routePlanner.start ||
      getState().routePlanner.finish
    ) {
      dispatch(
        routePlannerSetParams(
          null,
          null,
          [],
          getState().routePlanner.transportType,
        ),
      );
    }
  }

  if (getState().main.tool !== (query.tool || null)) {
    dispatch(setTool(query.tool || null));
  }

  const trackUID = query['track-uid'];
  if (trackUID && getState().trackViewer.trackUID !== trackUID) {
    dispatch(trackViewerDownloadTrack(trackUID));
  }

  const colorizeTrackBy = query['track-colorize-by'];
  if (colorizeTrackBy) {
    if (getState().trackViewer.colorizeTrackBy !== colorizeTrackBy) {
      dispatch(trackViewerColorizeTrackBy(colorizeTrackBy));
    }
  } else if (getState().trackViewer.colorizeTrackBy) {
    dispatch(trackViewerColorizeTrackBy(null));
  }

  handleInfoPoint(getState, dispatch, query);

  if (query['changesets-days']) {
    const urlDays = parseInt(query['changesets-days'], 10);
    const reduxDays = getState().changesets.days;
    if (reduxDays !== urlDays) {
      dispatch(changesetsSetDays(urlDays));
    }

    const reduxAuthor = getState().changesets.authorName;
    const urlAuthor = query['changesets-author'];
    if (urlAuthor && reduxAuthor !== urlAuthor) {
      // we need timeout otherwise map bounds can't be read
      setTimeout(() => {
        dispatch(changesetsSetAuthorName(urlAuthor));
      }, 1000);
    }
  } else if (getState().changesets.changesets.length) {
    dispatch(changesetsSetDays(null));
    dispatch(changesetsSetAuthorName(null));
    dispatch(changesetsSet([]));
  }

  ['distance', 'area'].forEach(type => {
    const pq = query[`${type}-measurement-points`];
    if (pq) {
      const measurePoints = pq
        .split(',')
        .map(point => point.split('/').map(coord => parseFloat(coord)))
        .map((pair, id) => ({ lat: pair[0], lon: pair[1], id }));
      if (
        serializePoints(measurePoints) !==
        serializePoints(getState()[`${type}Measurement`].points)
      ) {
        dispatch(
          (type === 'distance'
            ? distanceMeasurementSetPoints
            : areaMeasurementSetPoints)(
            measurePoints.some(
              ({ lat, lon }) => Number.isNaN(lat) || Number.isNaN(lon),
            )
              ? []
              : measurePoints,
          ),
        );
      }
    } else if (getState()[`${type}Measurement`].points.length) {
      dispatch(
        (type === 'distance'
          ? distanceMeasurementSetPoints
          : areaMeasurementSetPoints)([]),
      );
    }
  });

  const emMatch = /^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/.exec(
    query['elevation-measurement-point'] || '',
  );
  if (emMatch) {
    const point = { lat: parseFloat(emMatch[1]), lon: parseFloat(emMatch[2]) };
    if (
      serializePoint(point) !==
      serializePoint(getState().elevationMeasurement.point)
    ) {
      dispatch(elevationMeasurementSetPoint(point));
    }
  } else if (getState().elevationMeasurement.point) {
    dispatch(elevationMeasurementSetPoint(null));
  }

  if (getTrasformedParamsIfIsOldEmbeddedFreemapUrl(location)) {
    const { lat, lon } = getTrasformedParamsIfIsOldEmbeddedFreemapUrl(location);
    dispatch(infoPointAdd(lat, lon));
  }

  if (getInfoPointDetailsIfIsOldEmbeddedFreemapUrlFormat2(location)) {
    const {
      lat,
      lon,
      label,
    } = getInfoPointDetailsIfIsOldEmbeddedFreemapUrlFormat2(location);
    dispatch(infoPointAdd(lat, lon));
    if (label) {
      dispatch(infoPointChangeLabel(label));
    }
  }

  const gpxUrl = query['gpx-url'] || query.load; /* backward compatibility */
  if (gpxUrl && gpxUrl !== getState().trackViewer.gpxUrl) {
    dispatch(trackViewerGpxLoad(gpxUrl));
  }

  const osmNodeId = parseInt(query['osm-node'], 10);
  if (osmNodeId) {
    if (osmNodeId !== getState().trackViewer.osmNodeId) {
      dispatch(osmLoadNode(osmNodeId));
    }
  } else if (getState().trackViewer.osmNodeId) {
    dispatch(osmClear());
  }

  const osmWayId = parseInt(query['osm-way'], 10);
  if (osmWayId) {
    if (osmWayId !== getState().trackViewer.osmWayId) {
      dispatch(osmLoadWay(osmWayId));
    }
  } else if (getState().trackViewer.osmWayId) {
    dispatch(osmClear());
  }

  const osmRelationId = parseInt(query['osm-relation'], 10);
  if (osmRelationId) {
    if (osmRelationId !== getState().trackViewer.osmRelationId) {
      dispatch(osmLoadRelation(osmRelationId));
    }
  } else if (getState().trackViewer.osmRelationId) {
    dispatch(osmClear());
  }

  handleGallery(getState, dispatch, query);

  const diff = getMapStateDiffFromUrl(
    getMapStateFromUrl(location),
    getState().map,
  );
  if (diff && Object.keys(diff).length) {
    dispatch(mapRefocus(diff));
  }

  if (refModals.includes(query.show)) {
    if (query.show !== getState().main.activeModal) {
      dispatch(setActiveModal(query.show));
    }
  } else if (refModals.includes(getState().main.activeModal)) {
    dispatch(setActiveModal(null));
  }

  if (tipKeys.includes(query.tip)) {
    if (
      getState().main.activeModal !== 'tips' ||
      getState().tips.tip !== query.tip
    ) {
      dispatch(tipsShow(query.tip));
    }
  } else if (getState().main.activeModal === 'tips') {
    dispatch(setActiveModal(null));
  }

  if (query.show === 'login') {
    if (!getState().auth.chooseLoginMethod) {
      dispatch(authChooseLoginMethod());
    }
  } else if (getState().auth.chooseLoginMethod) {
    dispatch(authLoginClose());
  }

  if ((query.embed || '') !== getState().main.embedFeatures.join(',')) {
    dispatch(
      setEmbedFeatures(
        !query.embed || query.embed === '' ? [] : query.embed.split(','),
      ),
    );
  }

  const { track } = query;
  const trackings = !track ? [] : Array.isArray(track) ? track : [track];
  const parsed = [];

  for (const tracking of trackings) {
    const [id, ...parts] = tracking.split('/');
    let fromTime = null;
    let maxAge = null;
    let maxCount = null;
    let label = null;
    let color = null;
    let width = null;
    let splitDistance = null;
    let splitDuration = null;

    for (const part of parts) {
      const m = /^([a-z]+):(.+)/.exec(part);
      if (!m) {
        continue;
      }

      const [, type, value] = m;

      switch (type) {
        case 'f':
          fromTime = new Date(value);
          break;
        case 'a':
          maxAge = Number.parseInt(value, 10);
          break;
        case 'w':
          width = Number.parseFloat(value);
          break;
        case 'c':
          color = value;
          break;
        case 'n':
          maxCount = Number.parseInt(value, 10);
          break;
        case 'l':
          label = value;
          break;
        case 'sd':
          splitDistance = Number.parseInt(value, 10);
          break;
        case 'st':
          splitDuration = Number.parseInt(value, 10);
          break;
        default:
          break;
      }
    }

    parsed.push({
      id,
      fromTime,
      maxAge,
      maxCount,
      label,
      width,
      color,
      splitDistance,
      splitDuration,
    });
  }

  const { trackedDevices, activeTrackId } = getState().tracking;
  outer: for (const newTd of parsed) {
    for (const trackedDevice of trackedDevices) {
      if (trackedDevicesEquals(trackedDevice, newTd)) {
        continue outer;
      }
    }
    dispatch(trackingSetTrackedDevices(parsed));
    break;
  }

  // eslint-disable-next-line
  if (activeTrackId != query.follow) {
    dispatch(trackingSetActive(query.follow));
  }
}

// TODO use some generic deep compare fn
function trackedDevicesEquals(td1, td2) {
  return (
    td1.id === td2.id &&
    td1.fromTime === td2.fromTime &&
    td1.maxAge === td2.maxAge &&
    td1.maxCount === td2.maxCount &&
    td1.label === td2.label
  );
}

function handleGallery(getState, dispatch, query) {
  const qUserId = parseInt(query['gallery-user-id'], 10);
  const qGalleryTag = query['gallery-tag'];
  const qRatingFrom = parseFloat(query['gallery-rating-from']);
  const qRatingTo = parseFloat(query['gallery-rating-to']);
  const qTakenAtFrom = new Date(query['gallery-taken-at-from']);
  const qTakenAtTo = new Date(query['gallery-taken-at-to']);
  const qCreatedAtFrom = new Date(query['gallery-created-at-from']);
  const qCreatedAtTo = new Date(query['gallery-created-at-to']);

  if (
    qUserId ||
    qGalleryTag ||
    qRatingFrom ||
    qRatingTo ||
    !Number.isNaN(qTakenAtFrom.getTime()) ||
    !Number.isNaN(qTakenAtTo.getTime()) ||
    !Number.isNaN(qCreatedAtFrom.getTime()) ||
    !Number.isNaN(qCreatedAtTo.getTime())
  ) {
    const { filter } = getState().gallery;
    const newFilter = {};
    if (qUserId && filter.userId !== qUserId) {
      newFilter.userId = qUserId;
    }
    if (qGalleryTag && filter.tag !== qGalleryTag) {
      newFilter.tag = qGalleryTag;
    }
    if (qRatingFrom && filter.ratingFrom !== qRatingFrom) {
      newFilter.ratingFrom = qRatingFrom;
    }
    if (qRatingTo && filter.ratingTo !== qRatingTo) {
      newFilter.ratingTo = qRatingTo;
    }
    if (
      !Number.isNaN(qTakenAtFrom.getTime()) &&
      (filter.takenAtFrom ? filter.takenAtFrom.getTime() : NaN) !==
        qTakenAtFrom.getTime()
    ) {
      newFilter.takenAtFrom = qTakenAtFrom;
    }
    if (
      !Number.isNaN(qTakenAtTo.getTime()) &&
      (filter.takenAtTo ? filter.takenAtTo.getTime() : NaN) !==
        qTakenAtTo.getTime()
    ) {
      newFilter.takenAtTo = qTakenAtTo;
    }
    if (
      !Number.isNaN(qCreatedAtFrom.getTime()) &&
      (filter.createdAtFrom ? filter.createdAtFrom.getTime() : NaN) !==
        qCreatedAtFrom.getTime()
    ) {
      newFilter.createdAtFrom = qCreatedAtFrom;
    }
    if (
      !Number.isNaN(qCreatedAtTo.getTime()) &&
      (filter.createdAtTo ? filter.createdAtTo.getTime() : NaN) !==
        qCreatedAtTo.getTime()
    ) {
      newFilter.createdAtTo = qCreatedAtTo;
    }
    if (Object.keys(newFilter).length !== 0) {
      dispatch(gallerySetFilter({ ...filter, ...newFilter }));
    }
  }

  if (query.image) {
    const imageId = parseInt(query.image, 10);
    if (getState().gallery.activeImageId !== imageId) {
      dispatch(galleryRequestImage(imageId));
    }
  } else if (getState().gallery.activeImageId) {
    dispatch(galleryClear());
  }

  if (query.show === 'gallery-filter') {
    if (!getState().gallery.showFilter) {
      dispatch(galleryShowFilter());
    }
  } else if (getState().gallery.showFilter) {
    dispatch(galleryHideFilter());
  }

  if (query.show === 'gallery-upload') {
    if (!getState().gallery.showUploadModal) {
      // TODO fix: timeout to validate authentication first (ugly)
      setTimeout(() => {
        dispatch(galleryShowUploadModal());
      }, 1000);
    }
  } else if (getState().gallery.showUploadModal) {
    dispatch(galleryHideUploadModal());
  }
}

function handleInfoPoint(getState, dispatch, query) {
  const infoPoint = query['info-point'];
  const ips = (!infoPoint
    ? []
    : Array.isArray(infoPoint)
    ? infoPoint
    : [infoPoint]
  )
    .map(ip => /^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?),?(.*)$/.exec(ip))
    .filter(ipMatch => ipMatch)
    .map(ipMatch => ({
      lat: parseFloat(ipMatch[1]),
      lon: parseFloat(ipMatch[2]),
      label: ipMatch[3] ? decodeURIComponent(ipMatch[3]) : '',
    }));

  // backward compatibility
  if (query['info-point-label'] && ips.length) {
    ips[0].label = decodeURIComponent(query['info-point-label']);
  }

  // compare
  if (
    ips
      .map(({ lat, lon, label }) => `${serializePoint({ lat, lon })},${label}`)
      .sort()
      .join('\n') !==
    getState()
      .infoPoint.points.map(
        ({ lat, lon, label }) => `${serializePoint({ lat, lon })},${label}`,
      )
      .sort()
      .join('\n')
  ) {
    dispatch(infoPointSetAll(ips));
  }
}

function serializePoints(points) {
  return points.map(point => serializePoint(point)).join(',');
}

function serializePoint(point) {
  return point && typeof point.lat === 'number' && typeof point.lon === 'number'
    ? `${point.lat.toFixed(6)}/${point.lon.toFixed(6)}`
    : '';
}
