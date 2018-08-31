import { GET_CURRENT_GAME } from "../actions/types";

const initialState = {
  currentGame: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_GAME:
      return {
        ...state,
        currentGame: action.payload
      };
    default:
      return state;
  }
}
