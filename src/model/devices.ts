/**
 * Note: The fundamental constraint of the bus flow optimization problem is that sum of device flow is zero. So normally
 * flow in (supply) would be +ve valued and flow out (demand) -ve or vice versa. But this tool is just a model, model
 * parameter builder. We don't need to adhere to that until we actually run optimization and it's more intuitive to rep
 * load flow and supply flow as +ve values. When model in built into something optimizable we need to say "hey these
 * bounds/cost belong to a load/supply so need to be inverted ...
 */
import { v4 as uuid } from 'uuid';
import { DefaultBasis, BigNumber } from './constants';
import { RunSpec, BoundsRunSpec, FixedBoundsRunSpec } from './RunSpec';
import { cloneDeep, pick } from 'lodash';

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
type CumulativeBounds = BoundsRunSpec | undefined;
// type CostType = keyof Costs;
export type ICosts = {
  flow?: RunSpec<[number, number, number]>,
  cumulative_flow?: RunSpec<[number, number, number]>,
  flow_bounds_relative?: BoundsRunSpec,
  cumulative_flow_bounds_relative?: [number, number], // No make sense this be a RunSpec, since low/high tightly coupled to actual constraint RunSpec.
  readonly peak_flow?: [number, number, number],
};
export type IWritableCosts = ICosts & { peak_flow?: ICosts['peak_flow'] };

export class DeviceCosts implements ICosts {
  flow?: RunSpec<[number, number, number]> = undefined;
  cumulative_flow?: RunSpec<[number, number, number]> = undefined;
  flow_bounds_relative?: BoundsRunSpec = undefined;
  cumulative_flow_bounds_relative?: [number, number] = undefined;
  readonly peak_flow?: [number, number, number] = undefined;
  setPeakFlowCost(this: IWritableCosts, v: ICosts['peak_flow']) {
    this.peak_flow = v ? [...v] : undefined;
  }

  setPeakCumulativeFlowBoundsRelativeCost(this: IWritableCosts, v: ICosts['cumulative_flow_bounds_relative']) {
    this.cumulative_flow_bounds_relative = v ? [...v] : undefined;
  }

  toExportObject() {
    return {
      flow: this.flow?.toArray() || undefined,
      cumulative_flow: this.cumulative_flow?.toArray() || undefined,
      flow_bounds_relative: this.flow_bounds_relative?.toArray() || undefined,
      cumulative_flow_bounds_relative: this.cumulative_flow_bounds_relative,
      peak_flow: this.peak_flow,
    };
  }
}

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
  cumulative_bounds: CumulativeBounds,
  costs: DeviceCosts,
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

function boundsNumberRunSpec(l: number, h: number, hb: [number, number]): BoundsRunSpec {
  return new BoundsRunSpec(DefaultBasis, [l, h] as [number, number], hb);
}

export abstract class BaseDevice implements IBaseDevice {
  readonly id: string;
  abstract readonly type: DeviceType;
  readonly attrs: IAttributes = {};
  readonly basis: number = DefaultBasis;
  readonly hardBounds: [number, number] = [-BigNumber, BigNumber];
  readonly bounds: Bounds = boundsNumberRunSpec(-1, 1, [-BigNumber, BigNumber]);
  cumulative_bounds: CumulativeBounds = undefined;
  costs: DeviceCosts = new DeviceCosts();
  readonly title?: string;
  readonly description?: string;
  readonly tags: Record<string, boolean | number | string> = {};
  readonly color?: string;
  readonly shape?: string;
  readonly parameters: Record<string, boolean | number | string | (boolean | number | string)[]> = {};

  protected constructor() {
    this.id = uuid();
  }

  updateDescriptors(o: IDeviceDescriptorUpdate) {
    Object.assign(this, pick(o, ['title', 'description', 'shape', 'color', 'tags']));
  }

  getDescriptors(this: BaseDevice): Partial<IDevice> {
    // TODO: put descriptor in descriptors field. TODO: Why is attrs in here? Coz they are readonly descriptors??
    return cloneDeep({ ...pick(this, ['title', 'description', 'shape', 'color', 'tags']) });
  }

  toExportObject() {
    return {
      id: this.id,
      type: this.type,
      basis: this.basis,
      bounds: this.bounds.toArray(),
      cumulative_bounds: this.cumulative_bounds?.toRanges() || undefined,
      costs: this.costs.toExportObject(),
      parameters: this.parameters,
      descriptors: this.getDescriptors(),
    };
  }

