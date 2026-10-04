export function unique(arr) {
  if (!Array.isArray(arr)) throw new TypeError('arr must be an array');
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

export function groupBy(arr, keyFn) {
  if (!Array.isArray(arr)) throw new TypeError('arr must be an array');
  if (typeof keyFn !== 'function') throw new TypeError('keyFn must be a function');
  return arr.reduce((groups, item) => {
    const key = keyFn(item);
    groups[key] = groups[key] ? [...groups[key], item] : [item];
    return groups;
  }, {});
}

export function chunk(arr, size) {
  if (!Array.isArray(arr)) throw new TypeError('arr must be an array');
  if (!Number.isInteger(size) || size <= 0) throw new TypeError('size must be a positive integer');
  return arr.reduce((result, item, index) => {
    if (index % size === 0) result.push([]);
    result[result.length - 1].push(item);
    return result;
  }, []);
}

export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (Array.isArray(obj)) return obj.map(deepClone);
  return Object.entries(obj).reduce((copy, [key, value]) => {
    copy[key] = deepClone(value);
    return copy;
  }, {});
}

export function memoize(fn) {
  if (typeof fn !== 'function') throw new TypeError('fn must be a function');
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

export function counter(initialValue = 0) {
  if (typeof initialValue !== 'number') throw new TypeError('initialValue must be a number');
  let count = initialValue;
  return {
    inc: () => ++count,
    dec: () => --count,
    value: () => count,
  };
}
