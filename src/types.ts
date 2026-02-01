export type IntervalMinutes = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 15 | 20 | 30 | 60;

export type AllMutable<T> = {
  -readonly [K in keyof T]: T[K];
};

export type Mutable<T, K extends keyof T> =
  Omit<T, K> & {
    -readonly [P in K]: T[P];
  };