  softBounds(type: 'bounds' | 'cumulative_bounds') {
    if(this[type]) {
      const values = this[type]?.toRanges().map(([v]) => v).flat();
      return [Math.min(...(values as number[])), Math.max(...(values as number[]))];
    }
    return this.hardBounds;
  }

  static fromObject(data: any) {
    // @ts-expect-error 2511 "Cannot create an instance of an abstract class" so by definition "this" refers to a subclass?!
    const o = new this(data);
    Object.assign(o, data);
    return o;
  }
}

export class FixedLoadDevice extends BaseDevice {
  type: DeviceType = 'fixed_load';
  basis = DefaultBasis;
  shape = 'circle';
  title = 'Fixed Load';
  description = 'A fixed load device';
  color = '#A9A9A9';
  hardBounds: [number, number] = [0, BigNumber];
  bounds = new FixedBoundsRunSpec(DefaultBasis, [0,0], [0, BigNumber]); // A fixed load device is just a device whose lbound == hbound.
  cumulative_bounds: CumulativeBounds = undefined;
  attrs: IAttributes = {
    hideCosts: true,
    hideCBounds: true,
  };
  constructor(data?: Partial<IFixedLoadDevice>) {
    super();
    Object.assign(this, data);
  }
}

export class LoadDevice extends BaseDevice {
  type: DeviceType = 'load';
  basis = DefaultBasis;
  shape = 'circle';
  title = 'Load';
  description = 'A load device';
  color = '#0000FF';
  hardBounds: [number, number] = [0, BigNumber];
  bounds = boundsNumberRunSpec(0, 1, [0, BigNumber]);
  cumulative_bounds: CumulativeBounds = undefined;

  constructor(data?: Partial<ILoadDevice>) {
    super();
    Object.assign(this, data);
  }
}

export class SupplyDevice extends BaseDevice {
  type: DeviceType = 'supply';
  basis = DefaultBasis;
  shape = 'circle';
  title = 'Supply';
  description = 'A supply device';
  color = '#FF0000';
  hardBounds: [number, number] = [0, BigNumber];
  bounds = boundsNumberRunSpec(0, 1, [0, BigNumber]);
  cumulative_bounds: CumulativeBounds = undefined;
  attrs: IAttributes = {
    isLoad: true,
  };
  constructor(data?: Partial<ISupplyDevice>) {
    super();
    Object.assign(this, data);
  }
}

type IStorageDeviceParameters = {
  capacity: number, // kwh.
  efficiencyFactor?: number,
  reserveRatio?: number,
  startingRatio?: number,
  fastChargeCostFactor?: number, // Also applies to discharge ..
  flipFlopCostFactor?: number,
  deepDischargeCostFactor?: number,
  deepDepthRatio?: number, // How deep does deepDischargeCostFactor (i.e. costly battery damaged) kick in
  chargeRateClippingFactor?: number,
  disChargeRateClippingFactor?: number,
}

export class StorageDevice extends BaseDevice {
  type: DeviceType = 'storage';
  basis = DefaultBasis;
  shape = 'circle';
  title = 'Storage';
  description = 'A storage device';
  color = '#FFD700';
  hardBounds: [number, number] = [-BigNumber, BigNumber];
  bounds = boundsNumberRunSpec(-1, 1, [-BigNumber, BigNumber]);
  cumulative_bounds: CumulativeBounds = undefined;
  attrs: IAttributes = {
    // hideBounds: true, // Currently this is how Max RoC/RoD is set.
    hideCBounds: true,
    hideCosts: true,
    hasParameters: true,
  };
  parameters: IStorageDeviceParameters = {
    capacity: 1,
    efficiencyFactor: 1.0,
    reserveRatio: 0.5,
    startingRatio: 0.5,
    fastChargeCostFactor: 0.0,
    flipFlopCostFactor: 0.0,
    deepDischargeCostFactor: 0.0,
    deepDepthRatio: 0.2,
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

export function deviceFactory(data: Partial<IDevice> & { type: DeviceType }): Device {
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
  static readonly MaxDevices = 20;

  addDevice(device: Device) {
    this.devices[device.id] = device;
  }

  addDeviceType(type: DeviceType) {
    if(this.length >= Devices.MaxDevices) throw new RangeError(`Too many device (max=${Devices.MaxDevices})`);
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

  toExportObject() {
    return {
      basis: DefaultBasis,
      devices: Object.values(this.devices).map(d => d.toExportObject()),
    };
  }
}

export default Devices;
