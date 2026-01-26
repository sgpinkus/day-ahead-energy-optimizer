/**
 * Note: The fundamental constraint of the bus flow optimization problem is that sum of device flow is zero. So normally
 * flow in (supply) would be +ve valued and flow out (demand) -ve or vice versa. But this tool is just a model, model
 * parameter builder. We don't need to adhere to that until we actually run optimization and it's more intuitive to rep
 * load flow and supply flow as +ve values. When model in built into something optimizable we need to say "hey these
 * bounds/cost belong to a load/supply so need to be inverted ...
 */
import { v4 as uuid } from 'uuid';
import { DefaultBasis, BigNumber } from './constant';
import { RunSpec, BoundsRunSpec, FixedBoundsRunSpec } from './runspec';
import { cloneDeep, pick } from 'lodash';
import { assertEqualsDeviceCosts, assertEqualsIBaseDevice } from '@/typia';

export type DeviceType = 'fixed_load' | 'load' | 'supply' | 'storage' | 'thermal_load';

// This is just a scrappt adhoc collection of meta data for things -
// mostly hints to render the given device type in generic device views.
type IAttributes = {
  isSupply?: boolean, // Assuming optimization model reps supply as -ve flow, this is useful for require conversion..
  hasParameters?: boolean,
  hideBounds?: boolean,
  hideCBounds?: boolean,
  hideCosts?: boolean,
}

// type IDescriptors = {
//   title: string,
//   description: string,
//   color: string,
//   shape: string,
//   tags: Record<string, boolean | number | string>,
// }

// NumberRunSpec is a working/presentation model to allow easy editing of these bounds. It converted to an array at optimization.
type Bounds = BoundsRunSpec;
type CumulativeBounds = BoundsRunSpec;
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

  static reviver(data: unknown) {
    assertEqualsDeviceCosts(data);
    const o = new this();
    Object.assign(o, data);
    return o;
  }
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

export interface IThermalLoadDevice extends IBaseDevice {
  type: 'thermal_load';
}

export type IDevice = ILoadDevice | ISupplyDevice | IStorageDevice | IFixedLoadDevice | IThermalLoadDevice;

export type IDeviceDescriptorUpdate = Pick<IDevice, 'title' | 'description' | 'shape' | 'color' | 'tags'>;

function boundsNumberRunSpec(l: number, h: number, hb: [number, number]): BoundsRunSpec {
  return new BoundsRunSpec(DefaultBasis, [l, h] as [number, number], hb);
}

// TODO: put descriptor in descriptors field.
// TODO: Why is attrs in here? Coz they are readonly descriptors? Freakin ontology is unsolvable.
const BaseDeviceDescriptorNames = ['title', 'description', 'shape', 'color', 'tags'];

export interface IBaseDevice {
  readonly id: string;
  busId?: string;
  readonly type: DeviceType,
  readonly attrs: IAttributes,
  readonly basis: number,
  readonly hardBounds: [number, number],
  bounds: Bounds,
  cumulative_bounds?: CumulativeBounds,
  costs: DeviceCosts,
  title?: string,
  description?: string,
  tags?: Record<string, boolean | number | string>,
  color?: string,
  shape?: string,
  parameters?: Record<string, any>;
}

export abstract class BaseDevice implements IBaseDevice {
  readonly id: string;
  busId?: string;
  abstract readonly type: DeviceType;
  readonly attrs: IAttributes = {};
  readonly basis: number = DefaultBasis;
  readonly hardBounds: [number, number] = [-BigNumber, BigNumber];
  readonly bounds: Bounds = boundsNumberRunSpec(-1, 1, [-BigNumber, BigNumber]);
  cumulative_bounds?: CumulativeBounds;
  costs: DeviceCosts = new DeviceCosts();
  readonly title?: string;
  readonly description?: string;
  readonly tags: Record<string, boolean | number | string> = {};
  readonly color?: string;
  readonly shape?: string;
  readonly parameters: Record<string, any> = {};

  constructor() {
    this.id = uuid();
  }

  updateDescriptors(o: IDeviceDescriptorUpdate) {
    Object.assign(this, pick(o, BaseDeviceDescriptorNames));
  }

  getDescriptors(this: BaseDevice): Partial<IDevice> {
    return cloneDeep({ ...pick(this, BaseDeviceDescriptorNames) });
  }

  softBounds(type: 'bounds' | 'cumulative_bounds') {
    if (this[type]) {
      const values = this[type]?.toRanges().map(([v]) => v).flat();
      return [Math.min(...(values as number[])), Math.max(...(values as number[]))];
    }
    return this.hardBounds;
  }

  clone() {
    const _clone = cloneDeep(this);
    (_clone.id as any) = uuid();
    return _clone;
  }

  replacer() {
    return this;
  }

  static reviver(data: unknown) {
    // @ts-expect-error 2511 "Cannot create an instance of an abstract class" Yeah, but that's not what this does.
    const o = new this();
    assertEqualsIBaseDevice(data);
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
  bounds = new FixedBoundsRunSpec(DefaultBasis, [0, 0], [0, BigNumber]); // A fixed load device is just a device whose lbound == hbound.
  attrs: IAttributes = {
    hideCosts: true,
    hideCBounds: true,
  };
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
  attrs: IAttributes = {
    isSupply: true,
  };
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
}

export interface IThemalLoadParameters {
  desiredTemperature: number,
  initialTemperature: number,
  thermalSustainment: number,
  efficiencyFactor: number,
  externalTemperatureProfile: number[], // IRunSpecData<number>,
  temperatureVariationCareFactor: RunSpec<number>, // IRunSpecData<number>,
}


export class ThermalLoadDevice extends BaseDevice {
  type: DeviceType = 'thermal_load';
  basis = DefaultBasis;
  shape = 'circle';
  title = 'Thermal Load';
  description = 'A thermal load device';
  color = '#00FFFF';
  hardBounds: [number, number] = [0, BigNumber];
  bounds = boundsNumberRunSpec(0, 1, [0, BigNumber]);
  attrs: IAttributes = {
    hideCBounds: true,
    hideCosts: true,
    hasParameters: true,
  };
  parameters: IThemalLoadParameters = {
    desiredTemperature: 23,
    thermalSustainment: 0.95,
    efficiencyFactor: 2.5,
    initialTemperature: 10,
    externalTemperatureProfile: Array.from(Array(DefaultBasis)).map(() => 23),
    temperatureVariationCareFactor: new RunSpec<number>(DefaultBasis, 1),
  };
}
export type Device = LoadDevice | SupplyDevice | StorageDevice | FixedLoadDevice;

export function deviceFactory(data: { type: DeviceType }): Device {
  switch (data.type) {
    case 'load': return new LoadDevice();
    case 'supply': return new SupplyDevice();
    case 'fixed_load': return new FixedLoadDevice();
    case 'storage': return new StorageDevice();
    case 'thermal_load': return new ThermalLoadDevice();
    default: throw new Error(`Unknown device type [data=${data}]`);
  }
}
