import { combineReducers } from "redux";
// Reducer(s)
import { cellReducer } from "./cellReducer";

export const reducers = combineReducers({
  cells: cellReducer
});

export type RootState = ReturnType<typeof reducers>;