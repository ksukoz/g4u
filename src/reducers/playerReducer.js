import {
  GET_POSITIONS,
  GET_PLAYER,
  GET_PLAYERS,
  GET_PLAYER_INFO
} from "../actions/types";

const initialState = {
  positions: null,
  player: null,
  players: null,
  playerInfo: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSITIONS:
      return {
        ...state,
        positions: action.payload
      };
    case GET_PLAYER:
      return {
        ...state,
        player: action.payload
      };
    case GET_PLAYERS:
      return {
        ...state,
        players: action.payload
      };
    case GET_PLAYER_INFO:
      return {
        ...state,
        playerInfo: action.payload
      };
    default:
      return state;
  }
}
