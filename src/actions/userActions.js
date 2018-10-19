import axios from "axios";
import { GET_ERRORS, GET_CURRENT_USER, GET_SPORT_TYPE } from "./types";

// Register User
export const editUser = userData => dispatch => {
  axios
    .post("http://api.mygame4u.com/user/update", userData, {
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
    .get("http://api.mygame4u.com/user/profile", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data.answer
      });
    });
};

export const getSportType = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/user/getsporttype", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_SPORT_TYPE,
        payload: res.data.answer
      });
    });
};
