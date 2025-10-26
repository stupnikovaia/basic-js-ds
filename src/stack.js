const { ListNode } = require("../extensions/list-node");
const { NotImplementedError } = require("../lib/errors");

/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */
class Stack {
  constructor() {
    this._top = null;
  }
  push(value) {
    if (!this._top) {
      this._top = new ListNode(value);
      return;
    }
    const newTop = new ListNode(value);
    newTop.next = this._top;
    this._top = newTop;
  }

  pop() {
    if (!this._top) {
      return undefined;
    }
    const value = this._top.value;
    this._top = this._top.next;
    return value;
  }

  peek() {
    return this._top ? this._top.value : undefined;
  }
}

module.exports = {
  Stack,
};
