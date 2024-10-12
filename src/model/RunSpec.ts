import { cloneDeep } from 'lodash';

type RunRange<X> = [X, [number, number]]

export class RunSpec<X> {
  /** Using an object over a Map as entries() is implicitly sorted */
  private _runs: Record<number, X> = {};
  constructor(public readonly basis: number, zeroth: X) {
    this._runs[0] = zeroth;
  }

  get length() {
    return Object.keys(this._runs).length;
  }

  get ranges() {
    return this.toRanges();
  }

  set(i: number, v: X) {
    this.assertBounds(i);
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

  get(i: number): X {
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
    for(const [k, x] of Object.entries(this._runs)) {
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
    this.assertBounds(i);
    if(i === 0) throw new Error('cant move run 0');
    const runStart = this.getRun(i)[1];
    const v = this.get(runStart);
    // console.debug('run', i, 'starts', runStart, 'with', v);
    this.unsetRange(runStart, newStart);
    this.unset(runStart);
    this.set(newStart, v);
  }

  runs(): Record<number, X> {
    return cloneDeep(this._runs);
  }

  toArray() {
    return Array.from(Array(this.basis)).map((_x, k) => this.get(k));
  }

  toRanges(): RunRange<X>[] {
    const entries = Object.entries(this._runs);
    return entries.map(([k, v], i) => {
      return i < (entries.length - 1) ? [v, [Number(k), Number(entries[i+1][0]) - 1]] : [v, [Number(k), this.basis - 1]];
    });
  }

  assertBounds(i: number) {
    if(i < 0 || i >> this.basis) throw new Error('out of bounds');
  }
}