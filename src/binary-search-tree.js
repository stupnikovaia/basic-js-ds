const { NotImplementedError } = require("../lib/errors");
const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(data);
    if (!this._root) {
      this._root = node;
      return;
    }
    let current = this._root;
    let pasted = false;
    let future;
    let isLeft;
    while (!pasted) {
      if (data < current.data) {
        future = current.left;
        isLeft = true;
      } else {
        future = current.right;
        isLeft = false;
      }
      if (!future) {
        if (isLeft) {
          current.left = node;
        } else {
          current.right = node;
        }
        this.count++;
        pasted = true;
      } else {
        current = future;
      }
    }
  }

  find(data) {
    let current = this._root;
    while (current) {
      if (current.data === data) {
        return current;
      }
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      }
    }
    return null;
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  remove(data) {
    const removeNode = (parent, child) => {
      const isLeft = parent && parent.left === child ? true : false;
      if (child.left && child.right) {
        const greaterLeft = this._maxNode(child.left);
        if (!parent) {
          this._root.data = greaterLeft.data;
        } else {
          isLeft
            ? (parent.left.data = greaterLeft.data)
            : (parent.right.data = greaterLeft.data);
        }
        this._removeGreaterLeft(child);
        return;
      }
      let newNode;
      if (!child.left && !child.right) {
        newNode = null;
      }
      if (child.left && !child.right) {
        newNode = child.left;
      }
      if (!child.left && child.right) {
        newNode = child.right;
      }
      if (!parent) {
        this._root = newNode;
      } else {
        isLeft ? (parent.left = newNode) : (parent.right = newNode);
      }
    };

    let parent = null;
    let current = this._root;

    while (current) {
      if (current.data === data) {
        // определим left или right потомок сравнением внутри
        removeNode(parent, current);
        return;
      }
      parent = current;
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      }
    }
  }
  _removeGreaterLeft(node) {
    let current = node.left;

    if (!current) return;

    if (!current.right) {
      current.left = null;
      return;
    }
    // ищем самого правого и удаляем указатель на него
    while (current.right.right) {
      current = current.right;
    }
    current.right = null;
  }

  min() {
    let current = this._root;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    return this._maxNode(this._root).data;
  }

  _maxNode(node) {
    let current = node;
    while (current.right) {
      current = current.right;
    }
    return current;
  }
}

module.exports = {
  BinarySearchTree,
};
