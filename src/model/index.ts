/**
 * The root model.
 */
import { reactive } from 'vue';
import { randomUUID } from '@/utils';
import { jsonParse, jsonStringify } from './importlib';
import messages from './messages';
import Devices from './devices';
import { MyName } from './constants';

export class Model {
  doneInit = false;
  hasRouted = false;
  doneLocalStorageNotice = false;
  messages = messages;
  devices: Devices;
  rail = false;
  focusedDeviceId: string | null = null;
  editingDeviceId: string | null = null;
  basis = 48;

  /**
   * Syncronously initialize state restoring from local storage if any.
   */
  constructor() {
    this.devices = new Devices();
  }

  /**
   * Used in testing.
   */
  reset() {
    window.localStorage.clear();
    this.messages.reset();
    this.devices.reset();
  }

  /**
   * Async init phase.
   * TODO: Auth can take a long time (~10s) if server is down. Better to init model then react to auth state past init.
   */
  async init() {
    if (this.doneInit) return;
    this.doneInit = true;
  }

  /**
   * Attempt to serialize state to local storage on page unload.
   * TODO: Accoujnt for multiple accounts.
   */
  shutdown() {
    console.log('Model: Shutting down');
    window.localStorage.setItem(MyName, jsonStringify(this));
  }
}

export function fromLocalStorage() {
  testLocalStorage();
  const data = window.localStorage.getItem(MyName);
  if(data) return jsonParse(data);
  return new Model();
}

function testLocalStorage() {
  const a = messages.addAction({ state: 'started', message: 'Testing local storage access', contextName: 'Model' });
  const v = randomUUID();
  window.localStorage.setItem(v, v);
  const success = window.localStorage.getItem(v) === v;
  window.localStorage.removeItem(v);
  if(success) {
    messages.actionSuccess(a, 'Local storage access OK');
  } else {
    messages.actionError(a, 'Can\'t access local storage');
  }
  return success;
}


export default reactive<Model>(fromLocalStorage()) as Model;