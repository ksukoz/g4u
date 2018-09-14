import { GET_COMMANDS, GET_COMMAND, GET_FREE_NUMBERS } from "../actions/types";

const initialState = {
  commands: null,
  command: null,
  freeNumbers: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMMANDS:
      return {
        ...state,
        commands: action.payload
      };
    case GET_COMMAND:
      return {
        ...state,
        command: action.payload
      };
    case GET_FREE_NUMBERS:
      return {
        ...state,
        freeNumbers: action.payload
      };
    default:
      return state;
  }
}
