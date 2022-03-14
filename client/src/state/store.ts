import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// Combined Reducers
import { reducers } from "./reducers/reducers";

import { CellActionType } from "./action-types/cell-action-types";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

/* NOTE: ALL BELOW CODE IS FOR TESTING PURPOSES ONLY */
store.dispatch({ 
  type: CellActionType.INSERT_CELL_BEFORE,
  payload: {
    id: "",
    cellType: "code"
  }
});


console.log(store.getState());

store.dispatch({ 
  type: CellActionType.INSERT_CELL_BEFORE,
  payload: {
    id: "",
    cellType: "markdown"
  }
});

const currState = store.getState();
const list = currState.cells.data.list
if (list.head) {
  store.dispatch({ 
    type: CellActionType.UPDATE_CELL,
    payload: {
      id: list.head.value.id,
      content: "issss disss workinnn???!?!"
    }
  });
}

if (list.tail) {

  store.dispatch(store.dispatch({ 
    type: CellActionType.DELETE_CELL,
    payload: list.tail.value.id  
  }));
}

console.log(store.getState());


