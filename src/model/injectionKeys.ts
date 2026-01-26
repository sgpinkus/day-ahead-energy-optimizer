import type { InjectionKey, Ref } from 'vue';
import type Project from './project';
import type Bus from './bus';
import type { BaseDevice } from './device';

export const ProjectInjection = Symbol('project') as InjectionKey<Ref<Project>>;
export const BusInjection = Symbol('bus') as InjectionKey<Bus>;
export const OptionalBusInjection = Symbol('optional-bus') as InjectionKey<Bus | undefined>;
export const DeviceInjection = Symbol('device') as InjectionKey<BaseDevice>;
