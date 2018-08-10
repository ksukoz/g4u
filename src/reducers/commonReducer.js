import {
  OPEN_NAV,
  CLOSE_NAV,
  GET_COUNTRIES,
  SET_ACTIVE_LINK
} from "../actions/types";

const initialState = {
  open: false,
  countries: null,
  activeLink: ""
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
    case SET_ACTIVE_LINK:
      return {
        ...state,
        activeLink: action.payload
      };
    default:
      return state;
  }
}
