import axios from "axios";
import {
  GET_APPOINT,
  GET_CITIES,
  GET_TOURNAMENTS,
  GET_SUB_TOURNAMENTS
} from "./types";

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

export const getCities = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/tournaments/listcities", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_CITIES,
        payload: res.data.answer
      });
    });
};

export const getTournaments = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/tournaments/listtours?cId=${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_TOURNAMENTS,
        payload: res.data.answer
      });
    });
};

export const getSubTournaments = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/tournaments/listsubtours?tId=${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_SUB_TOURNAMENTS,
        payload: res.data.answer
      });
    });
};
