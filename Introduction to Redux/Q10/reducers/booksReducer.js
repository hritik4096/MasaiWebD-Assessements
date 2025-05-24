import { ADD_BOOK, EDIT_BOOK, DELETE_BOOK, TOGGLE_READ_STATUS } from "../actions/bookActions";

const initialBooksState = [];

export default function booksReducer(state = initialBooksState, action) {
  switch (action.type) {
    case ADD_BOOK:
      return [...state, action.payload];

    case EDIT_BOOK:
      return state.map((book) =>
        book.id === action.payload.id ? { ...book, ...action.payload } : book
      );

    case DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload);

    case TOGGLE_READ_STATUS:
      return state.map((book) =>
        book.id === action.payload ? { ...book, read: !book.read } : book
      );

    default:
      return state;
  }
}
