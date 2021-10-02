import { combineReducers, configureStore} from "redux";

import alertReducer from "./alert.reducer";
import userReducer from "./user.reducer";
// Use the initialState as a default value

const rootReducer = combineReducers({
  user: userReducer,
  alert: alertReducer
});

export default rootReducer;
