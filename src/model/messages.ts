import { AxiosError } from 'axios';
import { randomUUID } from '@/utils';
import { reactive } from 'vue';

// So typescript doens't complain.
const setTimeout = window.setTimeout;
const clearInterval = window.clearInterval;

export interface AlertDescription {
  title?: string,
  message: string,
  type: 'success' | 'info' | 'warning' | 'error' // https://next.vuetifyjs.com/en/components/alerts/#type,
  statusCode?: number
  contextName?: string,
}

export interface Alert extends AlertDescription {
  id: string,
}

// Actions are things that progress from started then progress to success, error, or warning
export interface ActionDescription {
  message: string,
  state: 'started' | 'success' | 'warning' | 'error',
  contextName?: string,
}

export interface Action extends ActionDescription {
  id: string,
  removalTimerId: number,
}

function log(action: ActionDescription | AlertDescription) {
  console.log(`${action.contextName ? action.contextName + ': ' : ''}${action.message}`);
}

export class Messages {
  alerts: Alert[] = [];
  actions: Action[] = [];
  successMessage?: string;

  reset() {
    this.clearAll();
  }

  addAlertFromError(err: any) {
    if (err instanceof AxiosError && err.response?.data) {
      const { error, message } = err.response.data;
      this.addAlert({ type: 'error', title: error, message: `${err.message}: ${message}` });
    }
    else if (err instanceof Error) {
      this.addAlert({ type: 'error', title: err.name, message: String(err.message) });
    } else {
      this.addAlert({ type: 'error', title: 'An unknown error occured', message: String(err) });
    }
  }

  addAlert(alert: AlertDescription) {
    this.alerts = [...this.alerts, { ...alert, id: randomUUID() }];
  }

  removeAlert(id: string) {
    this.alerts = this.alerts.filter((a) => a.id !== id);
  }

  clearAlerts() {
    this.alerts = [];
  }

  getActions() {
    return [...this.actions];
  }

  addAction(action: ActionDescription, timeout = 10500) {
    log(action);
    const _action = {
      ...action,
      id: randomUUID(),
      removalTimerId: setTimeout(() => this.removeAction(_action.id), timeout)
    };
    this.actions = [...this.actions, _action].slice(-5);
    return _action;
  }

  updateAction(action: Action) {
     log(action);
     setTimeout(() => this.actions = this.actions.map((a) => a.id === action.id ? { ...a, ...action } : a), 1000);
     const clearTime = action.state === 'success' ? 2000 : 5000;
     clearInterval(action.removalTimerId);
     action.removalTimerId = setTimeout(() => this.removeAction(action.id), 1000 + clearTime);
  }

  actionStart(message: string, contextName?: string) {
    return this.addAction({ state: 'started', message, contextName });
  }

  actionSuccess(action: Action, message: string) {
    return this.updateAction({ ...action, state: 'success', message });
  }

  actionError(action: Action, message: string) {
    return this.updateAction({ ...action, state: 'error', message });
  }

  removeAction(id: string) {
    this.actions = this.actions.filter((a) => a.id !== id);
  }

  clearActions() {
    this.actions = [];
  }

  addSuccessMessage(message: string) {
    this.successMessage = message;
    const reset = () => { this.clearSuccessMessage(); };
    setTimeout(reset.bind(this), 2000);
  }

  clearSuccessMessage() {
    this.successMessage = undefined;
  }

  clearAll() {
    this.clearAlerts();
    this.clearActions();
    this.clearSuccessMessage();
  }

  isMessages() {
    return this.successMessage || this.alerts.length;
  }
}

export default reactive(new Messages());