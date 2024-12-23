import { v4 as uuid } from 'uuid';
import model from '@/model';
import { DefaultBasis, DefaultIntervalMinutes } from './constant';
import { deviceFactory, BaseDevice, type DeviceType } from './device';
import { values } from 'lodash';
import { jsonParse } from './importlib';
import typia from 'typia';

type IntervalTime = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 15 | 20 | 30 | 60;

export interface IBus {
  id: string,
  collectionId?: string,
  basis: number,
  interval: IntervalTime,
  startInterval: number,
  startHour: number
  title?: string;
}

export interface IBusExport extends Partial<IBus> {
  basis: number,
  devices?: BaseDevice[];
}

export default class Bus implements IBus {
  static readonly MaxItems = 20;
  id: string = uuid();
  collectionId?: string | undefined;
  basis: number = DefaultBasis;
  interval: IntervalTime = DefaultIntervalMinutes;
  startInterval: number = 0;
  startHour: number = 0;
  title?: string;

  private constructor(init: Partial<IBus>) {
    Object.assign(this, init);
  }

  get length() {
    return this.devices.length;
  }

  get devices() {
    return values(model.devices).filter(d => d.busId === this.id);
  }

  get startTime() {
    return `${String(this.startHour%24).padStart(2, '0')}:${String((this.startInterval*this.interval)%60).padStart(2, '0')}`;
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

  delete(id: string) {
    delete model.devices[id];
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
      // collectionId: this.collectionId,
      basis: this.basis,
      devices: this.devices.map(d => d.replacer()),
    };
  }

  static newBus(data: Partial<IBus>) {
    return new Bus(data);
  }

  /**
   * @see toExportObject.
   */
  static fromExportObject(data: unknown): Bus {
    const o = typia.assertEquals<IBusExport>(jsonParse(data));
    const bus = new Bus(o);
    (o.devices || []).forEach((device) => {
      (device as any).id = uuid();
      bus.add(device);
    });
    return bus;
  }

  static reviver(data: unknown) {
    const _data = typia.assertEquals<IBus>(data);
    const bus = new this(_data);
    return bus;
  }
 }