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

export { default as Bus } from './bus';
export { default as Collection } from './collection';


export class Model {
  doneInit = false;
  hasRouted = false;
  doneLocalStorageNotice = false;
  messages = messages;
  collection: Collection = new Collection();
  bus: Bus;
  rail = false;
  focusedDeviceId: string | null = null;
  editingDeviceId: string | null = null;
  basis = 48;

  /**
   * Syncronously initialize state restoring from local storage if any.
   */
  constructor() {
    this.bus = new Bus();
  }

  /**
   * Used in testing.
   */
  reset() {
    window.localStorage.clear();
    this.messages.reset();
    this.bus.reset();
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
    this.messages.clearAll();
    window.localStorage.setItem(MyName, jsonStringify(this));
  }

  toExportObject() {
    return {
      data: this.bus.toExportObject(),
      meta: {
        // version
      }
    };
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