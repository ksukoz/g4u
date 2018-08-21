import axios from "axios";
import { GET_ERRORS, GET_POSITIONS, GET_PLAYER } from "../actions/types";

export const getPositions = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/players/getposition", {
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
    .post("http://api.mygame4u.com/players/add", stuffData, {
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
        const user = JSON.parse(localStorage.getItem("user"));
        user.player = res.data.answer;
        localStorage.setItem("user", JSON.stringify(user));
        history.push("/edit-player");
      }
    });
};

export const getPlayer = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/user/player", {
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
        dispatch({
          type: GET_PLAYER,
          payload: res.data.answer
        });
      }
    });
};

export const updatePlayer = (stuffData, history) => dispatch => {
  axios
    .post("http://api.mygame4u.com/user/updateplayer", stuffData, {
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
        history.push("/edit-player");
        dispatch(getPlayer());
      }
    });
};

export const separatePlayer = history => dispatch => {
  axios
    .get("http://api.mygame4u.com/user/delplmerge", {
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
