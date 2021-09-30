import { combineReducers, configureStore} from "redux";

import userReducer from "./user.reducer";
// Use the initialState as a default value

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
