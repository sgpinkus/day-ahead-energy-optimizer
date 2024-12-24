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
  '_Bus', // Compiler refuses not to change this name even with minify off. But Bus.constructor.name is still 'Bus' so can't use that either ..
  'Messages',
  'Model',
];

function replacer(k: string, v: any) {
  // if (v instanceof Object) { console.log(k, v.constructor.name, allowedClassNames.includes(v.constructor.name), toRaw(v)); }
  if (v instanceof Object && allowedClassNames.includes(v.constructor.name)) {
    v.__CLASS__ = v.constructor.name;
    const _class = eval(v.__CLASS__);
    if (_class['replacer']) {
      return _class['replacer'];
    }
  }
  return v;
}

function reviver(k: string, v: any) {
  if (v?.__CLASS__) {
    const className = v.__CLASS__;
    delete v.__CLASS__;
    if (!allowedClassNames.includes(className)) throw new ValidationError();
    const _class = eval(className);
    let o;
    if (_class['reviver']) {
      o = _class['reviver'](v);
    } else {
      o = new _class();
      // TODO: Should always require an explicit reviver.
      console.debug('reviver using default constructor on', o.constructor.name);
      Object.assign(o, v);
    }
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