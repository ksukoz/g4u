import axios from "axios";
import { OPEN_NAV, CLOSE_NAV, GET_COUNTRIES, SET_ACTIVE_LINK } from "./types";

export const handleDrawerOpen = () => {
  return {
    type: OPEN_NAV,
    payload: true
  };
};

export const handleDrawerClose = () => {
  return {
    type: CLOSE_NAV,
    payload: false
  };
};

export const getCountries = () => dispatch => {
  axios.get("http://api.mygame4u.com/location/country").then(res => {
    dispatch({
      type: GET_COUNTRIES,
      payload: res.data.answer
    });
  });
};

export const setActiveLink = activeLink => dispatch => {
  dispatch({
    type: SET_ACTIVE_LINK,
    payload: activeLink
  });
};
