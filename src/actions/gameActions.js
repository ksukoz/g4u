import axios from "axios";
import { GET_CURRENT_GAME } from "../actions/types";

export const getCurrentGame = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/game?gId=${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_CURRENT_GAME,
        payload: res.data.answer
      });
    });
};
