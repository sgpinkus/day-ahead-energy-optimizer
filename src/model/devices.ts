import { v4 as uuid } from 'uuid';
import { handleError, reactive } from 'vue';
import { DefaultBasis } from './constants';
import { cloneDeep } from 'lodash';
import { isJSDocOverloadTag } from 'typescript';

export type DeviceType = 'fixed_load' | 'load' | 'supply' | 'storage';

type IAttributes = {
  showInverted?: boolean,
}

class RunSpec<X> {
  private _runs: Record<number, X> = {};
  constructor(public readonly basis: number, zeroth: X) {
    this._runs[0] = zeroth;
  }

  set(i: number, v: X) {
    if(i < 0 || i >> this.basis) throw new Error('out of bounds');
    this._runs[i] = v;
  }

  get(i: number): X {
    let m = this._runs[0];
    for(let [j, x] of Object.entries(this._runs)) {
      if(Number(j) <= i) m = x;
      if(Number(j) > i) break;
    }
    return m;
  }

  runs(): Record<number, X> {
    return cloneDeep(this._runs);
  }
}

type Bounds = RunSpec<[number, number]> | [number, number][];

type CBounds = RunSpec<[number, number]> | [number, number][];

type Cost = RunSpec<[number, number, number]> | [number, number, number][];

export interface  IBaseDevice {
  type: DeviceType,
  basis: number,
  hardBounds: [number, number],
  attrs: IAttributes,
  title?: string,
  description?: string,
  color?: string,
  shape?: string,
  bounds: Bounds,
  cbounds?: CBounds,
  costs: Record<string, Cost>,
}

export interface ILoadDevice extends IBaseDevice {
  type: 'load',
}

export interface ISupplyDevice extends IBaseDevice {
  type: 'supply',
}

export interface IStorageDevice extends IBaseDevice {
  type: 'storage',
  efficiencyFactor: number,
  cycleCostFactor: number,
  depthhCostFactor: number,
}

export interface IFixedLoadDevice extends IBaseDevice {
  type: 'fixed_load';
}

export type IDevice = ILoadDevice | ISupplyDevice | IStorageDevice | IFixedLoadDevice;

// I'm always torn about whether to add behaviours to objects! We'll start by keeping it simple.
// But already seem like some data protection / validation would be nice such as ensure bounds within hardBounds ...

// export class BaseDevice implements IBaseDevice {
//   title?: string;
//   description?: string;
//   readonly attrs: IAttributes = {};
//   tags: Record<string, boolean | number | string> = {};
//   bounds: Bounds;
//   cbounds?: CBounds;
//   costs: Record<string, Cost> = {};

//   constructor(
//     public readonly type: DeviceType,
//     public readonly basis: number,
//     public readonly hardBounds: [number, number] = [-1e3, 1e3],
//   ) {
//     this.bounds = new RunSpec<[number, number]>(this.basis, this.hardBounds)
//   }
// }

// export class FixedDevice extends BaseDevice {
//   title = 'Fixed Load';

//   constructor(public readonly basis: number) {
//     super('fixed', basis);
//   }
// }

// export class LoadDevice extends BaseDevice {
//   title = '';

//   constructor(public readonly basis: number) {
//     super('load', basis, [0, 1e3]);
//   }
// }

// export class SupplyDevice extends BaseDevice {
//   constructor(public readonly basis: number) {
//     super('supply', basis, [-1e3, 0]);
//   }
// }

// export class StorageDevice extends BaseDevice {
//   efficiencyFactor: number = 1.0;
//   cycleCostFactor: number = 0.0;
//   depthhCostFactor: number = 0.0;
//   constructor(public readonly basis: number) {
//     super('storage', basis, [-1e3, 1e3]);
//   }
// }

// export class ThermalDevice extends BaseDevice {
// ...
// }

export type ContainerDevice = IDevice & { readonly id: string };

function deviceFactory(type: DeviceType): IDevice {
  const _baseDevice = {
    basis: DefaultBasis,
    attrs: {},
    costs: {},
  }
  switch(type) {
    case 'load': return {
      ..._baseDevice,
      type: 'load',
      title: 'Load',
      description: 'A load device',
      color: 'blue',
      hardBounds: [0, 1e3],
      bounds: new RunSpec<[number, number]>(DefaultBasis, [0,1]), // Just a bad default.
    }
    case 'supply': return {
      ..._baseDevice,
      type: 'supply',
      title: 'Supply',
      description: 'A supply device',
      color: 'red',
      hardBounds: [-1e3, 0],
      bounds: new RunSpec<[number, number]>(DefaultBasis, [-1,0]),  // Just a bad default.
    }
    case 'fixed_load': return {
      ..._baseDevice,
      type: 'fixed_load',
      title: 'Fixed Load',
      description: 'A fixed load device',
      hardBounds: [0, 1e3],
      bounds: new RunSpec<[number, number]>(DefaultBasis, [1,1]),  // Just a bad default.
    }
    case 'storage': return {
      ..._baseDevice,
      type: 'storage',
      title: 'Storage',
      description: 'A storage device',
      color: 'yellow',
      hardBounds: [-1e3, 1e3],
      bounds: new RunSpec<[number, number]>(DefaultBasis, [-1,1]),  // Just a bad default.
      efficiencyFactor: 1.0,
      cycleCostFactor: 0.0,
      depthhCostFactor: 0.0,
    }
    default: throw Error();
  }
}

export class Devices {
  private devices: Record<string, ContainerDevice> = {}

  addDevice(x: IDevice) {
    const id = uuid();
    this.devices[id] = {
      id,
      ...x
    }
  }

  addDeviceType(type: DeviceType) {
    this.addDevice(deviceFactory(type));
  }

  getDevice(id: string) {
    return this.devices[id];
  }

  getDevices() {
    return {...this.devices};
  }

  deleteDevice(id: string) {
    delete this.devices[id];
  }

  get length() {
    return Object.keys(this.devices).length;
  }

  reset() {
    this.devices = {};
  }

  toObject() {
    return this.devices;
  }

  static fromObject(data: any = {}) {
    const devices = new this();
    devices.devices = data;
    return devices;
  }
}

export default Devices;
