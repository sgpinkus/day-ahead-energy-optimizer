import { v4 as uuid } from 'uuid';
import model from '@/model';
import Bus from './bus';
import { values } from 'lodash';
import { assertIdentified } from '@/typia';
import { DefaultBasis, DefaultIntervalMinutes } from './constant';
import type { IntervalTime } from '@/types';

export default class Project {
  static readonly MaxItems = 100;
  readonly basis: number = DefaultBasis;
  readonly interval: IntervalTime = DefaultIntervalMinutes;
  readonly startInterval: number = 0;
  readonly startHour: number = 0;
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

  get startTime() {
    return `${String(this.startHour % 24).padStart(2, '0')}:${String((this.startInterval * this.interval) % 60).padStart(2, '0')}`;
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
      interval: this.interval,
      startInterval: this.startInterval,
      startHour: this.startHour,
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
