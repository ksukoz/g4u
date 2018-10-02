import axios from "axios";
import {
  GET_CURRENT_GAME,
  GET_CURRENT_GAMES_LIST,
  GET_FUTURE_GAMES_LIST,
  GET_GAME_PLAYER_LIST,
  GET_GAME_INFO,
  GET_EVENT_SETTINGS,
  GET_EVENT,
  GET_PHOTOES,
  GET_VIDEOS,
  GET_ERRORS,
  GET_MESSAGES
} from "../actions/types";

export const addGameEvent = (id, eventData) => dispatch => {
  axios
    .post(`http://api.mygame4u.com/game/addevent/${id}`, eventData, {
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
          type: GET_MESSAGES,
          payload: res.data.message
        });
      }
    });
};

export const editGameEvent = (id, eventData) => dispatch => {
  axios
    .post(`http://api.mygame4u.com/game/updateevent/${id}`, eventData, {
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
          type: GET_MESSAGES,
          payload: res.data.message
        });
      }
    });
};

export const addGamesPlayers = (id, array) => dispatch => {
  axios
    .post(`http://api.mygame4u.com/game/inviteingame/${id}`, array, {
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
          type: GET_MESSAGES,
          payload: res.data.message
        });
      }
    });
};

export const addPhoto = (id, array) => dispatch => {
  axios
    .post(`http://api.mygame4u.com/game/addphoto/${id}`, array, {
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
        dispatch(getPhotoes(id));
      }
    });
};

export const deletePhoto = (id, pId) => dispatch => {
  axios
    .get(`http://api.mygame4u.com/game/delphoto/${pId}`, {
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
        dispatch(getPhotoes(id));
      }
    });
};

export const getPhotoes = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/game/getmedia/${id}?type=photo`, {
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
          type: GET_PHOTOES,
          payload: res.data.answer
        });
      }
    });
};

export const addVideo = (id, array) => dispatch => {
  axios
    .post(`http://api.mygame4u.com/game/addvideo/${id}`, array, {
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
        dispatch(getVideos(id));
      }
    });
};

export const deleteVideo = (id, pId) => dispatch => {
  axios
    .get(`http://api.mygame4u.com/game/delvideo/${pId}`, {
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
        dispatch(getVideos(id));
      }
    });
};

export const getVideos = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/game/getmedia/${id}?type=video`, {
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
          type: GET_VIDEOS,
          payload: res.data.answer
        });
      }
    });
};

export const getCurrentGame = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/game/relay/${id}`, {
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

export const getCurrentGamesList = () => dispatch => {
  axios
    .get(`http://api.mygame4u.com/game/mycurgames`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_CURRENT_GAMES_LIST,
        payload: res.data.answer
      });
    });
};

export const getFutureGamesList = () => dispatch => {
  axios
    .get(`http://api.mygame4u.com/game/myfutgames`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_FUTURE_GAMES_LIST,
        payload: res.data.answer
      });
    });
};

export const getGamePlayerList = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/game/playersingame/${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_GAME_PLAYER_LIST,
        payload: res.data.answer
      });
    });
};

export const getGameInfo = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/game/info/${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_GAME_INFO,
        payload: res.data.answer
      });
    });
};

export const getEventSettings = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/game/event/${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_EVENT_SETTINGS,
        payload: res.data.answer
      });
    });
};

export const getEvent = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/game/getevent/${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_EVENT,
        payload: res.data.answer
      });
    });
};

export const getGraphic = id => dispatch => {
  axios({
    url: `http://api.mygame4u.com/graf/game/${id}`,
    method: "GET",
    responseType: "arraybuffer",
    headers: {
      Authorization: `G4User ${JSON.parse(localStorage.getItem("user")).token}`
    }
  }).then(res => {
    const blob = new Blob([res.data], { type: "application/zip" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    let fileName = id;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  });
};

export const deleteEvent = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/game/delevent/${id}`, {
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
          type: GET_MESSAGES,
          payload: res.data.message
        });
      }
    });
};
