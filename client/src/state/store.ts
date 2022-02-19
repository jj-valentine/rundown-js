import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// Combined Reducers
import { reducers } from "./reducers/reducers";

export const store = createStore(reducers, {}, applyMiddleware(thunk));
