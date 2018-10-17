import { GET_POSITIONS, GET_PLAYER, GET_PLAYERS } from "../actions/types";

const initialState = {
  positions: null,
  player: null,
  players: null
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
    default:
      return state;
  }
}
