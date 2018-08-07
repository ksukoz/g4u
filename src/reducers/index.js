import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import newsReducer from "./newsReducer";
import leagueReducer from "./leagueReducer";
import playerReducer from "./playerReducer";
import commonReducer from "./commonReducer";

export default combineReducers({
  auth: authReducer,
  leagues: leagueReducer,
  errors: errorReducer,
  news: newsReducer,
  players: playerReducer,
  common: commonReducer
});
