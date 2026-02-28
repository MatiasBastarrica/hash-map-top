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
  #keysArr = [];
  #valuesArr = [];

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
    let hashCode = this.hash(key);
    this.#isOutOfBounds();
    let linkedList = this.#buckets[hashCode];
    if (linkedList.contains(key)) {
      const node = linkedList.getNode(key);
      const valueIndex = this.#valuesArr.indexOf(node.value);
      this.#valuesArr.splice(valueIndex, 1, value);
      node.value = value;
    } else {
      if (this.#size >= this.capacity * this.loadFactor) {
        this.#grow();
        hashCode = this.hash(key);
        linkedList = this.#buckets[hashCode];
      }
      linkedList.append(key, value);
      this.#size += 1;
      this.#keysArr.push(key);
      this.#valuesArr.push(value);
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    this.#isOutOfBounds();
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
      const value = this.get(key);
      const valueIndex = this.#valuesArr.indexOf(value);
      this.#valuesArr.splice(valueIndex, 1);
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
    this.#valuesArr = [];
  }

  keys() {
    return this.#keysArr;
  }

  values() {
    return this.#valuesArr;
  }

  entries() {
    const entriesArr = [];

    for (let i = 0; i < this.#size; i++) {
      entriesArr.push([this.#keysArr[i], this.#valuesArr[i]]);
    }
    return entriesArr;
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
    const entriesArr = this.entries();
    this.#size = 0;
    this.#keysArr = [];
    this.#valuesArr = [];
    entriesArr.forEach((entry) => {
      this.set(entry[0], entry[1]);
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
