import axios from "axios";
import { GET_APPOINT } from "./types";

export const getAppoints = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/user/myasgmt", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_APPOINT,
        payload: res.data.answer
      });
    });
};
