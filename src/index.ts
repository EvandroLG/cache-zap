/**
 * A cache that stores key-value pairs with a time limit for each entry.
 *
 * @template K - The type of keys used in the cache.
 * @template V - The type of values stored in the cache.
 */
class CacheZap<K, V> {
  private cache = new Map<K, [V, number]>();

  /**
   * Sets a value in the cache with a specified duration.
   *
   * @param {K} key - The key to identify the cache entry.
   * @param {V} value - The value to be cached.
   * @param {number} duration - The duration in milliseconds for which the entry should be valid.
   */
  public set(key: K, value: V, duration: number) {
    if (duration <= 0) {
      throw new Error('Duration must be a positive number.');
    }

    this.cache.set(key, [value, Date.now() + duration]);
  }

  /**
   * Gets a value from the cache.
   *
   * @param {K} key - The key to identify the cache entry.
   * @returns {(V | undefined)} The cached value if it exists and has not expired, otherwise undefined.
   */
  public get(key: K): V | undefined {
    const [value, expires] = this.cache.get(key) || [];

    if (expires && expires <= Date.now()) {
      this.cache.delete(key);
      return undefined;
    }

    return value;
  }

  /**
   * Deletes a value from the cache.
   *
   * @param {K} key - The key to identify the cache entry.
   * @returns {boolean} True if the entry was deleted, otherwise false.
   * @returns {boolean} True if the entry was deleted, otherwise false.
   */
  public delete(key: K): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clears the cache of all entries.
   *
   * @returns {void}
   */
  public clear(): void {
    this.cache.clear();
  }

  /**
   * Checks if a key exists in the cache and is not expired.
   *
   * @param {K} key - The key to check in the cache.
   * @returns {boolean} True if the key exists and is valid, otherwise false.
   */
  public has(key: K): boolean {
    const entry = this.cache.get(key);

    if (!entry) {
      return false;
    }

    const [, expires] = entry;

    return expires > Date.now();
  }

  /**
   * Returns the number of valid (non-expired) entries in the cache.
   *
   * @returns {number} The number of valid entries in the cache.
   */
  public size(): number {
    let count = 0;

    this.cache.forEach(([, expires]) => {
      if (expires > Date.now()) {
        count += 1;
      }
    });

    return count;
  }
}

export default CacheZap;
