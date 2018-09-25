import {
	GET_APPOINT,
	GET_CITIES,
	GET_TOURNAMENTS,
	GET_SUB_TOURNAMENTS,
	GET_SUB_COMMANDS,
	GET_COMMANDS_INFO,
	GET_SUBTOUR_GAMES
} from '../actions/types';

const initialState = {
	matches: null,
	location: null,
	tournaments: null,
	subTournaments: null,
	subCommands: null,
	commands: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_APPOINT:
			return {
				...state,
				matches: action.payload
			};
		case GET_CITIES:
			return {
				...state,
				location: action.payload
			};
		case GET_TOURNAMENTS:
			return {
				...state,
				tournaments: action.payload
			};
		case GET_SUB_TOURNAMENTS:
			return {
				...state,
				subTournaments: action.payload
			};
		case GET_SUB_COMMANDS:
			return {
				...state,
				subCommands: action.payload
			};
		case GET_COMMANDS_INFO:
			return {
				...state,
				commands: action.payload
			};
		case GET_SUBTOUR_GAMES:
			return {
				...state,
				matches: action.payload
			};
		default:
			return state;
	}
}
