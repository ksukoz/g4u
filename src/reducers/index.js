import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import newsReducer from "./newsReducer";
import leagueReducer from "./leagueReducer";

export default combineReducers({
  auth: authReducer,
  leagues: leagueReducer,
  errors: errorReducer,
  news: newsReducer
});
