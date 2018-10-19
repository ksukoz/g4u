import { GET_ERRORS, GET_CURRENT_USER, GET_SPORT_TYPE } from "../actions/types";

const initialState = {
  errors: null,
  user: null,
  sport: null
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
    case GET_SPORT_TYPE:
      return {
        ...state,
        sport: action.payload
      };
    default:
      return state;
  }
}
