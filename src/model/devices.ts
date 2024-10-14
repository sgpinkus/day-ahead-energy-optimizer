import { v4 as uuid } from 'uuid';
import { DefaultBasis, BigNumber } from './constants';
import { RunSpec } from './RunSpec';
import { pick } from 'lodash';

export type DeviceType = 'fixed_load' | 'load' | 'supply' | 'storage';

// This is just a scrappt adhoc collection of meta data for things -
// mostly hints to render the given device type in generic device views.
type IAttributes = {
  showInverted?: boolean,
  hasParameters?: boolean,
  hideBounds?: boolean,
  hideCBounds?: boolean,
  hideCosts?: boolean,
}

// RunSpec is a working/presentation model to allow easy editing of these bounds. It converted to an array at optimization.
type Bounds = [RunSpec, RunSpec];
type CBounds = [RunSpec | undefined, RunSpec | undefined];
// Just a single quadratic over all slots for now. Future can run spec this too.
// type Cost = [RunSpec, RunSpec, RunSpec] // RunSpec<[number, number, number]>
type Cost = [number, number, number]

export interface  IBaseDevice {
  type: DeviceType,
  basis: number,
  hardBounds: [number, number],
  attrs: IAttributes,
  title?: string,
  description?: string,
  color?: string,
  shape?: string,
  tags?: Record<string, boolean | number | string>,
  bounds: Bounds,
  cbounds: CBounds,
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
  depthCostFactor: number,
}

export interface IFixedLoadDevice extends IBaseDevice {
  type: 'fixed_load';
}

export type IDevice = ILoadDevice | ISupplyDevice | IStorageDevice | IFixedLoadDevice;

export type IDeviceDescriptorUpdate = Pick<IDevice, 'title' | 'description' | 'shape' | 'color' | 'tags'>;

// Always torn about whether to add behaviours to objects or use C style OO. Alwasy start with the latter.
// But already seem like some data protection / validation would be nice such as ensure bounds within hardBounds ...

function plainDeviceFactory(type: DeviceType): IDevice {
  const _baseDevice = {
    basis: DefaultBasis,
    attrs: {},
    costs: {},
    shape: 'circle',
  };
  const stuff: Record<DeviceType, IDevice> = {
    load: {
      ..._baseDevice,
      type: 'load',
      title: 'Load',
      description: 'A load device',
      color: 'blue',
      hardBounds: [0, BigNumber],
      bounds: boundsRunSpecs(0,1, [0, BigNumber]), // Just set these to a (bad) default.
      cbounds: [undefined, undefined],
    },
    supply: {
      ..._baseDevice,
      type: 'supply',
      title: 'Supply',
      description: 'A supply device',
      color: 'red',
      hardBounds: [-BigNumber, 0],
      bounds: boundsRunSpecs(-1, 0, [-BigNumber, 0]),
      cbounds: [undefined, undefined],
      attrs: {
        showInverted: true,
      }
    },
    fixed_load: {
      ..._baseDevice,
      type: 'fixed_load',
      title: 'Fixed Load',
      description: 'A fixed load device',
      hardBounds: [0, BigNumber],
      bounds: boundsRunSpecs(1,1, [0, BigNumber],), // A fixed load device is just a device whose lbound == hbound.
      cbounds: [undefined, undefined],
    },
    storage: {
      ..._baseDevice,
      type: 'storage',
      title: 'Storage',
      description: 'A storage device',
      color: 'yellow',
      hardBounds: [-BigNumber, BigNumber],
      bounds: boundsRunSpecs(-1,1, [-BigNumber, BigNumber]),
      cbounds: [undefined, undefined],
      efficiencyFactor: 1.0,
      cycleCostFactor: 0.0,
      depthCostFactor: 0.0,
      attrs: {
        hideBounds: true,
        hideCBounds: true,
        hideCosts: true,
        hasParameters: true,
      }
    }
  };
  return stuff[type];
}

function boundsRunSpecs(l: number, h: number, hb?: [number, number]): [RunSpec, RunSpec] {
  return [
    new RunSpec(DefaultBasis, l, hb),
    new RunSpec(DefaultBasis, h, hb),
  ];
}

export abstract class BaseDevice implements IBaseDevice {
  readonly id: string;
  abstract readonly type: DeviceType;
  readonly attrs: IAttributes = {};
  readonly basis: number = DefaultBasis;
  readonly hardBounds: [number, number] = [-BigNumber, BigNumber];
  bounds: Bounds = boundsRunSpecs(-1, 1);
  cbounds: CBounds = [undefined, undefined];
  costs: Record<string, Cost> = {};
  title?: string;
  description?: string;
  tags: Record<string, boolean | number | string> = {};
  color?: string;
  shape?: string;

  protected constructor() {
    this.id = uuid();
  }

  updateDescriptors(o: IDeviceDescriptorUpdate) {
    Object.assign(this, pick(o, ['title', 'description', 'shape', 'color', 'tags']));
  }

  toObject(): IDevice {
    return JSON.parse(JSON.stringify(this));
  }

  static fromObject(data: any) {
    // @ts-expect-error 2511 "Cannot create an instance of an abstract class" yeah, so by definition "this" refers to
    // a subclass! So shutup!
    const o = new this(data);
    Object.assign(o, data);
    return o;
  }
}

export class FixedLoadDevice extends BaseDevice {
  type: DeviceType = 'fixed_load';
  constructor(data?: Partial<IFixedLoadDevice>) {
    super();
    Object.assign(this, { ...plainDeviceFactory(this.type), ...data });
  }
}

export class LoadDevice extends BaseDevice {
  type: DeviceType = 'load';
    constructor(data?: Partial<ILoadDevice>) {
    super();
    Object.assign(this, { ...plainDeviceFactory(this.type), ...data });
  }
}

export class SupplyDevice extends BaseDevice {
  type: DeviceType = 'supply';
  constructor(data?: Partial<ISupplyDevice>) {
    super();
    Object.assign(this, { ...plainDeviceFactory(this.type), ...data });
  }
}

export class StorageDevice extends BaseDevice {
  type: DeviceType = 'storage';
  constructor(data?: Partial<IStorageDevice>) {
    super();
    Object.assign(this, { ...plainDeviceFactory(this.type), ...data });
  }
}

// export class ThermalDevice extends BaseDevice {
// ...
// }

export type Device = LoadDevice | SupplyDevice | StorageDevice | FixedLoadDevice;
export type ContainerDevice = Device & { readonly id: string };

function deviceFactory(data: Partial<IDevice> & { type: DeviceType }): Device {
  switch(data.type) {
    case 'load': return new LoadDevice(data);
    case 'supply': return new SupplyDevice(data);
    case 'fixed_load': return new FixedLoadDevice(data);
    case 'storage': return new StorageDevice(data);
    default: throw new Error(`Unknown device type [data=${data}]`);
  }
}

export class Devices {
  private devices: Record<string, ContainerDevice> = {};

  addDevice(device: Device) {
    this.devices[device.id] = device;
  }

  addDeviceType(type: DeviceType) {
    const device = deviceFactory({ type });
    console.log('addDeviceType', device);
    this.addDevice(device);
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
}

export default Devices;
