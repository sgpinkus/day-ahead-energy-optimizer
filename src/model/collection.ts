import { v4 as uuid } from 'uuid';
import model from '@/model';
import Bus from './bus';
import { values } from 'lodash';

export default class Collection {
  readonly id: string;
  static readonly MaxItems = 100;

  public constructor() {
    this.id = uuid();
  }

  get length() {
    return this.busses.length;
  }

  get busses() {
    return values(model.busses).filter(v => v.collectionId === this.id);
  }

  add(bus: Bus) {
    if (!(bus.id in this.busses)) {
      if (this.length >= Bus.MaxItems) throw new RangeError(`Too many (max=${Bus.MaxItems})`);
      bus.collectionId = this.id;
      model.busses[bus.id] = bus;
    }
  }

  addNew() {
    const bus = new Bus(this.id);
    model.busses[bus.id] = bus;
  }

  delete(id: string) {
    delete model.busses[id];
  }

  reset() {
    for (const d of this.busses) {
      delete model.busses[d.id];
    }
  }
}
