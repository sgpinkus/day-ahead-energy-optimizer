import { cloneDeep, mapValues } from 'lodash';

type RunRange<X> = [X, [number, number]]

export interface IRunSpec<X> {
  readonly basis: number;
  readonly hardBounds?: [X, X]; // Shouldn't really exist on type but meh.
  get length(): number;
  get ranges(): RunRange<X>[];
  set(i: number, v: X): void;
  unset(i: number): void;
  unsetRange(s: number, e: number): void;
  get(i: number): X;
  getRun(i: number): [number, number];
  split(i: number): void;
  move(i: number, newStart: number): void;
  toRecord(): Record<number, X>;
  toArray(): X[];
  toRanges(): RunRange<X>[];
  copy(): IRunSpec<X>;
}

export class RunSpec<X> implements IRunSpec<X> {
  /** Using an object over a Map as entries() is implicitly sorted -- https://exploringjs.com/es6/ch_oop-besides-classes.html#_traversal-order-of-properties */
  runs: Record<number, X> = {};
  constructor(
    public readonly basis: number,
    zerothValue: X,
    public readonly hardBounds?: [X, X],
  ) {
    this.runs[0] = zerothValue;
  }

  get length() {
    return Object.keys(this.runs).length;
  }

  get ranges() {
    return this.toRanges();
  }

  set(i: number, v: X) {
    this.assertIndexBounds(i);
    this.runs[i] = v;
  }

  unset(i: number) {
    delete this.runs[i];
  }

  unsetRange(s: number, e: number) {
    const [min, max] = [Math.min(s, e), Math.max(s, e)];
    for(const i of Object.keys(this.runs).map(i => Number(i))) {
      if(min <= i && max >= i) {
        this.unset(i);
      }
    }
  }

  get(i: number): X {
    let v = this.runs[0];
    for(const [k, x] of Object.entries(this.runs)) {
      if(Number(k) <= i) v = x;
      if(Number(k) > i) break;
    }
    return v;
  }

  /**
   * Get the start position of run for i and its index in the collection of runs.
   */
  getRun(i: number): [number, number] {
    let start = 0;
    let index = -1;
    for(const [k] of Object.entries(this.runs)) {
      if(Number(k) <= i) start = Number(k);
      if(Number(k) > i) break;
      index += 1;
    }
    return [index, start];
  }

  split(i: number) {
    // eslint-disable-next-line prefer-const
    let [a, b] = Object.keys(this.runs).map(i => +i).slice(i, i+2);
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

  toRecord(): Record<number, X> {
    return cloneDeep(this.runs);
  }

  toArray(): X[] {
    return Array.from(Array(this.basis)).map((_x, k) => this.get(k));
  }

  toRanges(): RunRange<X>[] {
    const entries = Object.entries(this.runs);
    return entries.map(([k, v], i) => {
      return i < (entries.length - 1) ? [v, [Number(k), Number(entries[i+1][0]) - 1]] : [v, [Number(k), this.basis - 1]];
    });
  }

  copy(): RunSpec<X> {
    return cloneDeep(this);
  }

  protected assertIndexBounds(i: number) {
    if(i < 0 || i >> this.basis) throw new RangeError('index out of bounds');
  }

  static copyFrom<X>(x: RunSpec<X>) {
    const y = new this(1, 1);
    Object.assign(this, cloneDeep(x));
    return y;
  }
}

export class NumberRunSpec extends RunSpec<number> {
  constructor(
    public readonly basis: number,
    zerothValue?: number,
    public readonly hardBounds?: [number, number],
  ) {
    super(basis, zerothValue ?? NumberRunSpec._figureZero(hardBounds));
  }

  set(i: number, v: number) {
    this.assertIndexBounds(i);
    this.assertValueBounds(v);
    this.runs[i] = v;
  }

  assertValueBounds(v: number) {
    if(this.hardBounds && (v < this.hardBounds[0] || v > this.hardBounds[1])) throw new RangeError('value out of bounds');
  }

  copy(): NumberRunSpec {
    return cloneDeep(this);
  }

  static _figureZero(hardBounds?: [number, number]) {
    if(hardBounds) return Math.abs(hardBounds[1]) > Math.abs(hardBounds[0]) ? hardBounds[0] : hardBounds[1];
    return 0;
  }
}

/**
 * Proxy exposing IRunSpec<number> given a IRunSpec<number[]>.
 */
export class NumberRunSpecProxy<X> implements IRunSpec<number> {

  constructor(
    public readonly runSpec: IRunSpec<X>,
    public readonly xToNumber: (x: X) => number,
    public readonly numberToX: (y: number) => X,
  ) {
  }

  get hardBounds(): [number, number] | undefined {
    if(this.runSpec.hardBounds) {
      return [this.xToNumber(this.runSpec.hardBounds[0]), this.xToNumber(this.runSpec.hardBounds[1])].sort() as [number, number];
    }
  }

  get basis(): number {
    return this.runSpec.basis;
  }

  get length(): number {
    return this.runSpec.length;
  }

  get ranges() {
    return this.toRanges();
  }

  set(i: number, v: number) {
    this.runSpec.set(i, this.numberToX(v));
  }

  unset(i: number) {
    this.runSpec.unset(i);
  }

  unsetRange(s: number, e: number) {
    this.runSpec.unsetRange(s, e);
  }

  get(i: number) {
    return this.xToNumber(this.runSpec.get(i));
  }

  getRun(i: number): [number, number] {
    return this.runSpec.getRun(i);
  }

  split(i: number) {
    return this.runSpec.split(i);
  }

  move(i: number, newStart: number) {
    return this.runSpec.move(i, newStart);
  }

  toRecord(): Record<number, number> {
    return mapValues(this.runSpec.toRecord(), (v) => this.xToNumber(v));
  }

  toArray() {
    return this.runSpec.toArray().map((v) => this.xToNumber(v));
  }

  toRanges(): RunRange<number>[] {
    return this.runSpec.toRanges().map(([v, range]) => ([this.xToNumber(v), range]));
  }

  copy(): IRunSpec<number> {
    const newRunSpec = new RunSpec<number>(this.basis, 0);
    newRunSpec.runs = this.toRecord();
    return newRunSpec;
  }
}

/**
 * Proxy exposing IRunSpec<number> given a IRunSpec<number[]>.
 */
export class PolyRunSpecNumberView extends NumberRunSpecProxy<number[]> {
  polyToNumber(p: number[], x = 1): number {
    return p.map((v, k) => v*(x**k)).reduce((a, b) => a + b, 0);
  }

  numberToPoly(x: number, order: number) {
    return Array.from(Array(order)).map(() => x*0);
  }

  constructor(
    public readonly runSpec: IRunSpec<number[]>
  ) {
    super(runSpec, (x: number[]) => this.polyToNumber(x), (y: number) => this.numberToPoly(y, this.length));
  }
}

export class NumberRunSpecInverter extends NumberRunSpecProxy<number> {
  constructor(runSpec: IRunSpec<number>) {
    super(runSpec, (x: number) => -1*x, (x: number) => -1*x);
  }
}