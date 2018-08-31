import { GET_MESSAGES } from "../actions/types";

const initialState = {
  errors: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload;
    default:
      return "";
  }
}
