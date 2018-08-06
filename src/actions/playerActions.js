import axios from "axios";
import { GET_ERRORS, GET_POSITIONS } from "../actions/types";

export const getPositions = () => dispatch => {
  axios
    .get("http://api.afl.lan/players/getposition", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_POSITIONS,
        payload: res.data.answer
      });
    });
};

export const addPlayer = (stuffData, history) => dispatch => {
  axios
    .post("http://api.afl.lan/players/add", stuffData, {
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
        history.push("/add-player");
      }
    });
};
