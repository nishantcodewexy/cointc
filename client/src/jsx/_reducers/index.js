import { combineReducers } from "redux";

// import alert from "./alert.reducer";
import session from "./session.reducer";
import request from "./request.reducer";
import notice from "./notice.reducer";
// Use the initialState as a default value

const rootReducer = combineReducers({
  session,
  request,
  notice,
});

export default rootReducer;
