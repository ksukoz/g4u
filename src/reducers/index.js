import { combineReducers } from "C:/Users/User/AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
