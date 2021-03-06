import axios from "axios";
import { GET_LEAGUES } from "./types";

// Get leagues
export const getLeagues = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/leagues", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_LEAGUES,
        payload: res.data.answer
      });
    });
};

export const setLeagues = (leagueId, history) => dispatch => {
  axios
    .post("http://api.mygame4u.com/user/setleague", leagueId, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      history.push("/");
    });
};
