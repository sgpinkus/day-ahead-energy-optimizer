import { get, set, isEqual, isArray, isObject } from 'lodash';
import { v4 } from 'uuid';

export function randomUUID() {
  return v4(); // (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
}

export function *_deepKeyIterator(a: Record<string, unknown>, _p = ''): Generator<[string, any]> {
  const _k = (k: string) => `${_p}${_p ? '.' : ''}${k}`;
  for(const [k, v] of Object.entries(a)) {
    if(isObject(v) && !isArray(v) ) {
      for(const x of _deepKeyIterator(v as Record<string, unknown>, _k(k))) {
        yield x;
      }
    } else {
      yield [_k(k), v];
    }
  }
}

/**
 * Find values in a that are not in b or are different to b.
 */
export function deepDiffObjects(a: Record<string, unknown>, b: Record<string, unknown>): any {
  const res = {};
  for(const [k, v] of _deepKeyIterator(a)) {
    if(!isEqual(get(b, k), v)) {
      set(res, k, v);
    }
  }
  return Object.keys(res).length ? res : null;
}

/**
 * Find values in a that are not in b or are different to b.
 */
export function deepDiffObjects2(a: Record<string, unknown>, b: Record<string, unknown>): null | Record<string, any> {
  const res: Record<string, any> = {};
  for(const [k, v] of _deepKeyIterator(a)) {
    if(!isEqual(get(b, k), v)) {
      res[k] = v;
    }
  }
  return Object.keys(res).length ? res : null;
}

export function latlngToString(latlng: any) {
  if(latlng?.lat !== undefined && latlng?.lng !== undefined) {
    return JSON.stringify({ lat: Math.round(latlng.lat*1e6)/1e6, lng: Math.round(latlng.lng*1e6)/1e6 });
  }
  return JSON.stringify(latlng);
}

export function setIntersection(a: unknown[] | undefined, b: unknown[] | undefined) {
  if (!(a && a.length) || !(b && b.length)) return [];
  return a.filter(v => b.includes(v));
}

export function linspace(a: number, b: number, n = 50) {
  // If a === b we get a repeated n times.
  if(!n) return [];
  const delta = (b - a);
  const domain = [];
  for(let i = 0; i < n; i++) {
    domain.push(a + (i/n)*delta);
  }
  return domain;
}

export function quadratic(a: number, b: number, o: number, c: number) {
  return (x: number) => a*(x + o)**2 + b*(x + o) + c;
}

/**
 *
 * @param p0,
 * @returns
 */
export function boundsRelativeQuadratic(p0: number, p1: number, xL: number, xH: number) {
  // (x_h - x_l)*np.poly1d([(d0 - d1)/2, d1, 0])((x - x_l)/(x_h - x_l))
  const b = p1;
  const a = (p0 - p1)/2; // p0 = 2*1*a + b; a = (p0-p1)/2
  const c = quadratic(a, b, 0 , 0)(-b/(2*a)); // f'(x) = 2ax + b; f'(x) = 0 -> x* = -b/2a.
  const f = quadratic(a, b, 0, 0);
  return (x: number) => (xH - xL)*f((x - xL)/(xH - xL)) - c;
}