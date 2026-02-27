import { LinkedList } from "./linked-lists.js";

export class HashMap {
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

  set(key, value) {
    const hashCode = this.hash(key);
    const linkedList = this.#buckets[hashCode];
    if (linkedList.contains(key)) {
      const node = linkedList.getNode(key);
      node.value = value;
    } else {
      linkedList.append(key, value);
      this.#size += 1;
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    const linkedList = this.#buckets[hashCode];
    if (linkedList.contains(key)) {
      const node = linkedList.getNode(key);
      return node.value;
    } else {
      return null;
    }
  }

  has(key) {
    const hashCode = this.hash(key);
    const linkedList = this.#buckets[hashCode];
    if (linkedList.contains(key)) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    const hashCode = this.hash(key);
    const linkedList = this.#buckets[hashCode];
    if (linkedList.contains(key)) {
      // continue here
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
  }

  getBuckets(index) {
    if (typeof index === "number") {
      return this.#buckets[index];
    } else {
      return this.#buckets;
    }
  }
}
