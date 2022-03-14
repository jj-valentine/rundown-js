// import { Cell } from "../cell";
import { CellActionType } from "../action-types/cell-action-types";
import { CellAction } from "../actions/cell-actions";
/* Utils → Plugins + HelperSss */
import { Cache } from "../../utils/classes/Cache";
interface StateOfCells {
  // data: {
  //   map: {
  //     [id: string]: DLLNode<Cell>
  //   },
  //   list: DoublyLinkedList<Cell>
  // };
  cache: Cache;
  loading: boolean;
  error: string | null;
}


const initialState: StateOfCells = {
  // data: {
  //   map: {},
  //   list: new DoublyLinkedList()
  // },
  cache: new Cache(),
  loading: false,
  error: null
};

export const cellReducer = (state: StateOfCells = initialState, action: CellAction): StateOfCells => {
  switch(action.type) {
    case CellActionType.INSERT_CELL_BEFORE:
      return state;
    case CellActionType.DELETE_CELL:
      return state;
    case CellActionType.UPDATE_CELL:
      
      return state;
    case CellActionType.SHIFT_CELL:
      return state; 
    default:
      return state;
  }
};