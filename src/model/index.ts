/**
 * The root model.
 */
import { reactive } from 'vue';
import { randomUUID } from '@/utils';
import Spaces from './spaces';
import Messages from './messages';


class Model {
  doneInit = false;
  hasRouted = false;
  doneLocalStorageNotice = false;
  messages: Messages; // Messages singleton.
  spaces: Spaces; // All spaces singleton
  ui = {
    rail: false,
    hideObjects: false,
    hideUsers: false,
    showUserLocations: true,
    showOnlyMyLocation: false,
    useUserLocationIcons: false,
  };

  /**
   * Syncronously initialize state restoring from local storage if any.
   */
  constructor() {
    this.messages = new Messages();
    this.testLocalStorage();
    let data: any = window.localStorage.getItem('patchy');
    data =  data ? JSON.parse(data) : undefined;
    const { spaces: spacesData, ui: uiData } = data || {};
    console.debug('Model: ' + (spacesData ? `Restoring ${Object.keys(spacesData.spaces).length} spaces from local storage` : 'No data in local storage'));
    // console.debug('Model: ' + (connection?.token ? 'Restoring auth token from local storage' : 'No auth in local storage'));
    this.doneLocalStorageNotice = data?.doneLocalStorageNotice || false;
    if(uiData) this.ui = uiData;
    this.spaces = new Spaces(spacesData);
  }

  /**
   * Used in testing.
   */
  reset() {
    window.localStorage.clear();
    this.messages.reset();
    this.spaces.reset();
  }

  /**
   * Async init phase.
   * TODO: Auth can take a long time (~10s) if server is down. Better to init model then react to auth state past init.
   */
  async init() {
    if (this.doneInit) return;
    await this.spaces.init();
    this.doneInit = true;
  }

  /**
   * Attempt to serialize state to local storage on page unload.
   * TODO: Accoujnt for multiple accounts.
   */
  shutdown() {
    console.log('Model: Shutting down');
    window.localStorage.setItem('patchy', JSON.stringify(this.toObject()));
  }

  toObject() {
    return {
      spaces: this.spaces.toObject(),
      doneLocalStorageNotice: this.doneLocalStorageNotice,
      ui: this.ui,
    };
  }

  testLocalStorage() {
    const a = this.messages.addAction({ state: 'started', message: 'Testing local storage access', contextName: 'Model' });
    const v = randomUUID();
    window.localStorage.setItem(v, v);
    const success = window.localStorage.getItem(v) === v;
    window.localStorage.removeItem(v);
    if(success) {
      this.messages.actionSuccess(a, 'Local storage access OK');
    } else {
      this.messages.actionError(a, 'Can\'t access local storage');
    }
    return success;
  }
}

const model = new Model();
export default reactive<Model>(model) as Model;