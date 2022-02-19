/* 
NOTE: technically, we don't need to have a key (cellId) on each node 
TODO: remove key from Node & DLL once it's all working! 
*/ 
export class DLLNode<V> {
  // private _key: K; 
  private _value: V;
  public next: DLLNode<V> | null;
  public prev: DLLNode<V> | null;

  constructor(value: V, prev?: DLLNode<V> | null, next?: DLLNode<V> | null) {
    // this._key = key;
    this._value = value;
    this.prev = prev || null;
    this.next = next || null;
  }
  
  // get key(): K {
  //   return this._key;
  // }

  get value(): V {
    return this._value;
  }
}