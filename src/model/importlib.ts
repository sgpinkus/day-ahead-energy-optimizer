/**
 * The issue is, we can have a class encode its module for replacer/reviver but there is no way to load it synchronously
 * which is required by JSON.parse. So until figure that out, this hack:
 */

/* eslint-disable @typescript-eslint/no-unused-vars   */

import {
  RunSpec,
  NumberRunSpec,
  BoundsRunSpec,
  FixedBoundsRunSpec,
} from './runspec';
import {
  DeviceCosts,
  BaseDevice,
  LoadDevice,
  StorageDevice,
  SupplyDevice,
  FixedLoadDevice,
} from './device';
import Collection from './collection';
import Bus from './bus';
import { Messages } from './messages';
import { Model } from './index';
import { ValidationError } from '@/errors';

// Whitelist allowed classes. These custom json replacer/revivers are now used from explort/import.
// Even though app is local only, user could attempt to load export from untrusted source.
const allowedClassNames = [
  'RunSpec',
  'NumberRunSpec',
  'BoundsRunSpec',
  'FixedBoundsRunSpec',
  'DeviceCosts',
  'BaseDevice',
  'LoadDevice',
  'StorageDevice',
  'SupplyDevice',
  'FixedLoadDevice',
  'Collection',
  'Bus',
  'Messages',
  'Model',
];

function replacer(k: string, v: any) {
  if (v instanceof Object && ![Function, Object, Array, String, Number, BigInt].includes(v.constructor)) {
    v.__CLASS__ = v.constructor.name;
  }
  return v;
}

function reviver(k: string, v: any) {
  if (v?.__CLASS__) {
    if (!allowedClassNames.includes(v.__CLASS__)) throw new ValidationError();
    const _class = eval(v.__CLASS__);
    let o;
    if (_class['fromObject']) {
      o = _class['fromObject'](v);
    } else {
      o = new _class();
      Object.assign(o, v);
    }
    delete o.__CLASS__;
    return o;
  }
  return v;
}

export function jsonStringify(o: any) {
  return JSON.stringify(o, replacer);
}

export function jsonParse(o: any) {
  return JSON.parse(o, reviver);
}