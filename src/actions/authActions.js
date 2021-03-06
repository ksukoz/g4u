import axios from "axios";
import { GET_ERRORS, GET_USER, SET_USER, LOGOUT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://api.mygame4u.com/user/registration", userData)
    .then(res => {
      if (res.data.error) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        });
      } else {
        history.push("/login");
      }
    });
};

export const loginUser = (userData, history) => dispatch => {
  axios.post("http://api.mygame4u.com/user/login", userData).then(res => {
    if (res.data.error) {
      dispatch({
        type: GET_ERRORS,
        payload: res.data.message
      });
    } else {
      localStorage.setItem("user", JSON.stringify(res.data.answer));
      if (res.data.answer.league === 0) {
        history.push("/choose-league");
      }
      dispatch({
        type: GET_USER,
        payload: res.data.answer
      });
    }
  });
};

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("user");
  dispatch({
    type: LOGOUT_USER,
    payload: false
  });
};
