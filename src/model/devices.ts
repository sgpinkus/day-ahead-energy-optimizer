/**
 * Note: The fundamental constraint of the bus flow optimization problem is that sum of device flow is zero. So normally
 * flow in (supply) would be +ve valued and flow out (demand) -ve or vice versa. But this tool is just a model, model
 * parameter builder. We don't need to adhere to that until we actually run optimization and it's more intuitive to rep
 * load flow and supply flow as +ve values. When model in built into something optimizable we need to say "hey these
 * bounds/cost belong to a load/supply so need to be inverted ...
 */
import { v4 as uuid } from 'uuid';
import { DefaultBasis, BigNumber } from './constants';
import { RunSpec, BoundsRunSpec } from './RunSpec';
import { pick } from 'lodash';

export type DeviceType = 'fixed_load' | 'load' | 'supply' | 'storage';

// This is just a scrappt adhoc collection of meta data for things -
// mostly hints to render the given device type in generic device views.
type IAttributes = {
  isLoad?: boolean, // Assuming optimization model reps loads as -ve flow, this is useful for require conversion..
  hasParameters?: boolean,
  hideBounds?: boolean,
  hideCBounds?: boolean,
  hideCosts?: boolean,
}

// NumberRunSpec is a working/presentation model to allow easy editing of these bounds. It converted to an array at optimization.
type Bounds = BoundsRunSpec;
type CBounds = BoundsRunSpec | undefined;
// type CostType = keyof Costs;
type Costs = {
  flow?: RunSpec<[number, number, number]>
  cumulative_flow?: RunSpec<[number, number, number]>,
  peak_flow?: [number, number, number],
  flow_bounds_linked?: RunSpec<[number, number, number]>,
  cumulative_flow_bounds_linked?: RunSpec<[number, number, number]>,
};

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
  costs: Costs,
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

// function boundsNumberRunSpecs(l: number, h: number, hb?: [number, number]): [NumberRunSpec, NumberRunSpec] {
//   return [
//     new NumberRunSpec(DefaultBasis, l, hb),
//     new NumberRunSpec(DefaultBasis, h, hb),
//   ];
// }

function boundsNumberRunSpec(l: number, h: number, hb: [number, number]): BoundsRunSpec {
  return new BoundsRunSpec(DefaultBasis, [l, h] as [number, number], hb);
}


export abstract class BaseDevice implements IBaseDevice {
  readonly id: string;
  abstract readonly type: DeviceType;
  readonly attrs: IAttributes = {};
  readonly basis: number = DefaultBasis;
  readonly hardBounds: [number, number] = [-BigNumber, BigNumber];
  bounds: Bounds = boundsNumberRunSpec(-1, 1, [-BigNumber, BigNumber]);
  cbounds: CBounds = undefined;
  costs: Costs = {};
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
  basis = DefaultBasis;
  costs = {};
  shape = 'circle';
  title = 'Fixed Load';
  description = 'A fixed load device';
  hardBounds: [number, number] = [0, BigNumber];
  bounds = boundsNumberRunSpec(1, 1, [0, BigNumber]); // A fixed load device is just a device whose lbound == hbound.
  cbounds: CBounds = undefined;

  constructor(data?: Partial<IFixedLoadDevice>) {
    super();
    Object.assign(this, data);
  }
}

export class LoadDevice extends BaseDevice {
  type: DeviceType = 'load';
  basis = DefaultBasis;
  costs = {};
  shape = 'circle';
  title = 'Load';
  description = 'A load device';
  color = 'blue';
  hardBounds: [number, number] = [0, BigNumber];
  bounds = boundsNumberRunSpec(0, 1, [0, BigNumber]);
  cbounds: CBounds = undefined;

  constructor(data?: Partial<ILoadDevice>) {
    super();
    Object.assign(this, data);
  }
}

export class SupplyDevice extends BaseDevice {
  type: DeviceType = 'supply';
  basis = DefaultBasis;
  costs = {};
  shape = 'circle';
  title = 'Supply';
  description = 'A supply device';
  color = 'red';
  hardBounds: [number, number] = [0, BigNumber];
  bounds = boundsNumberRunSpec(0, 1, [0, BigNumber]);
  cbounds: CBounds = undefined;
  attrs: IAttributes = {
    isLoad: true,
  };
  constructor(data?: Partial<ISupplyDevice>) {
    super();
    Object.assign(this, data);
  }
}

export class StorageDevice extends BaseDevice {
  type: DeviceType = 'storage';
  basis = DefaultBasis;
  costs = {};
  shape = 'circle';
  title = 'Storage';
  description = 'A storage device';
  color = 'yellow';
  hardBounds: [number, number] = [-BigNumber, BigNumber];
  bounds = boundsNumberRunSpec(-1, 1, [-BigNumber, BigNumber]);
  cbounds: CBounds = undefined;
  efficiencyFactor = 1.0;
  cycleCostFactor = 0.0;
  depthCostFactor = 0.0;
  deepDepthRatio = 0.2; // How deep does depth damage potentially kick in.
  reserveRequirement = 0.5;
  capacity = 1; // kwh.
  attrs: IAttributes = {
    hideBounds: true,
    hideCBounds: true,
    hideCosts: true,
    hasParameters: true,
  };
  constructor(data?: Partial<IStorageDevice>) {
    super();
    Object.assign(this, data);
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
