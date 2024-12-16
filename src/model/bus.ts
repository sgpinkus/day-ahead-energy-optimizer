import { DefaultBasis } from './constant';
import { deviceFactory, type ContainerDevice, type Device, type DeviceType } from './device';

class Bus {
  public readonly devices: Record<string, ContainerDevice> = {};
  static readonly MaxDevices = 20;

  addDevice(device: Device) {
    this.devices[device.id] = device;
  }

  addDeviceType(type: DeviceType) {
    if(this.length >= Bus.MaxDevices) throw new RangeError(`Too many device (max=${Bus.MaxDevices})`);
    const device = deviceFactory({ type });
    this.addDevice(device);
  }

  deleteDevice(id: string) {
    delete this.devices[id];
  }

  get length() {
    return Object.keys(this.devices).length;
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