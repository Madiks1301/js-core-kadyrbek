import { describe, expect, it, vi } from 'vitest';
import { unique, groupBy, chunk, deepClone, memoize, counter } from '../src/functions.js';

describe('array functions', () => {
  it('unique removes duplicates', () => expect(unique([1, 1, 2, 3, 3])).toEqual([1, 2, 3]));
  it('unique works with empty array', () => expect(unique([])).toEqual([]));
  it('unique rejects wrong type', () => expect(() => unique('abc')).toThrow(TypeError));

  it('groupBy groups objects using keyFn', () => {
    const users = [{ name: 'A', age: 20 }, { name: 'B', age: 21 }, { name: 'C', age: 20 }];
    expect(groupBy(users, (user) => user.age)['20']).toHaveLength(2);
  });
  it('groupBy works with empty array', () => expect(groupBy([], (x) => x)).toEqual({}));

  it('chunk splits an array', () => expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]));
  it('chunk rejects zero size', () => expect(() => chunk([1, 2], 0)).toThrow(TypeError));
});

describe('clone and closures', () => {
  it('deepClone copies nested objects and Date', () => {
    const source = { user: { name: 'Madiyar' }, date: new Date('2026-09-24') };
    const copy = deepClone(source);
    copy.user.name = 'Other';
    expect(source.user.name).toBe('Madiyar');
    expect(copy.date).not.toBe(source.date);
    expect(copy.date.getTime()).toBe(source.date.getTime());
  });

  it('memoize caches a result', () => {
    const fn = vi.fn((a, b) => a + b);
    const cached = memoize(fn);
    expect(cached(2, 3)).toBe(5);
    expect(cached(2, 3)).toBe(5);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('memoize rejects wrong type', () => expect(() => memoize(123)).toThrow(TypeError));

  it('counter starts at zero', () => expect(counter().value()).toBe(0));
  it('counter inc and dec change private closure value', () => {
    const c = counter();
    c.inc(); c.inc(); c.dec();
    expect(c.value()).toBe(1);
  });
});
