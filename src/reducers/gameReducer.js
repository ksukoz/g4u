import { GET_CURRENT_GAME, GET_EVENT_SETTINGS } from "../actions/types";

const initialState = {
  currentGame: null,
  settings: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_GAME:
      return {
        ...state,
        currentGame: action.payload
      };
    case GET_EVENT_SETTINGS:
      return {
        ...state,
        settings: action.payload
      };
    default:
      return state;
  }
}
