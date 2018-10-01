import axios from 'axios';
import {
	GET_APPOINT,
	GET_CITIES,
	GET_TOURNAMENTS,
	GET_SUB_TOURNAMENTS,
	GET_SUB_COMMANDS,
	GET_COMMANDS_INFO,
	GET_SUBTOUR_GAMES,
	GET_SUBTOUR_PLAYERS
} from './types';

export const getAppoints = () => (dispatch) => {
	axios
		.get('http://api.mygame4u.com/user/myasgmt', {
			headers: {
				Authorization: `G4User ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
		.then((res) => {
			dispatch({
				type: GET_APPOINT,
				payload: res.data.answer
			});
		});
};

export const getCities = () => (dispatch) => {
	axios
		.get('http://api.mygame4u.com/tournaments/listcities', {
			headers: {
				Authorization: `G4User ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
		.then((res) => {
			dispatch({
				type: GET_CITIES,
				payload: res.data.answer
			});
		});
};

export const getTournaments = (id) => (dispatch) => {
	axios
		.get(`http://api.mygame4u.com/tournaments/listtours/${id}`, {
			headers: {
				Authorization: `G4User ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
		.then((res) => {
			dispatch({
				type: GET_TOURNAMENTS,
				payload: res.data.answer
			});
		});
};

export const getSubTournaments = (id) => (dispatch) => {
	axios
		.get(`http://api.mygame4u.com/tournaments/listsubtours/${id}`, {
			headers: {
				Authorization: `G4User ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
		.then((res) => {
			dispatch({
				type: GET_SUB_TOURNAMENTS,
				payload: res.data.answer
			});
		});
};

export const getSubCommands = (id) => (dispatch) => {
	axios
		.get(`http://api.mygame4u.com/tournaments/listsubcomm/${id}`, {
			headers: {
				Authorization: `G4User ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
		.then((res) => {
			dispatch({
				type: GET_SUB_COMMANDS,
				payload: res.data.answer
			});
		});
};

export const getCommandsInfo = (id) => (dispatch) => {
	axios
		.get(`http://api.mygame4u.com/tournaments/comminfo?id=${id}`, {
			headers: {
				Authorization: `G4User ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
		.then((res) => {
			dispatch({
				type: GET_COMMANDS_INFO,
				payload: res.data.answer
			});
		});
};

export const getSubtourGames = (id) => (dispatch) => {
	axios
		.get(`http://api.mygame4u.com/tournaments/listgames/${id}`, {
			headers: {
				Authorization: `G4User ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
		.then((res) => {
			dispatch({
				type: GET_SUBTOUR_GAMES,
				payload: res.data.answer
			});
		});
};

export const getSubtourPlayers = (id) => (dispatch) => {
	axios
		.get(`http://api.mygame4u.com/tournaments/listplayers/${id}`, {
			headers: {
				Authorization: `G4User ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
		.then((res) => {
			dispatch({
				type: GET_SUBTOUR_PLAYERS,
				payload: res.data.answer
			});
		});
};
