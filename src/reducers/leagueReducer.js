import { GET_ERRORS, GET_LEAGUES } from "../actions/types";

const initialState = {
  errors: null,
  leaguesList: null,
  currentLeague: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LEAGUES:
      return {
        ...state,
        leaguesList: action.payload
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
}
