import CacheZap from './index';

describe('CacheZap', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('stores and retrieve a value', () => {
    const cache = new CacheZap<string, number>();
    cache.set('key1', 100, 1000);
    expect(cache.get('key1')).toBe(100);
  });

  test('returns undefined for expired entries', () => {
    const cache = new CacheZap<string, number>();
    cache.set('key1', 100, 1); // Set with a very short duration
    jest.advanceTimersByTime(2); // Fast-forward time to expire the entry
    expect(cache.get('key1')).toBeUndefined();
  });

  test('returns the correct number of valid entries', () => {
    const cache = new CacheZap<string, number>();
    cache.set('key1', 100, 1000);
    cache.set('key2', 200, 1);
    cache.set('key3', 300, 2);
    jest.advanceTimersByTime(3); // Fast-forward time to expire 'key2'

    expect(cache.size()).toBe(1);
  });

  test('deletes an entry', () => {
    const cache = new CacheZap<string, number>();
    cache.set('key1', 100, 1000);
    expect(cache.delete('key1')).toBeTruthy();
    expect(cache.get('key1')).toBeUndefined();
    expect(cache.size()).toBe(0);
    expect(cache.delete('key1')).toBeFalsy();
  });

  test('clears all entries', () => {
    const cache = new CacheZap<string, number>();
    cache.set('key1', 100, 1000);
    cache.set('key2', 200, 1000);
    cache.clear();
    expect(cache.size()).toBe(0);
  });
});
