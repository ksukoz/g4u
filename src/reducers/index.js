import { combineReducers } from "redux";
import authReducer from "./authReducer";
import languageReducer from "./languageReducer";
import errorReducer from "./errorReducer";
import newsReducer from "./newsReducer";
import leagueReducer from "./leagueReducer";
import playerReducer from "./playerReducer";
import commonReducer from "./commonReducer";
import userReducer from "./userReducer";

export default combineReducers({
  lang: languageReducer,
  auth: authReducer,
  leagues: leagueReducer,
  errors: errorReducer,
  news: newsReducer,
  players: playerReducer,
  common: commonReducer,
  users: userReducer
});
