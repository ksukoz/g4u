import {
  GET_CURRENT_GAME,
  GET_CURRENT_GAMES_LIST,
  GET_FUTURE_GAMES_LIST,
  GET_GAME_PLAYER_LIST,
  GET_GAME_INFO,
  GET_EVENT_SETTINGS,
  GET_EVENT,
  GET_PHOTOES,
  GET_VIDEOS
} from "../actions/types";

const initialState = {
  currentGame: null,
  currentGamesList: null,
  futureGamesList: null,
  playerList: null,
  gameInfo: null,
  settings: null,
  event: null,
  photoes: null,
  videos: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_GAME:
      return {
        ...state,
        currentGame: action.payload
      };
    case GET_CURRENT_GAMES_LIST:
      return {
        ...state,
        currentGamesList: action.payload
      };
    case GET_FUTURE_GAMES_LIST:
      return {
        ...state,
        futureGamesList: action.payload
      };
    case GET_GAME_PLAYER_LIST:
      return {
        ...state,
        playerList: action.payload
      };
    case GET_EVENT_SETTINGS:
      return {
        ...state,
        settings: action.payload
      };
    case GET_EVENT:
      return {
        ...state,
        event: action.payload
      };
    case GET_GAME_INFO:
      return {
        ...state,
        gameInfo: action.payload
      };
    case GET_PHOTOES:
      return {
        ...state,
        photoes: action.payload
      };
    case GET_VIDEOS:
      return {
        ...state,
        videos: action.payload
      };
    default:
      return state;
  }
}
