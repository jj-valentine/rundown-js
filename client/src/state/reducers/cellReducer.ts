// import produce from "immer";
import { useRef } from "react";
// import { Cell } from "../cell";

import { CellActionType } from "../action-types/cell-action-types";
import { CellAction } from "../actions/cell-actions";
/* Utils → Plugins + HelperSss */
import { Cache } from "../../utils/classes/Cache";
interface StateOfCells {
  data: Cache;
  loading: boolean;
  error: string | null;
}

const initialState: StateOfCells = {
  data: new Cache(),
  loading: false,
  error: null
};

export const cellReducer = (state: StateOfCells = initialState, action: CellAction): StateOfCells => {
  switch(action.type) {
    case CellActionType.INSERT_CELL_BEFORE: {
      const { id, cellType } = action.payload;
      const cellValue = {
        id: "",
        type: cellType,
        content: ""
      }

      let nextNode = undefined;
      if (id) nextNode = state.data.cells[id];
      state.data.set(cellValue, nextNode);
      return state;
    } 

    case CellActionType.DELETE_CELL: {
      const id = action.payload;
      state.data.delete(id);
      return state;
     } 
     
    case CellActionType.UPDATE_CELL: {
      const { id, content } = action.payload;
      state.data.update(content, id);
      return state;
    }

    // case CellActionType.SHIFT_CELL: {
    //   const { id, direction } = action.payload;
    //   state.data.shift(id, direction);
    //   break; 
    // }

    default:
      return state;
  }
};