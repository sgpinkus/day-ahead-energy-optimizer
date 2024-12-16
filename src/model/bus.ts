import { DefaultBasis } from './constant';
import { deviceFactory, type ContainerDevice, type Device, type DeviceType } from './device';

class Bus {
  private devices: Record<string, ContainerDevice> = {};
  static readonly MaxDevices = 20;

  addDevice(device: Device) {
    this.devices[device.id] = device;
  }

  addDeviceType(type: DeviceType) {
    if(this.length >= Bus.MaxDevices) throw new RangeError(`Too many device (max=${Bus.MaxDevices})`);
    const device = deviceFactory({ type });
    console.log('addDeviceType', device);
    this.addDevice(device);
  }

  getDevice(id: string) {
    return this.devices[id];
  }

  getDevices() {
    return {...this.devices};
  }

  deleteDevice(id: string) {
    delete this.devices[id];
  }

  get length() {
    return Object.keys(this.devices).length;
  }

  reset() {
    this.devices = {};
  }

  toExportObject() {
    return {
      basis: DefaultBasis,
      devices: Object.values(this.devices).map(d => d.toExportObject()),
    };
  }
}

export default Bus;