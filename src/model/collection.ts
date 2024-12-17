import Bus from './bus';

export default class Collection {
  public readonly busses: Record<string, { readonly id: string; }> = {};
  static readonly MaxItems = 100;

  get length() {
    return Object.keys(this.busses).length;
  }

  add(bus: Bus) {
    if(!(bus.id in this.busses)) {
      if(this.length >= Bus.MaxItems) throw new RangeError(`Too many (max=${Bus.MaxItems})`);
      this.busses[bus.id] = bus;
    }
  }

  delete(id: string) {
    delete this.busses[id];
  }

  reset() {
    (this.busses as any) = {};
  }
}
