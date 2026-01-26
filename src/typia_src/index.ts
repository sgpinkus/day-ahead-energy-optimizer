import { createAssert, createAssertEquals } from 'typia';
import type { DeviceCosts, IBaseDevice } from '@/model/device';
import type { IAllRunSpec } from '@/model/runspec';
import type { IBus, IBusExport } from '@/model/bus';

export const assertEqualsIBusExport = createAssertEquals<IBusExport>();
export const assertEqualsIBus = createAssertEquals<IBus>();
export const assertEqualsDeviceCosts = createAssertEquals<DeviceCosts>();
export const assertEqualsIBaseDevice = createAssertEquals<IBaseDevice>();
export const assertEqualsIAllRunSpec = createAssertEquals<IAllRunSpec>();
export const assertIdentified = createAssert<{ id: string }>();
