import { ActionType } from "../action-types/action-types";
import { CellTypes } from "../Cell";

interface InsertCellAction {
  type: ActionType.INSERT_CELL_ABOVE;
  payload: {
    id: string; // 'id' of cell below insertion point/index
    type: CellTypes;
  };
}

interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

interface ShiftCellAction {
  type: ActionType.SHIFT_CELL;
  payload: {
    id: string;
    direction: "up" | "down";
  };
}

interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string; // 'id' of cell to delete
}

export type Action = InsertCellAction | UpdateCellAction | ShiftCellAction | DeleteCellAction;
