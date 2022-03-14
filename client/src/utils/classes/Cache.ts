import { Cell } from "../../state/cell";
import { DLLNode, DoublyLinkedList } from "./DoublyLinkedList";
import { v4 as uuid, validate as isUuid } from "uuid";

type CellMap = { [id: string]: DLLNode<Cell> };
type CellList = DoublyLinkedList<Cell>;

export class Cache {
  private _cells: CellMap;
  private _list: CellList;

  constructor(prevCells?: CellMap, prevList?: CellList) {
    this._cells = prevCells || {};
    this._list = prevList || new DoublyLinkedList();
  }

  public get cells(): CellMap {
    return this._cells;
  }
  
  public get list(): CellList {
    return this._list; 
  }
  
  /*  */
  public set(cellValue: Cell, id?: string, nextNode?: DLLNode<Cell>): DLLNode<Cell> | undefined {
    /* if 'id' is neither empty, 'null', 'undefined' and invalid 'uuid' OR cell value is invalid */
    if ((id && !isUuid(id)) || !cellValue) return;
    // 'id' can still be falsey here
    const node = (id === undefined ? undefined : this.cells[id]);
    if (!node) { // 'id' is 'undefined' → new node cell to add 
      id = uuid(); // no need to check if 'uuid' exists since there's nearly 0% chance of duplication 
      const newCellNode = this._list.insertBefore(cellValue, nextNode);
      if (!newCellNode) return; 
      this.cells[id] = newCellNode;
      return newCellNode;
    } else { // node/cell already exists → update value with new "content" (i.e. raw code OR markdown)
      node.value.content = cellValue.content;
      // const updatedNode = this._list.insertBefore(cellValue, nextNode);
      // if (updatedNode) this.cells[id] = updatedNode;
      return node;
    }
  }

  public update() {

  }

  public delete(id: string): DLLNode<Cell> | undefined {
    /* 'id' is neither valid 'uuid' NOR does it exist in cache */
    if (!isUuid(id) || !this.cells[id]) return;
    const nodeToRemove = this.cells[id];
    delete this.cells[id];
    return this._list.remove(nodeToRemove);
  }
}