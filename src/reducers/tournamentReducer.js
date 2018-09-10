import { GET_APPOINT, GET_CITIES, GET_TOURNAMENTS } from "../actions/types";

const initialState = {
  matches: null,
  location: null,
  tournaments: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_APPOINT:
      return {
        ...state,
        matches: action.payload
      };
    case GET_CITIES:
      return {
        ...state,
        location: action.payload
      };
    case GET_TOURNAMENTS:
      return {
        ...state,
        tournaments: action.payload
      };
    default:
      return state;
  }
}
