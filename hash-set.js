import { LinkedList } from "./linked-lists.js";

export class HashSet {
  #buckets;
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.#buckets = Array.from(
      { length: this.capacity },
      () => new LinkedList(),
    );
  }
  #size = 0;
  #keysArr = [];

  hash(key) {
    if (typeof key !== "string") {
      throw new Error("The key should be a string");
    }

    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key) {
    let hashCode = this.hash(key);
    this.#isOutOfBounds();
    let linkedList = this.#buckets[hashCode];
    if (linkedList.contains(key)) {
      return;
    } else {
      if (this.#size >= this.capacity * this.loadFactor) {
        this.#grow();
        hashCode = this.hash(key);
        linkedList = this.#buckets[hashCode];
      }
      linkedList.append(key, null);
      this.#size += 1;
      this.#keysArr.push(key);
    }
  }

  has(key) {
    const hashCode = this.hash(key);
    this.#isOutOfBounds();
    const linkedList = this.#buckets[hashCode];
    if (linkedList.contains(key)) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    const hashCode = this.hash(key);
    this.#isOutOfBounds();
    const linkedList = this.#buckets[hashCode];
    if (linkedList.contains(key)) {
      const keyIndex = this.#keysArr.indexOf(key);
      this.#keysArr.splice(keyIndex, 1);
      linkedList.remove(key);
      this.#size -= 1;
      return true;
    } else {
      return false;
    }
  }

  length() {
    return this.#size;
  }

  clear() {
    this.#buckets.forEach((bucket) => {
      if (bucket.headNode !== null) {
        bucket.headNode = null;
        bucket.tailNode = null;
      }
    });
    this.#size = 0;
    this.#keysArr = [];
  }

  keys() {
    return this.#keysArr;
  }

  #isOutOfBounds(index) {
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  #grow() {
    this.capacity = this.capacity * 2;
    this.#buckets = Array.from(
      { length: this.capacity },
      () => new LinkedList(),
    );
    const keysArr = this.keys();
    this.#size = 0;
    this.#keysArr = [];
    keysArr.forEach((key) => {
      this.set(key);
    });
  }

  getBuckets(index) {
    if (typeof index === "number") {
      this.#isOutOfBounds();
      return this.#buckets[index];
    } else {
      return this.#buckets;
    }
  }
}
