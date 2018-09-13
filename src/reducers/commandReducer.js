import { GET_COMMANDS, GET_COMMAND } from "../actions/types";

const initialState = {
  commands: null,
  command: null
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
    default:
      return state;
  }
}
