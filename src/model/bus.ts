import { v4 as uuid } from 'uuid';
import model, { type OptimizationResult } from '@/model';
import { deviceFactory, BaseDevice, type DeviceType } from './device';
import { values } from 'lodash';
import { jsonParse } from './importlib';
import { assertEqualsIBus, assertEqualsIBusExport } from '@/typia';
import type { IntervalTime } from '@/types';

export interface IBus {
  id: string,
  projectId?: string,
  basis: number,
  interval: IntervalTime,
  startInterval: number,
  startHour: number
  title?: string;
}

export interface IBusExport extends Partial<IBus> {
  devices?: BaseDevice[];
}

export default class Bus implements IBus {
  static readonly MaxItems = 20;
  readonly id: string;
  projectId?: string | undefined;
  readonly basis: number;
  readonly interval: IntervalTime;
  readonly startInterval: number;
  readonly startHour: number;
  title?: string;

  private constructor(init: Omit<IBus, 'id'> & { id?: string }) {
    this.id = init.id || uuid();
    this.projectId = init.projectId;
    this.basis = init.basis;
    this.interval = init.interval;
    this.startInterval = init.startInterval;
    this.startHour = init.startHour;
    this.title = init.title;
  }

  get length() {
    return this.devices.length;
  }

  get devices() {
    return values(model.devices).filter(d => d.busId === this.id);
  }

  get startTime() {
    return `${String(this.startHour % 24).padStart(2, '0')}:${String((this.startInterval * this.interval) % 60).padStart(2, '0')}`;
  }

  get optimizationResult() {
    return Object.values(model.optimizationResults).find((v: OptimizationResult) => v.busId == this.id);
  }

  add(device: BaseDevice) {
    if (device.id in model.devices) return false;
    if (this.length >= Bus.MaxItems) throw new RangeError(`Too many (max=${Bus.MaxItems})`);
    if (device.basis !== this.basis) throw new Error('Basis mismatch');
    device.busId = this.id;
    model.devices[device.id] = device;
  }

  addType(type: DeviceType) {
    if (this.length >= Bus.MaxItems) throw new RangeError(`Too many (max=${Bus.MaxItems})`);
    const device = deviceFactory({ type });
    this.add(device);
  }

  delete() {
    delete model.devices[this.id];
  }

  clone() {
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
      // id: this.id,
      // projectId: this.projectId,
      basis: this.basis,
      devices: this.devices.map(d => d.replacer()),
    };
  }

  static newBus(data: Omit<IBus, 'id'>) {
    return new Bus(data);
  }

  /**
   * @see toExportObject.
   */
  static fromExportObject(data: unknown): Bus {
    const o = assertEqualsIBusExport(jsonParse(data));
    const bus = new Bus(o as any);
    (o.devices || []).forEach((device) => {
      (device as any).id = uuid();
      bus.add(device);
    });
    return bus;
  }

  static reviver(data: unknown) {
    const _data = assertEqualsIBus(data);
    const bus = new this(_data);
    return bus;
  }
}