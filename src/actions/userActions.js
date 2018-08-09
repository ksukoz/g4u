import axios from "axios";
import { GET_ERRORS, GET_USER } from "./types";

// Register User
export const editUser = userData => dispatch => {
  axios
    .post("http://api.afl.lan/user/update", userData, {
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
        console.log(res.data.answer);
      }
    });
};

export const getUser = () => dispatch => {
  axios
    .get("http://api.afl.lan/user/profile", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data.answer
      });
    });
};
