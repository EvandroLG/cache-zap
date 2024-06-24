import CacheZap from './index';

describe('CacheZap', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should store and retrieve a value', () => {
    const cache = new CacheZap<string, number>();
    cache.set('key1', 100, 1000);
    expect(cache.get('key1')).toBe(100);
  });

  test('should return undefined for expired entries', () => {
    const cache = new CacheZap<string, number>();
    cache.set('key1', 100, 1); // Set with a very short duration
    jest.advanceTimersByTime(2); // Fast-forward time to expire the entry
    expect(cache.get('key1')).toBeUndefined();
  });

  test('should return the correct number of valid entries', () => {
    const cache = new CacheZap<string, number>();
    cache.set('key1', 100, 1000);
    cache.set('key2', 200, 1);
    jest.advanceTimersByTime(2); // Fast-forward time to expire 'key2'

    expect(cache.size()).toBe(1);
  });
});
