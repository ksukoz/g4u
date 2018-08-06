import { GET_ERRORS, GET_NEWS } from "../actions/types";

const initialState = {
  errors: null,
  news: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case GET_NEWS:
      return {
        ...state,
        news: action.payload
      };
    default:
      return state;
  }
}
