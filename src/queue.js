const { NotImplementedError } = require("../lib/errors");
const { ListNode } = require("../extensions/list-node.js");

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this._start = null;
  }

  getUnderlyingList() {
    const getPlain = (node) => {
      let object = {};
      if (!node) {
        return null;
      }
      object.value = node.value;
      object.next = getPlain(node.next);
      return object;
    };
    return getPlain(this._start);
  }

  enqueue(value) {
    if (!this._start) {
      this._start = new ListNode(value);
      return;
    }
    let current = this._start;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = new ListNode(value);
  }

  dequeue() {
    if (!this._start) {
      return;
    }
    const value = this._start.value;
    this._start = this._start.next;
    return value;
  }
}

module.exports = {
  Queue,
};
