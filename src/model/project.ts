import { v4 as uuid } from 'uuid';
import model from '@/model';
import Bus from './bus';
import { values } from 'lodash';
import { assertIdentified } from '@/typia';
import { DefaultBasis, DefaultIntervalMinutes } from './constant';
import type { IntervalMinutes } from '@/types';
import { startTimeString } from './utils';

export type TimeSpec = {
  basis: number;
  intervalMinutes: IntervalMinutes;
  startIntervalOffset: number;
};

export default class Project {
  static readonly MaxItems = 100;
  readonly basis: number = DefaultBasis;
  readonly intervalMinutes: IntervalMinutes = DefaultIntervalMinutes;
  readonly startIntervalOffset: number = 0; // start time offset from 0 in units of intervalMinutes.
  title?: string;

  public constructor(
    public readonly id = uuid()) {
  }

  get length() {
    return this.busses.length;
  }

  get busses() {
    return values(model.busses).filter(v => v.projectId === this.id);
  }

  get startTimeString() {
    return startTimeString(this);
  }


  add(bus: Bus) {
    if (bus.id in this.busses) return;
    if (this.length >= Bus.MaxItems) throw new RangeError(`Too many (max=${Bus.MaxItems})`);
    if (bus.basis !== this.basis) throw new Error('Incompatible basis');
    bus.projectId = this.id;
    model.busses[bus.id] = bus;
  }

  addNew() {
    const bus = Bus.newBus({
      projectId: this.id,
      basis: this.basis,
      intervalMinutes: this.intervalMinutes,
      startIntervalOffset: this.startIntervalOffset,
    });
    model.busses[bus.id] = bus;
  }

  reset() {
    for (const d of this.busses) {
      delete model.busses[d.id];
    }
  }

  static reviver(data: unknown) {
    const _data = assertIdentified(data);
    return new this(_data.id);
  }
}
