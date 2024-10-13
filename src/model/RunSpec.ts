import { cloneDeep } from 'lodash';

type RunRange = [number, [number, number]]

export class RunSpec {
  /** Using an object over a Map as entries() is implicitly sorted -- https://exploringjs.com/es6/ch_oop-besides-classes.html#_traversal-order-of-properties */
  private _runs: Record<number, number> = {};
  constructor(
    public readonly basis: number,
    zerothValue?: number,
    public readonly hardBounds?: [number, number],
  ) {
    this._runs[0] = zerothValue ?? this._figureZero();
  }

  _figureZero() {
    if(this.hardBounds) {
      return Math.abs(this.hardBounds[1]) > Math.abs(this.hardBounds[0]) ? this.hardBounds[0] : this.hardBounds[1];
    }
    return 0;
  }

  get length() {
    return Object.keys(this._runs).length;
  }

  get ranges() {
    return this.toRanges();
  }

  set(i: number, v: number) {
    this.assertIndexBounds(i);
    this.assertValueBounds(v);
    this._runs[i] = v;
  }

  unset(i: number) {
    delete this._runs[i];
  }

  unsetRange(s: number, e: number) {
    const [min, max] = [Math.min(s, e), Math.max(s, e)];
    for(const i of Object.keys(this._runs).map(i => Number(i))) {
      if(min <= i && max >= i) {
        this.unset(i);
      }
    }
  }

  get(i: number): number {
    let v = this._runs[0];
    for(const [k, x] of Object.entries(this._runs)) {
      if(Number(k) <= i) v = x;
      if(Number(k) > i) break;
    }
    return v;
  }

  /**
   * Get the start position of run for i and its index in the collection of runs.
   */
  getRun(i: number) {
    let start = 0;
    let index = -1;
    for(const [k] of Object.entries(this._runs)) {
      if(Number(k) <= i) start = Number(k);
      if(Number(k) > i) break;
      index += 1;
    }
    return [index, start];
  }

  split(i: number) {
    // eslint-disable-next-line prefer-const
    let [a, b] = Object.keys(this._runs).map(i => +i).slice(i, i+2);
    b = b || this.basis - 1;
    if (a === undefined || b - a <= 1) return;
    this.set(Math.floor(a + (b-a)/2), this.get(a));
  }

  /**
   * Change start of which ever run is at runIndex so that it is newStart with conditions and sideffects.
   * Just delete every run in between current start and newstart including old start.
   */
  move(i: number, newStart: number) {
    this.assertIndexBounds(i);
    if(i === 0) throw new Error('cant move run 0');
    const runStart = this.getRun(i)[1];
    const v = this.get(runStart);
    // console.debug('run', i, 'starts', runStart, 'with', v);
    this.unsetRange(runStart, newStart);
    this.unset(runStart);
    this.set(newStart, v);
  }

  runs(): Record<number, number> {
    return cloneDeep(this._runs);
  }

  toArray() {
    return Array.from(Array(this.basis)).map((_x, k) => this.get(k));
  }

  toRanges(): RunRange[] {
    const entries = Object.entries(this._runs);
    return entries.map(([k, v], i) => {
      return i < (entries.length - 1) ? [v, [Number(k), Number(entries[i+1][0]) - 1]] : [v, [Number(k), this.basis - 1]];
    });
  }

  copy() {
    return cloneDeep(this);
  }

  assertIndexBounds(i: number) {
    if(i < 0 || i >> this.basis) throw new RangeError('index out of bounds');
  }

  assertValueBounds(v: number) {
    if(this.hardBounds && (v < this.hardBounds[0] || v > this.hardBounds[1])) throw new RangeError('value out of bounds');
  }

  static copyFrom(x: RunSpec) {
    const y = new this(1, 1);
    Object.assign(this, cloneDeep(x));
    return y;
  }
}
