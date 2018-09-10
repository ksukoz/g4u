import { GET_ERRORS, GET_NEWS, GET_NEWS_ITEM } from "../actions/types";

const initialState = {
  errors: null,
  news: null,
  newsItem: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case GET_NEWS:
      return {
        ...state,
        news: action.payload
      };
    case GET_NEWS_ITEM:
      return {
        ...state,
        newsItem: action.payload
      };
    default:
      return state;
  }
}
