import { OPEN_NAV, CLOSE_NAV } from "../actions/types";

const initialState = {
  open: false
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
    default:
      return state;
  }
}
