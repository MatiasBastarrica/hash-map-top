import { Node } from "./node.js";

export class LinkedList {
  constructor() {
    this.headNode = null;
    this.tailNode = null;
  }

  getNode(key) {
    for (let node = this.headNode; node !== null; node = node.nextNode) {
      if (node.key === key) {
        return node;
      }
    }
  }

  remove(key) {
    if (this.headNode.key == key) {
      this.headNode = this.headNode.nextNode;
    }
    for (let node = this.headNode; node !== null; node = node.nextNode) {
      if (node.nextNode !== null && node.nextNode.key === key) {
        node.nextNode = node.nextNode.nextNode;
        break;
      }
    }
  }

  append(key, value) {
    if (!this.headNode) {
      this.prepend(key, value);
      this.tailNode = this.headNode;
    } else {
      const prevNode = this.tailNode;
      this.tailNode = new Node(key, value);
      prevNode.nextNode = this.tailNode;
    }
  }

  prepend(key, value) {
    const nextNode = this.headNode;
    this.headNode = new Node(key, value, nextNode);
  }

  size() {
    if (!this.headNode) {
      return 0;
    } else if (!this.headNode.nextNode) {
      return 1;
    }

    let total = 1;
    for (
      let currentNode = this.headNode;
      currentNode.nextNode;
      currentNode = currentNode.nextNode
    ) {
      total += 1;
    }

    return total;
  }

  head() {
    if (!this.headNode) {
      return undefined;
    } else {
      return this.headNode.value;
    }
  }

  tail() {
    if (!this.headNode) {
      return undefined;
    } else {
      return this.tailNode.value;
    }
  }

  at(index) {
    if (!this.headNode) {
      return undefined;
    }
    let currentIndex = 0;
    let node;
    for (
      let currentNode = this.headNode;
      currentIndex <= index;
      currentNode = currentNode.nextNode
    ) {
      currentIndex += 1;
      node = currentNode;
      if (currentNode == null) {
        break;
      }
    }

    if (node && node !== null) {
      return node.value;
    } else {
      return undefined;
    }
  }

  pop() {
    if (!this.headNode) {
      return undefined;
    }
    let removedNode = this.headNode;

    this.headNode = this.headNode.nextNode;

    return removedNode.value;
  }

  contains(key) {
    if (!this.headNode) {
      return false;
    }
    let result;
    for (
      let currentNode = this.headNode;
      currentNode !== null;
      currentNode = currentNode.nextNode
    ) {
      if (currentNode.key === key) {
        result = true;
        break;
      }
    }
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  findIndex(value) {
    if (!this.headNode) {
      return -1;
    }

    let index = 0;
    let found = false;
    for (
      let currentNode = this.headNode;
      currentNode !== null;
      currentNode = currentNode.nextNode
    ) {
      if (currentNode.value === value) {
        found = true;
        break;
      }
      index += 1;
    }
    if (found) {
      return index;
    } else {
      return -1;
    }
  }

  toString() {
    if (!this.headNode) {
      return "";
    }

    let msg = "";
    for (
      let currentNode = this.headNode;
      currentNode !== null;
      currentNode = currentNode.nextNode
    ) {
      msg += `( ${currentNode.value} ) -> `;
    }
    msg += "null";
    return msg;
  }

  insertAt(index, ...values) {
    if (!this.headNode) {
      return undefined;
    } else if (index < 0) {
      throw new RangeError("The index if out of bounds");
    }
    let currentIndex = 0;
    let node;
    for (
      let currentNode = this.headNode;
      currentIndex <= index;
      currentNode = currentNode.nextNode
    ) {
      node = currentNode;
      currentIndex += 1;
      if (currentNode == null) {
        throw new RangeError("The index if out of bounds");
      }
    }

    let nextNode = node.nextNode;

    const newList = new LinkedList();
    for (let i = 0; i < values.length; i++) {
      newList.append(values[i]);
    }

    node.nextNode = newList.headNode;
    newList.tailNode.nextNode = nextNode;
  }

  removeAt(index) {
    if (!this.headNode) {
      return undefined;
    } else if (index < 0) {
      throw new RangeError("The index if out of bounds");
    }

    let currentIndex = 0;
    let prevNode;
    for (
      let currentNode = this.headNode;
      currentIndex <= index - 1;
      currentNode = currentNode.nextNode
    ) {
      prevNode = currentNode;
      currentIndex += 1;
      if (currentNode == null) {
        throw new RangeError("The index if out of bounds");
      }
    }

    let removedNode = prevNode.nextNode;
    let nextNode = removedNode.nextNode;

    prevNode.nextNode = nextNode;
  }
}
