import { createAssert } from 'typia';
import type { DeviceCosts, IBaseDevice } from '@/model/device';
import type { IAllRunSpec } from '@/lib/runspec';
import type { IBus, IBusExport } from '@/model/bus';

export const assertEqualsIBusExport = createAssert<IBusExport>();
export const assertEqualsIBus = createAssert<IBus>();
export const assertEqualsDeviceCosts = createAssert<DeviceCosts>();
export const assertEqualsIBaseDevice = createAssert<IBaseDevice>();
export const assertEqualsIAllRunSpec = createAssert<IAllRunSpec>();
export const assertIdentified = createAssert<{ id: string }>();
