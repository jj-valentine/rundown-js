import { DLLNode } from "./DLLNode";

class DoublyLinkedList<K, V> {
  public head: DLLNode<K, V> | null;
  public tail: DLLNode<K, V> | null;
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

  public insertBefore(key: K, value: V, nextNode?: DLLNode<K, V>): void {
    if (key == null || value == null) return;
    let node = undefined;
    if (!nextNode && this.size === 0) { // list is empty → new node is assigned to both 'head' and 'tail'
      node = new DLLNode(key, value);
      this.head = node;
      this.tail = this.head;
    } else if (this.size) { // list contains at least one node
      if (!nextNode && this.tail) { // insert new node at end of non-empty list
        const prevNode = this.tail;
        node = new DLLNode(key, value, prevNode, null);
        prevNode.next = node;
        this.tail = node;
      } else if (nextNode && nextNode === this.head) { // insert new node at beginning of non-empty list
        const nextNode = this.head;
        node = new DLLNode(key, value, null, nextNode);
        nextNode.prev = node;
        this.head = node;
      } else if (nextNode) { // insert new node somewhere in the middle of list
        const prevNode = nextNode.prev;
        node = new DLLNode(key, value, prevNode, nextNode);
        nextNode.prev = node;
        if (prevNode) prevNode.next = node;
      }
    }

    this.size++;
  }
  
  public remove(node: DLLNode<K, V>): void {
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
  }
}

export {
  DLLNode,
  DoublyLinkedList
};