/**
 * Random collection of utils, will SoC as app grows.
 */
import type { IUser } from '@/types';
import { pick, set } from 'lodash';


/**
 * Merge updates from b into a inplace, in a way that preserves meaning of key in b.
 */
export function mergeArgs(a: Record<string, any>, b: Record<string, any>) {
  const existingKeys = new Set(Object.keys(a));
  for(const [k, v] of Object.entries(b)) {
    const [keyPrefix, ...keyRest] = k.split('.');
    // console.log(k, keyPrefix, keyRest, a[keyPrefix]);
    if(existingKeys.has(keyPrefix) && keyRest.length) {
      set(a, k, v);
    } else {
      a[k] = v;
    }
  }
}


/**
 * coords and timestamp are implemented as getters at least in FF so won't just JSON.stringify.
 * https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
 */
export function geolocationPositionToObject(o: GeolocationPosition): Omit<GeolocationPosition, 'new'> {
  return { timestamp: o.timestamp, coords: pick(o.coords, ['accuracy', 'altitude', 'altitudeAccuracy', 'heading', 'latitude', 'longitude', 'speed']) };
}


/**
 * make user title string.
 */
export function userTitle(user: IUser) {
  const name = user.name || (user.given_name && user.given_name + user.family_name ? ' ' + user.family_name : '') || user.email;
  return name;
}