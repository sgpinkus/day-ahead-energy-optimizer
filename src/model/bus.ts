import { v4 as uuid } from 'uuid';
import model, { type OptimizationResult } from '@/model';
import { deviceFactory, BaseDevice, BaseDeviceDescriptorNames, type DeviceType, type IDeviceDescriptors, type IDeviceDescriptorUpdate } from './device';
import { cloneDeep, pick, values } from 'lodash';
import { jsonParse, jsonStringify } from './importlib';
import { assertEqualsIBus, assertEqualsIBusExport } from '@/typia';
import type { IntervalMinutes } from '@/types';
import { startTimeString } from './utils';

export interface IBus {
  id: string,
  projectId?: string,
  basis: number,
  intervalMinutes: IntervalMinutes,
  startIntervalOffset: number,
  title?: string;
}

export interface IBusExport extends Partial<IBus> {
  devices?: BaseDevice[];
}

export default class Bus implements IBus, IDeviceDescriptors {
  static readonly MaxItems = 20;
  readonly id: string;
  readonly type = 'bus';
  projectId?: string | undefined;
  readonly basis: number;
  readonly intervalMinutes: IntervalMinutes;
  readonly startIntervalOffset: number;
  title?: string;
  description?: string;
  readonly attrs = {};

  private constructor(o: Omit<IBus, 'id'> & { id?: string }) {
    this.id = o.id || uuid();
    this.projectId = o.projectId;
    this.basis = o.basis;
    this.intervalMinutes = o.intervalMinutes;
    this.startIntervalOffset = o.startIntervalOffset;
    this.title = o.title;
  }

  get length() {
    return this.devices.length;
  }

  get devices() {
    return values(model.devices).filter(d => d.busId === this.id);
  }

  get optimizationResult() {
    return Object.values(model.optimizationResults).find((v: OptimizationResult) => v.busId === this.id);
  }

  get startTimeString() {
    return startTimeString(this);
  }

  updateDescriptors(o: IDeviceDescriptorUpdate) {
    Object.assign(this, pick(o, BaseDeviceDescriptorNames));
  }

  getDescriptors(this: BaseDevice): IDeviceDescriptorUpdate {
    return cloneDeep({ ...pick(this, BaseDeviceDescriptorNames) });
  }

  addDevice(device: BaseDevice) {
    if (device.id in model.devices) return false;
    if (this.length >= Bus.MaxItems) throw new RangeError(`Too many (max=${Bus.MaxItems})`);
    if (device.basis !== this.basis) throw new Error('Basis mismatch');
    device.busId = this.id;
    model.devices[device.id] = device;
  }

  addDeviceType(type: DeviceType) {
    if (this.length >= Bus.MaxItems) throw new RangeError(`Too many (max=${Bus.MaxItems})`);
    const device = deviceFactory({ type }, this);
    this.addDevice(device);
  }

  deleteDevice(id: string) {
    delete model.devices[id];
  }

  delete() {
    delete model.busses[this.id];
  }

  clone() {
    const { bus, devices } = Bus.fromExportObject(jsonStringify(this.toExportObject()));
    devices.forEach((v) => bus.addDevice(v));
    model.project.add(bus);
  }

  reset() {
    for (const d of this.devices) {
      delete model.devices[d.id];
    }
  }

  /**
   * Can't just use JSON stringify because export needs to include devices.
   */
  toExportObject() {
    return {
      basis: this.basis,
      intervalMinutes: this.intervalMinutes,
      startIntervalOffset: this.startIntervalOffset,
      title: this.title,
      description: this.description,
      devices: this.devices.map(d => d.replacer()),
    };
  }

  static newBus(data: Omit<IBus, 'id'>) {
    return new Bus(data);
  }

  /**
   * @see toExportObject.
   */
  static fromExportObject(data: string): { bus: Bus, devices: BaseDevice[] } {
    const o = assertEqualsIBusExport(jsonParse(data));
    const bus = new Bus(o as any);
    const devices = (o.devices || []);
    devices.forEach((v: any) => (v.id = uuid()));
    return { bus, devices };
  }

  static reviver(data: unknown) {
    const _data = assertEqualsIBus(data);
    const bus = new this(_data);
    return bus;
  }
}