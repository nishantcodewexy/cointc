import { combineReducers } from "redux";

import alertReducer from "./alert.reducer";
import sessionReducer from "./session.reducer";
// Use the initialState as a default value

const rootReducer = combineReducers({
  session: sessionReducer,
  alert: alertReducer,
});

export default rootReducer;
