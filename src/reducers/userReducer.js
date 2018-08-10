import { GET_ERRORS, GET_CURRENT_USER } from "../actions/types";

const initialState = {
  errors: null,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
