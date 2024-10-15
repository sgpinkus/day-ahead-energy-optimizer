import { expect, test, describe } from 'vitest';
import { RunSpec, PolyRunSpecNumberView } from './model/RunSpec';

function getTestObject1() {
  const x = new RunSpec(20, 1);
  x.set(10, 2);
  x.set(15, 3);
  return x;
}

describe('RunSpec', () => {
  test('basics', () => {
    const x = getTestObject1();
    expect(x.get(0)).equals(1);
    expect(x.get(9)).equals(1);
    expect(x.get(10)).equals(2);
    expect(x.get(13)).equals(2);
    expect(x.get(15)).equals(3);
    expect(x.toRecord()).keys(['0', '10', '15']);
    expect(x.toRanges().length).equals(3);
    expect(x.toArray().length).equals(20);
  });

  test('getRun', () => {
    const x = getTestObject1();
    Array.from(Array(30)).map((_k, v) => v)
      .map(v => console.log(x.getRun(v)));
  });

  test('move', () => {
    const x = getTestObject1();
    console.log(x.toRanges());
    x.move(13, 9);
    console.log(x.toRanges());
    x.move(13, 16);
    console.log(x.toRanges());
    x.move(16, 16);
    console.log(x.toRanges());
    x.move(16, 15);
    console.log(x.toRanges());
    expect(() => x.move(0, 19)).throws(Error);
    console.log(x.toRanges());
  });

  test('move more', () => {
    const x = new RunSpec(10, 1);
    x.set(2, 2);
    x.move(2, 0);
    console.log(x.toRanges());
  });
});

describe('PolyRunSpecNumberView', () => {
  test('basics', () => {
    const x = new RunSpec<[number, number, number]>(20, [0,0,0]);
    x.set(10, [1,1,1]);
    x.set(15, [2,2,2]);
    const y = new PolyRunSpecNumberView(x);
    expect(y.get(0)).equals(0);
    expect(y.get(10)).equals(3);
    expect(y.get(15)).equals(6);
    expect(x.toRanges().length).equals(3).equals(y.toRanges().length);
    y.split(2);
    expect(x.toRanges().length).equals(4).equals(y.toRanges().length);
    y.move(15, 10);
    expect(y.get(10)).equals(6);
  });
});