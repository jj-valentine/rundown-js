/* 
NOTE: technically, we don't need to have a key (cell id) on each node 
TODO: remove key from Node & DLL once it's all working! 
*/ 
export class DLLNode<K, V> {
  private _key: K; 
  private _value: V;
  public next: DLLNode<K, V> | null;
  public prev: DLLNode<K, V> | null;

  constructor(key: K, value: V, prev?: DLLNode<K, V> | null, next?: DLLNode<K, V> | null) {
    this._key = key;
    this._value = value;
    this.prev = prev || null;
    this.next = next || null;
  }
  
  get key(): K {
    return this._key;
  }

  get value(): V {
    return this._value;
  }
}