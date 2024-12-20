import { v4 as uuid } from 'uuid';
import model from '@/model';
import { DefaultBasis } from './constant';
import { deviceFactory, BaseDevice, type DeviceType, type IBaseDevice } from './device';
import { values } from 'lodash';
import { assertEquals, TypeGuardError } from 'typia';
import { jsonParse } from './importlib';
import { typeGuardErrorToString } from '@/utils';
import { ValidationError } from '@/errors';

export interface IBus {
  id: string,
  collectionId?: string,
  basis: number,
}

export interface IBusExport {
  basis: number,
  devices?: BaseDevice[];
}

export default class Bus {
  static readonly MaxItems = 20;

  public constructor(
    public collectionId?: string,
    public readonly id = uuid(),
    public readonly basis: number = DefaultBasis,
  ) {
  }

  get length() {
    return this.devices.length;
  }

  get devices() {
    return values(model.devices).filter(d => d.busId === this.id);
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

  /**
   * @see toExportObject.
   */
  static fromExportObject(data: unknown): Bus {
    try {
      const o = assertEquals<IBusExport>(jsonParse(data));
      const bus = new Bus(undefined, undefined, o.basis);
      (o.devices || []).forEach((device) => {
        (device as any).id = uuid();
        bus.add(device);
      });
      return bus;
    } catch (e) {
      if (e instanceof TypeGuardError) {
        throw new ValidationError(typeGuardErrorToString(e));
      }
      throw e;
    }
  }


  static reviver(data: unknown) {
    const _data = assertEquals<IBus>(data);
    const o = new this(undefined, undefined, _data.basis);
    Object.assign(o, _data);
    return o;
  }
 }