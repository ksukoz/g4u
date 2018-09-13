import axios from "axios";
import { GET_ERRORS, GET_COMMANDS } from "./types";

export const getCommands = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/command", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      if (res.data.error) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        });
      } else {
        dispatch({
          type: GET_COMMANDS,
          payload: res.data.answer
        });
      }
    });
};
