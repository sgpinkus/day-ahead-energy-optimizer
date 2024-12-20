import { v4 as uuid } from 'uuid';
import model from '@/model';
import { DefaultBasis } from './constant';
import { deviceFactory, BaseDevice, type DeviceType } from './device';
import { values } from 'lodash';
import { assertEquals } from 'typia';

export interface IBus {
  id: string,
  collectionId?: string,
  basis: number,
}

export default class Bus {
  public readonly basis: number = DefaultBasis;
  static readonly MaxItems = 20;

  public constructor(public collectionId?: string, public readonly id = uuid()) {
  }

  get length() {
    return this.devices.length;
  }

  get devices() {
    return values(model.devices).filter(d => d.busId === this.id);
  }

  add(device: BaseDevice) {
    if (!(device.id in model.devices)) {
    if (this.length >= Bus.MaxItems) throw new RangeError(`Too many (max=${Bus.MaxItems})`);
      device.busId = this.id;
      model.devices[device.id] = device;
    }
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

  toExportObject() {
    return {
      basis: this.basis,
      devices: this.devices.map(d => d.replacer()),
    };
  }

  static reviver(data: unknown) {
    const _data = assertEquals<IBus>(data);
    const o = new this();
    Object.assign(o, _data);
    return o;
  }
 }