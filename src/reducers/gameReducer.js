import {
	GET_CURRENT_GAME,
	GET_CURRENT_GAMES_LIST,
	GET_FUTURE_GAMES_LIST,
	GET_GAME_INFO,
	GET_EVENT_SETTINGS
} from '../actions/types';

const initialState = {
	currentGame: null,
	currentGamesList: null,
	futureGamesList: null,
	gameInfo: null,
	settings: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_CURRENT_GAME:
			return {
				...state,
				currentGame: action.payload
			};
		case GET_CURRENT_GAMES_LIST:
			return {
				...state,
				currentGamesList: action.payload
			};
		case GET_FUTURE_GAMES_LIST:
			return {
				...state,
				futureGamesList: action.payload
			};
		case GET_EVENT_SETTINGS:
			return {
				...state,
				settings: action.payload
			};
		case GET_GAME_INFO:
			return {
				...state,
				gameInfo: action.payload
			};
		default:
			return state;
	}
}
