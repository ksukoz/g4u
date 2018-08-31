import { GET_APPOINT } from "../actions/types";

const initialState = {
  matches: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_APPOINT:
      return {
        ...state,
        matches: action.payload
      };
    default:
      return state;
  }
}
