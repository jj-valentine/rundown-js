import { Cell } from "../cell";
import { CellActionType } from "../action-types/cell-action-types";
import { CellAction } from "../actions/cell-actions";
/* Utils → Plugins + HelperSss */
import { DLLNode, DoublyLinkedList } from "../../utils/classes/DoublyLinkedList"

interface CellState {
  data: {
    hash: {
      [id: string]: DLLNode<string, Cell>
    },
    list: DoublyLinkedList<string, Cell>
  };
  loading: boolean;
  error: string | null;
}

// const initialState: CellState = {
  
// };

// const cellsReducer = (state: CellState = initialState, action: CellAction ) => {

// };