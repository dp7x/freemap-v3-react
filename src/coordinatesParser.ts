import { assertType } from 'typescript-is';
import { LatLon } from './types/common';

// TODO publish as npm package

const N_TR = 'S';

const S_TR = 'J';

const E_TR = 'V';

const W_TR = 'Z';

const DEG = '\u00B0';

const MIN = '\u2032';

const SEC = '\u2033';

const patterns =
  '([+|-]?\\d+[.,]\\d+)|' + // (1)
  '([+|-]?\\d+)|' + // (2)
  `(${DEG}|o|deg)|` + // (3)
  `('|${MIN}|min)|` + // (4)
  `("|${SEC}|sec)|` + // (5)
  '(,|;)|' + // (6)
  `([NSEW${N_TR}${S_TR}${E_TR}${W_TR}])|` + // (7)
  '\\s+|' + // (8)
  '(.+)'; // (9)

const P_XML = /lat=["']([+|-]?\d+[.,]\d+)["']\s+lon=["']([+|-]?\d+[.,]\d+)["']/;

export function parseCoordinates(coord: string): LatLon {
  const mXml = P_XML.exec(coord);

  if (mXml) {
    return assertType<LatLon>({
      ...toLatLon1(parseFloat(mXml[1].replace(',', '.')), 0.0, 0.0, 'N'),
      ...toLatLon1(parseFloat(mXml[2].replace(',', '.')), 0.0, 0.0, 'E'),
    });
  }

  const sb: string[] = [];

  const list: Array<string | number> = [];

  const P = new RegExp(patterns, 'ig');

  for (let i = 0; i < 100; i += 1) {
    const m = P.exec(coord);

    if (!m) {
      break;
    }

    if (m[1]) {
      sb.push('R'); // floating point number

      list.push(parseFloat(m[1].replace(',', '.')));
    } else if (m[2]) {
      sb.push('Z'); // integer number

      list.push(parseFloat(m[2]));
    } else if (m[3]) {
      sb.push('o'); // degree sign
    } else if (m[4]) {
      sb.push("'"); // seconds sign
    } else if (m[5]) {
      sb.push('"'); // minutes sign
    } else if (m[6]) {
      sb.push(','); // separator
    } else if (m[7]) {
      sb.push('x'); // cardinal direction

      const c = m[7].toUpperCase();

      list.push(
        'NSEW'.includes(c)
          ? c
          : c
              .replace(N_TR, 'N')
              .replace(S_TR, 'S')
              .replace(E_TR, 'E')
              .replace(W_TR, 'W'),
      );
    } else if (m[8]) {
      throw new Error(`invalid token: ${m[8]}`);
    }
  }

  const pattern = sb.join('');

  const params = [...list];

  if (pattern.match(/Ro?,?Ro?/)) {
    return toLatLon(
      params[0] as number,
      0.0,
      0.0,
      'N',
      params[1] as number,
      0.0,
      0.0,
      'E',
    );
  }

  if (pattern.match(/xRo?,?xRo?/)) {
    return toLatLon(
      params[1] as number,
      0.0,
      0.0,
      params[0] as string,
      params[3] as number,
      0.0,
      0.0,
      params[2] as string,
    );
  }

  if (pattern.match(/Ro?x,?Ro?x/)) {
    return toLatLon(
      params[0] as number,
      0.0,
      0.0,
      params[1] as string,
      params[2] as number,
      0.0,
      0.0,
      params[3] as string,
    );
  }

  if (pattern.match(/Zo[RZ]'?,?Zo[RZ]'?|Z[RZ],?Z[RZ]/)) {
    return toLatLon(
      params[0] as number,
      params[1] as number,
      0.0,
      'N',
      params[2] as number,
      params[3] as number,
      0.0,
      'E',
    );
  }

  if (pattern.match(/xZo[RZ]'?,?xZo[RZ]'?|xZo?[RZ],?xZo?[RZ]/)) {
    return toLatLon(
      params[1] as number,
      params[2] as number,
      0.0,
      params[0] as string,
      params[4] as number,
      params[5] as number,
      0.0,
      params[3] as string,
    );
  }

  if (pattern.match(/Zo[RZ]'?x,?Zo[RZ]'?x|Zo?[RZ]x,?Zo?[RZ]x/)) {
    return toLatLon(
      params[0] as number,
      params[1] as number,
      0.0,
      params[2] as string,
      params[3] as number,
      params[4] as number,
      0.0,
      params[5] as string,
    );
  }

  if (pattern.match(/ZoZ'[RZ]"?x,?ZoZ'[RZ]"?x|ZZ[RZ]x,?ZZ[RZ]x/)) {
    return toLatLon(
      params[0] as number,
      params[1] as number,
      params[2] as number,
      params[3] as string,
      params[4] as number,
      params[5] as number,
      params[6] as number,
      params[7] as string,
    );
  }

  if (pattern.match(/xZoZ'[RZ]"?,?xZoZ'[RZ]"?|xZZ[RZ],?xZZ[RZ]/)) {
    return toLatLon(
      params[1] as number,
      params[2] as number,
      params[3] as number,
      params[0] as string,
      params[5] as number,
      params[6] as number,
      params[7] as number,
      params[4] as string,
    );
  }

  if (pattern.match(/ZZ[RZ],?ZZ[RZ]/)) {
    return toLatLon(
      params[0] as number,
      params[1] as number,
      params[2] as number,
      'N',
      params[3] as number,
      params[4] as number,
      params[5] as number,
      'E',
    );
  }

  throw new Error(`invalid format: ${pattern}`);
}

function toLatLon(
  coord1deg: number,
  coord1min: number,
  coord1sec: number,
  card1: string,
  coord2deg: number,
  coord2min: number,
  coord2sec: number,
  card2: string,
): LatLon {
  const latLon = {
    ...toLatLon1(coord1deg, coord1min, coord1sec, card1),
    ...toLatLon1(coord2deg, coord2min, coord2sec, card2),
  };

  return assertType<LatLon>(latLon);
}

function toLatLon1(
  coordDeg: number,
  coordMin: number,
  coordSec: number,
  card: string,
) {
  if (
    coordDeg < -180 ||
    coordDeg > 180 ||
    coordMin < 0 ||
    coordMin >= 60 ||
    coordSec < 0 ||
    coordSec > 60
  ) {
    throw new Error('out of range');
  }

  const coord =
    (coordDeg < 0 ? -1 : 1) *
    (Math.abs(coordDeg) + coordMin / 60 + coordSec / 3600);

  return {
    [card === 'N' || card === 'S' ? 'lat' : 'lon']:
      card === 'N' || card === 'E' ? coord : -coord,
  };
}

// [
//   '49.29918° 19.24788°',
//   'N 49.29918 E 19.24788',
//   'W 49°29.918\' S 19°24.788\'',
//   'N 49°29\'04" E 19°24\'43"',
//   '49.29918 N, 19.24788 E',
//   '49°29\'21" N 19°24\'38" E',
//   '49 29 51, 19 24 18',
//   '49 29, 19 24',
//   'E 49 29, N 19 24',
//   '49° 29; 19° 24',
//   'N 49° 29, W 19° 24',
//   '49° 29.5 S, 19° 24.6 E',
//   'N 49 29.918 E 19 15.88',
//   '49 29.4 19 24.5',
//   '-49 29.4 N -19 24.5 W',
// ].map(parseCoordinates).forEach((x) => {
//   console.log(x);
// });
