import { OPEN_NAV, CLOSE_NAV, GET_COUNTRIES } from "../actions/types";

const initialState = {
  open: false,
  countries: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_NAV:
      return {
        ...state,
        open: action.payload
      };
    case CLOSE_NAV:
      return {
        ...state,
        open: action.payload
      };
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      };
    default:
      return state;
  }
}
