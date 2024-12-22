# cache-zap &middot; [![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

A cache that stores key-value pairs with a time limit for each entry.

## Installation

```bash
npm install cache-zap
```

## Usage

```javascript
import CacheZap from 'cache-zap';

const cache = new CacheZap();
cache.set('foo', 'bar', 1000); // key, value, time in milliseconds
cache.get('foo'); // 'bar'
cache.size(); // 1

setTimeout(() => {
  cache.get('foo'); // undefined
  cache.size(); // 0
}, 1000);
```

## API

### set(key: K, value: V, duration: number): void

Set a key-value pair with a time limit for the entry.

- `key`: The key of the entry.
- `value`: The value of the entry.
- `duration`: The duration in milliseconds for which the entry should be valid.

### get(key: K): V | undefined

Get the value of an entry.

- `key`: The key of the entry.

### has(key: K): boolean

Check if an entry exists and is not expired.

- `key`: The key of the entry.

### delete(key: K): boolean

Delete an entry.

- `key`: The key of the entry.

### clear(): void

Clear all entries.

### size(): number

Returns the number of valid (non-expired) entries in the cache.

## License

[MIT](./LICENSE)
