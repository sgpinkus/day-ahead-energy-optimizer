/**
 * The root model.
 */
import { reactive } from 'vue';
import { randomUUID } from '@/utils';
import { jsonParse, jsonStringify } from './importlib';
import messages from './messages';
import Bus from './bus';
import { MyName } from './constant';
import Collection from './collection';
import { BaseDevice } from './device';
import type { OptimizationResult } from './optimizationResult';

export { BaseDevice } from './device';
export { default as Bus } from './bus';
export { type OptimizationResult } from './optimizationResult';
export { default as Collection } from './collection';

export class Model {
  doneInit = false;
  hasRouted = false;
  doneLocalStorageNotice = false;
  messages = messages;
  collection: Collection = new Collection();
  collections: Record<string, Collection> = {};
  busses: Record<string, Bus> = {};
  optimizationResults: Record<string, OptimizationResult> = {};
  devices: Record<string, BaseDevice> = {};
  rail = false;
  focusedDeviceId?: string = undefined;
  focusedBusId?: string = undefined;
  focusedCollectionId?: string = undefined;
  basis = 48;

  get focusedBus() {
    return this.focusedBusId ? this.busses[this.focusedBusId] : undefined;
  }

  get focusedDevice() {
    return this.focusedDeviceId ? this.devices[this.focusedDeviceId] : undefined;
  }

  /**
   * Used in testing.
   */
  reset() {
    window.localStorage.clear();
    this.messages.reset();
    this.collections = {};
    this.busses = {};
    this.devices = {};
  }

  /**
   * Attempt to serialize state to local storage on page unload.
   * TODO: Accoujnt for multiple accounts.
   */
  shutdown() {
    console.log('Model: Shutting down');
    this.messages.clearAll();
    window.localStorage.setItem(MyName, jsonStringify(this));
  }
}

function fromLocalStorage() {
  testLocalStorage();
  const data = window.localStorage.getItem(MyName);
  if (data) {
    try {
      return jsonParse(data);
    } catch {
      // null;
    }
  }
  const model = new Model();
  if (data) model.messages.addAlert({ message: 'Error parsing model stashed in local storage. No salvage is attempted. Resting data!', type: 'error' });
  return new Model();
}

function testLocalStorage() {
  const a = messages.addAction({ state: 'started', message: 'Testing local storage access', contextName: 'Model' });
  const v = randomUUID();
  window.localStorage.setItem(v, v);
  const success = window.localStorage.getItem(v) === v;
  window.localStorage.removeItem(v);
  if (success) {
    messages.actionSuccess(a, 'Local storage access OK');
  } else {
    messages.actionError(a, 'Can\'t access local storage');
  }
  return success;
}


export default reactive<Model>(fromLocalStorage()) as Model;