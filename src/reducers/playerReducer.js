import { GET_ERRORS, GET_POSITIONS } from "../actions/types";

const initialState = {
  errors: null,
  positions: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case GET_POSITIONS:
      return {
        ...state,
        positions: action.payload
      };
    default:
      return state;
  }
}
