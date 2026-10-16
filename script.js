class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
    this.entryCount = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }

    if (this.buckets[index] === undefined) {
      this.buckets[index] = [];
    }

    for (const element of this.buckets[index]) {
      if (element[0] === key) {
        element[1] = value;
        return;
      }
    }

    this.buckets[index].push([key, value]);
    this.entryCount++;

    if (this.entryCount / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  resize() {
    const entries = this.entries();
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.entryCount = 0;

    for (const entry of entries) {
      this.set(entry[0], entry[1]);
    }
  }

  get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }

    if (this.buckets[index] === undefined) return undefined;

    for (const entry of this.buckets[index]) {
      if (entry[0] === key) return entry[1];
    }

    return undefined;
  }

  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }

    if (this.buckets[index] === undefined) return false;

    for (const entry of this.buckets[index]) {
      if (entry[0] === key) return true;
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }

    const bucket = this.buckets[index];

    if (bucket === undefined) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.entryCount--;
        return true;
      }
    }

    return false;
  }

  length() {
    let count = 0;

    for (const bucket of this.buckets) {
      if (bucket !== undefined) count += bucket.length;
    }

    return count;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.entryCount = 0;
  }

  keys() {
    let keys = [];

    for (const bucket of this.buckets) {
      if (bucket !== undefined) {
        for (const entry of bucket) {
          keys.push(entry[0]);
        }
      }
    }

    return keys;
  }

  values() {
    let values = [];

    for (const bucket of this.buckets) {
      if (bucket !== undefined) {
        for (const entry of bucket) {
          values.push(entry[1]);
        }
      }
    }

    return values;
  }

  entries() {
    let entries = [];

    for (const bucket of this.buckets) {
      if (bucket !== undefined) {
        for (const entry of bucket) {
          entries.push([...entry]);
        }
      }
    }

    return entries;
  }
}

export { HashMap };
