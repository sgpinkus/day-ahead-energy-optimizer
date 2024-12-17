import { v4 as uuid } from 'uuid';
import { DefaultBasis } from './constant';
import { deviceFactory, type ContainerDevice, type Device, type DeviceType } from './device';

export default class Bus {
  readonly id: string;
  public readonly devices: Record<string, ContainerDevice> = {};
  public readonly basis: number = DefaultBasis;
  static readonly MaxItems = 20;

  public constructor() {
    this.id = uuid();
  }

   get length() {
     return Object.keys(this.devices).length;
   }

   add(device: Device) {
     if(!(device.id in this.devices)) {
      if(this.length >= Bus.MaxItems) throw new RangeError(`Too many (max=${Bus.MaxItems})`);
       this.devices[device.id] = device;
     }
   }

   addType(type: DeviceType) {
    if(this.length >= Bus.MaxItems) throw new RangeError(`Too many (max=${Bus.MaxItems})`);
     const device = deviceFactory({ type });
     this.add(device);
   }

  delete(id: string) {
    delete this.devices[id];
  }

  reset() {
    (this.devices as any) = {};
  }

  toExportObject() {
    return {
      basis: this.basis,
      devices: Object.values(this.devices).map(d => d.toExportObject()),
    };
  }
 }