import { DefaultBasis } from './constant';
import { deviceFactory, type ContainerDevice, type Device, type DeviceType } from './device';

class Bus {
  public readonly devices: Record<string, ContainerDevice> = {};
  static readonly MaxDevices = 20;

  get length() {
    return Object.keys(this.devices).length;
  }

  add(device: Device) {
    if(!(device.id in this.devices)) {
      if(this.length >= Bus.MaxDevices) throw new RangeError(`Too many device (max=${Bus.MaxDevices})`);
      this.devices[device.id] = device;
    }
  }

  addType(type: DeviceType) {
    if(this.length >= Bus.MaxDevices) throw new RangeError(`Too many device (max=${Bus.MaxDevices})`);
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
      basis: DefaultBasis,
      devices: Object.values(this.devices).map(d => d.toExportObject()),
    };
  }
}

export default Bus;