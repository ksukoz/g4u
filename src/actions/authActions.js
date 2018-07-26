import axios from 'axios';
import { GET_ERRORS } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
  .post("http://api.afl.lan/user/registration", userData)
  .then(res => {
    // history.push("/login")
    if(res.data.error) {
      dispatch({
        type: GET_ERRORS,
        payload: res.data.message
      })
     } else {
      history.push("/login")
    }
    });
}