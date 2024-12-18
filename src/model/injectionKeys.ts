import type { InjectionKey, Ref } from 'vue';
import type Collection from './collection';
import type Bus from './bus';
import type { BaseDevice } from './device';

export const CollectionInjection = Symbol('collection') as InjectionKey<Ref<Collection>>;
export const BusInjection = Symbol('bus') as InjectionKey<Bus>;
export const OptionalBusInjection = Symbol('optional-bus') as InjectionKey<Bus | undefined>;
export const DeviceInjection = Symbol('device') as InjectionKey<BaseDevice>;

