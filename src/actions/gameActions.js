import axios from 'axios';
import { GET_CURRENT_GAME, GET_GAME_INFO, GET_EVENT_SETTINGS, GET_ERRORS, GET_MESSAGES } from '../actions/types';

export const addGameEvent = (id, eventData) => (dispatch) => {
	axios
		.post(`http://api.mygame4u.com/game/addevent/${id}`, eventData, {
			headers: {
				Authorization: `G4User ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
		.then((res) => {
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

export const getCurrentGame = (id) => (dispatch) => {
	axios
		.get(`http://api.mygame4u.com/game/id/${id}`, {
			headers: {
				Authorization: `G4User ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
		.then((res) => {
			dispatch({
				type: GET_CURRENT_GAME,
				payload: res.data.answer
			});
		});
};

export const getGameInfo = (id) => (dispatch) => {
	axios
		.get(`http://api.mygame4u.com/game/info/${id}`, {
			headers: {
				Authorization: `G4User ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
		.then((res) => {
			dispatch({
				type: GET_GAME_INFO,
				payload: res.data.answer
			});
		});
};

export const getEventSettings = (id) => (dispatch) => {
	axios
		.get(`http://api.mygame4u.com/game/event/${id}`, {
			headers: {
				Authorization: `G4User ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
		.then((res) => {
			dispatch({
				type: GET_EVENT_SETTINGS,
				payload: res.data.answer
			});
		});
};

export const deleteEvent = (id) => (dispatch) => {
	axios
		.get(`http://api.mygame4u.com/game/delevent/${id}`, {
			headers: {
				Authorization: `G4User ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
		.then((res) => {
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
