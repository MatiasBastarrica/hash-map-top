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
    }
  }

  getBuckets(index) {
    if (typeof index === "number") {
      return this.#buckets[index];
    } else {
      return this.#buckets;
    }
  }
}
