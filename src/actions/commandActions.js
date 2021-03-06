import axios from "axios";
import {
  GET_ERRORS,
  GET_COMMANDS,
  GET_COMMAND,
  GET_FREE_NUMBERS
} from "./types";

export const getCommands = offset => dispatch => {
  axios
    .get(`http://api.mygame4u.com/command?offset=${offset}`, {
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
          type: GET_COMMANDS,
          payload: res.data.answer
        });
      }
    });
};

export const getCommandsByName = name => dispatch => {
  axios
    .get(`http://api.mygame4u.com/command?name=${name}`, {
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
          type: GET_COMMANDS,
          payload: res.data.answer
        });
      }
    });
};

export const getCommand = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/command/info/${id}`, {
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
          type: GET_COMMAND,
          payload: res.data.answer
        });
      }
    });
};

export const getFreeNumbers = () => dispatch => {
  axios
    .get(`http://api.mygame4u.com/command/getfreenumber`, {
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
          type: GET_FREE_NUMBERS,
          payload: res.data.answer.numbers
        });
      }
    });
};
