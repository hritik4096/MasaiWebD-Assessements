import { SET_AUTHOR_FILTER, SET_GENRE_FILTER, SET_STATUS_FILTER } from "../actions/filterActions";

const initialFiltersState = {
  author: "",
  genre: "",
  status: "", // "read", "unread", or ""
};

export default function filtersReducer(state = initialFiltersState, action) {
  switch (action.type) {
    case SET_AUTHOR_FILTER:
      return { ...state, author: action.payload };

    case SET_GENRE_FILTER:
      return { ...state, genre: action.payload };

    case SET_STATUS_FILTER:
      return { ...state, status: action.payload };

    default:
      return state;
  }
}
