import { DLLNode } from "./DLLNode";

class DoublyLinkedList<V> {
  public head: DLLNode<V> | null;
  public tail: DLLNode<V> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  public get length(): number {
    return this.size;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public insertBefore(value: V, nextNode?: DLLNode<V>): DLLNode<V> | undefined {
    if (value === null || value === undefined) return;
    let node = undefined;
    if (!nextNode && this.size === 0) { // list is empty → new node is assigned to both 'head' and 'tail'
      node = new DLLNode(value);
      this.head = node;
      this.tail = this.head;
    } else if (this.size) { // list contains at least one node
      if (!nextNode && this.tail) { // insert new node at end of non-empty list
        const prevNode = this.tail;
        node = new DLLNode(value, prevNode, null);
        prevNode.next = node;
        this.tail = node;
      } else if (nextNode && nextNode === this.head) { // insert new node at beginning of non-empty list
        const nextNode = this.head;
        node = new DLLNode(value, null, nextNode);
        nextNode.prev = node;
        this.head = node;
      } else if (nextNode) { // insert new node somewhere in the middle of list
        const prevNode = nextNode.prev;
        node = new DLLNode(value, prevNode, nextNode);
        nextNode.prev = node;
        if (prevNode) prevNode.next = node;
      }
    }

    this.size++;
    if (node) return node;
  }
  
  public remove(node: DLLNode<V>): DLLNode<V> {
    if (!node.prev && !node.next && this.head === node && this.tail === node) { // remove only node contained in list
      this.head = null;
      this.tail = null;
    } else if (!node.prev && node.next && this.head === node) { // remove node from beginning of list (containing at least one other node)
      const nextNode = node.next; 
      this.head = nextNode;
      node.next = null;
      nextNode.prev = null;
    } else if (!node.next && node.prev && this.tail === node) { // remove node from end of list (containing at least one other node)
      const prevNode = node.prev;
      this.tail = prevNode;
      node.prev = null;
      prevNode.next = null;
    } else if (node.prev && node.next) { // remove node from middle of the list
      const prevNode = node.prev, nextNode = node.next;
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      node.prev = null;
      node.next = null;
    } 

    this.size--;
    return node;
  }

  public shift(node: DLLNode<V>, moveTowardHead: boolean): void {
    if (this.size < 2) return;
    const prevNode = node.prev, nextNode = node.next;
    this.remove(node);

    if (moveTowardHead && prevNode) {
      this.insertBefore(node.value, prevNode);
    } else if (!moveTowardHead && nextNode) {
      if (nextNode.next) this.insertBefore(node.value, nextNode.next);
      else this.insertBefore(node.value)
    }
  }
}

export {
  DLLNode,
  DoublyLinkedList
};