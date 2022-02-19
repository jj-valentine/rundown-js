import { Cell } from "../cell";
import { CellActionType } from "../action-types/cell-action-types";
import { CellAction } from "../actions/cell-actions";
/* Utils → Plugins + HelperSss */
import { DLLNode, DoublyLinkedList } from "../../utils/classes/DoublyLinkedList"

interface CellState {
  data: {
    map: {
      [id: string]: DLLNode<Cell>
    },
    list: DoublyLinkedList<Cell>
  };
  loading: boolean;
  error: string | null;
}

const initialState: CellState = {
  data: {
    map: {},
    list: new DoublyLinkedList()
  },
  loading: false,
  error: null
};

export const cellReducer = (state: CellState = initialState, action: CellAction): CellState => {
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