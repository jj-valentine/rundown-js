import { CellTypes } from "../cell";
import { CellActionType } from "../action-types/cell-action-types";
import { 
  InsertCellBeforeAction, 
  DeleteCellAction,
  UpdateCellAction, 
  ShiftCellAction,
  Direction
} from "../actions/cell-actions";

const insertCellBefore = (id: string | null, cellType: CellTypes): InsertCellBeforeAction => {
  return {
    type: CellActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      cellType
    }
  };
};
 
const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: CellActionType.DELETE_CELL,
    payload: id
  };
};

const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: CellActionType.UPDATE_CELL,
    payload: {
      id, 
      content
    }
  };
};

const shiftCell = (id: string, direction: Direction): ShiftCellAction => {
  return {
    type: CellActionType.SHIFT_CELL,
    payload: {
      id,
      direction
    }
  };
};

export {
  insertCellBefore,
  deleteCell,
  updateCell,
  shiftCell
};