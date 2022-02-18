import { CellActionType } from "../action-types/cell-action-types";
import { CellTypes } from "../cell";

interface InsertCellAction {
  type: CellActionType.INSERT_CELL_ABOVE;
  payload: {
    id: string; // 'id' of cell below insertion point/index
    type: CellTypes;
  };
}

interface UpdateCellAction {
  type: CellActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

interface ShiftCellAction {
  type: CellActionType.SHIFT_CELL;
  payload: {
    id: string;
    direction: "up" | "down";
  };
}

interface DeleteCellAction {
  type: CellActionType.DELETE_CELL;
  payload: string; // 'id' of cell to delete
}

export type CellAction = InsertCellAction | UpdateCellAction | ShiftCellAction | DeleteCellAction;
