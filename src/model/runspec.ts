import { cloneDeep, mapValues } from 'lodash';

type RunRange<X> = [X, [number, number]]

export interface IRunSpec<X> {
  readonly basis: number;
  get length(): number;
  get ranges(): RunRange<X>[];
  set(i: number, v: X): void;
  unset(i: number): void;
  unsetIndex(i: number): void;
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

/**
 * Basically a Map<[number, number], X> that enforces certain constraints on the [number, number], also has a few useful
 * mutators. Validating the value X is beyond the scope of this class. That can be done in three ways: in the type X, or using
 * the `setter` initialization parameter to this class, or overriding set().
 */
export class RunSpec<X> implements IRunSpec<X> {
  /** Using an object over a Map as entries() is implicitly sorted -- https://exploringjs.com/es6/ch_oop-besides-classes.html#_traversal-order-of-properties */
  runs: Record<number, X> = {};
  constructor(
    public readonly basis: number,
    zerothValue: X,
    public readonly setter: (v: X) => X = (v) => v,
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
    this.runs[i] = this.setter.apply(this, [v]);
  }

  unset(i: number) {
    delete this.runs[i];
  }

  unsetIndex(i: number) {
    const start = this.toRanges()[i];
    if(start) delete this.runs[start[1][0]];
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
   * Get the start position of run for position i and its index in the collection of runs.
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
    if(i < 0 || i > this.basis) throw new RangeError('index out of bounds');
  }

  static copyFrom<X>(x: RunSpec<X>) {
    const y = new this(1, 1);
    Object.assign(this, cloneDeep(x));
    return y;
  }
}

/**
 * Bit ugh. hardBounds is an appendage to the RunSpec type for ~practical UI/validation concerns.
 */
export interface IBoundedNumberRunSpec<X> extends IRunSpec<X> {
  readonly hardBounds?: [number, number];
}

/**
 * Adds hardBounds constraint and specific coerce behaviour to set(). hardBounds are just one type of value validator you
 * might want and only really applicable where X = number.
 */
export class NumberRunSpec extends RunSpec<number> implements IBoundedNumberRunSpec<number> {
  constructor(
    public readonly basis: number,
    zerothValue?: number,
    public readonly hardBounds?: [number, number],
    coerce: boolean = true
  ) {
    super(basis, zerothValue ?? NumberRunSpec._figureZero(hardBounds),  NumberRunSpec._setter(hardBounds, coerce));
  }

  copy(): NumberRunSpec {
    return cloneDeep(this);
  }

  static _figureZero(hardBounds?: [number, number]) {
    if(hardBounds) return Math.abs(hardBounds[1]) > Math.abs(hardBounds[0]) ? hardBounds[0] : hardBounds[1];
    return 0;
  }

  static _setter(hardBounds?: [number,  number], coerce: boolean = true) {
    return (v: number) => {
      if(hardBounds && (v < hardBounds[0])) {
        if(!coerce) throw new RangeError('value out of bounds');
        v = hardBounds[0];
      }
      if(hardBounds && v > hardBounds[1]) {
        if(!coerce) throw new RangeError('value out of bounds');
        v = hardBounds[1];
      }
      return v;
    };
  }
}

export class BoundsRunSpec extends RunSpec<[number, number]> implements IBoundedNumberRunSpec<[number, number]> {
  constructor(
    public readonly basis: number,
    zerothValue: [number, number] = [0,0],
    public readonly hardBounds?: [number, number],
    setter: (v: [number, number]) => [number, number] = BoundsRunSpec._setter(hardBounds, true)
  ) {
    super(basis, zerothValue, setter);
  }

  static _setter(hardBounds?: [number, number], coerce: boolean = true) {
    return (v: [number, number]) => {
      if(hardBounds) {
        if(v.some((_v) => (_v < hardBounds![0] || _v > hardBounds![1]))) {
          if(!coerce) throw new RangeError('value out of bounds');
          v = v.map(_v => Math.max(Math.min(_v, hardBounds![1]), hardBounds![0])) as [number, number];
        }
      }
      if(v[1] < v[0]) {
        // This results in asymmetric behaviour when only one of L, H is changed, but good enough.
        if(!coerce) throw new RangeError('value out of bounds');
        v[0] = Math.min(...v);
        v[1] = Math.max(...v);
      }
      return v;
    };
  }
}

/**
 * Another hackush subtype for binding upper/lower values together needed in fixed load use cases - just easier to
 * subtype than use setter.
 */
export class FixedBoundsRunSpec extends BoundsRunSpec {
  set(i: number, v: [number, number]) {
    const cv: [number, number] = this.get(i);
    const _v: [number, number] = [cv[0] === v[0] ? v[1] : v[0], cv[1] === v[1] ? v[0] : v[1]];
    console.log('set', v, cv, _v);
    super.set(i, _v);
  }
}

/**
 * Proxy exposing IRunSpec<number> given a IRunSpec<number[]> or some other thing.
 */
export class NumberRunSpecAdaptor<X> implements IBoundedNumberRunSpec<number> {

  constructor(
    public readonly runSpec: IRunSpec<X>,
    public readonly xToNumber: (x: X) => number,
    public readonly numberToX: (y: number, i: number) => X,
    public readonly hardBounds?: [number, number],
  ) {
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
    this.runSpec.set(i, this.numberToX(v, i));
  }

  unset(i: number) {
    this.runSpec.unset(i);
  }

  unsetIndex(i: number): void {
    this.runSpec.unsetIndex(i);
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

  // TODO: This should be copy of self.
  copy(): IRunSpec<number> {
    const newRunSpec = new RunSpec<number>(this.basis, 0);
    newRunSpec.runs = this.toRecord();
    return newRunSpec;
  }
}

/**
 * Proxy exposing IRunSpec<number> given a IRunSpec<number[]>.
 */
export class PolyToNumberRunSpecAdaptor extends NumberRunSpecAdaptor<number[]> {
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

export class NumberRunSpecInverter extends NumberRunSpecAdaptor<number> {
  constructor(runSpec: IRunSpec<number>) {
    super(runSpec, (x: number) => -1*x, (x: number) => -1*x);
  }
}

