import { CellActionType } from "../action-types/cell-action-types";
import { CellTypes } from "../cell";

export interface InsertCellBeforeAction {
  type: CellActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string | null; // 'id' of cell below insertion point/index
    cellType: CellTypes;
  };
}

export interface DeleteCellAction {
  type: CellActionType.DELETE_CELL;
  payload: string; // 'id' of cell to delete
}

export interface UpdateCellAction {
  type: CellActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export type Direction = "up" | "down";
export interface ShiftCellAction {
  type: CellActionType.SHIFT_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export type CellAction = InsertCellBeforeAction | DeleteCellAction | UpdateCellAction | ShiftCellAction;
