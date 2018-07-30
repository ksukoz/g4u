import axios from "axios";
import { GET_ERRORS } from "./types";

export const addNews = (newsData, history) => dispatch => {
  axios
    .post("http://api.afl.lan/news/add", newsData, {
      headers: { Authorization: `G4User ${localStorage.getItem("user")}` }
    })
    .then(res => {
      // history.push("/login")
      if (res.data.error) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        });
      }
      console.log(res.data.answer);
      //  else {
      //   history.push("/login")
      // }
    });
};
