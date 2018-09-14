import axios from "axios";
import { GET_ERRORS, GET_NEWS, GET_NEWS_ITEM, GET_MESSAGES } from "./types";

export const addNews = newsData => dispatch => {
  axios
    .post("http://api.mygame4u.com/news/add", newsData, {
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

export const editNews = (newsData, id) => dispatch => {
  axios
    .post(`http://api.mygame4u.com//news/update/${id}`, newsData, {
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

export const getNews = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/news", {
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
          type: GET_NEWS,
          payload: res.data.answer
        });
      }
    });
};

export const getNewsItem = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/news/${id}`, {
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
          type: GET_NEWS_ITEM,
          payload: res.data.answer
        });
      }
    });
};

export const setLike = newsId => dispatch => {
  axios
    .post("http://api.mygame4u.com/news/like", newsId, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch(getNews());
    });
};
