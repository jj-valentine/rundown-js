import { Cell } from "../../state/cell";
import { Direction } from "../../state/actions/cell-actions";
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
    console.log("ohhh boyyy")
  }

  public get cells(): CellMap {
    return this._cells;
  }
  
  public get list(): CellList {
    return this._list; 
  }
  
  /* add new cell/node to cache (i.e. 'DLL' + 'Hash') */
  public set(cellValue: Cell, nextNode?: DLLNode<Cell>): DLLNode<Cell> | undefined {
    if (!cellValue) return;
    const id = uuid(); // no need to check if 'uuid' exists since there's nearly 0% chance of duplication 
    cellValue.id = id;
    const newCellNode = this._list.insertBefore(cellValue, nextNode); // add new cell node to list
    if (!newCellNode) return; 
    this._cells[id] = newCellNode; // add new cell/node to hash map
    return newCellNode;
  }

  public delete(id: string): DLLNode<Cell> | undefined {
    /* if id' is neither valid 'uuid' NOR does it exist in cache, reutrn out */
    if (!isUuid(id) || !this._cells[id]) return;
    const nodeToRemove = this._cells[id];
    delete this._cells[id];
    return this._list.remove(nodeToRemove);
  }

  /* update value of existing cell/node (i.e. with new "content" -- raw code OR markdown) */
  public update(updatedContent: string, id: string): DLLNode<Cell> | undefined {
    /* if 'id' is neither empty, 'null', 'undefined' and is an invalid 'uuid' OR cell value is invalid (i.e. 'null' or 'undefined') */
    if (!isUuid(id) && updatedContent != null) return;
    const updatedNode = this._cells[id]; 
    updatedNode.value.content = updatedContent;
    return updatedNode;
  }

  public shift(id: string, direction: Direction): void {
    if (!isUuid(id) || !direction) return;
    const nodeToShift = this._cells[id];
    if (!nodeToShift) return;
    
    if (direction === "up") {
      this._list.shift(nodeToShift, true);
    } else if (direction === "down") {
      this._list.shift(nodeToShift, false);
    }
  }
}