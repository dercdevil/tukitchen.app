import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import * as reducers from "./ducks";
import { AUTH_LOG_OUT } from "./ducks/auth";

const appReducer = combineReducers(reducers);

export const rootReducer = (state, action) => {
  if (action.type === AUTH_LOG_OUT) {
    storage.removeItem("persist:root");
    state = undefined;
  }

  return appReducer(state, action);
};
