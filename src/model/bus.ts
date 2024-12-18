import { v4 as uuid } from 'uuid';
import model from '@/model';
import { DefaultBasis } from './constant';
import { deviceFactory, type Device, type DeviceType } from './device';
import { values } from 'lodash';

export default class Bus {
  readonly id: string;
  public readonly basis: number = DefaultBasis;
  static readonly MaxItems = 20;

  public constructor(public collectionId?: string) {
    this.id = uuid();
  }

  get length() {
    return this.devices.length;
  }

  get devices() {
    return values(model.devices).filter(d => d.busId === this.id);
  }

  add(device: Device) {
    console.log('add', device);
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
      devices: this.devices.map(d => d.toExportObject()),
    };
  }
 }