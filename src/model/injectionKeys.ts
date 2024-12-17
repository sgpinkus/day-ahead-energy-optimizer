import type { InjectionKey } from 'vue';
import type Bus from './bus';
import type { BaseDevice } from './device';

export const BusInjection = Symbol('bus') as InjectionKey<Bus>;
export const DeviceInjection = Symbol('device') as InjectionKey<BaseDevice>;

