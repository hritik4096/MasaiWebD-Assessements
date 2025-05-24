import { combineReducers } from "redux";
import booksReducer from "./booksReducer";
import filtersReducer from "./filtersReducer";

const rootReducer = combineReducers({
  books: booksReducer,
  filters: filtersReducer,
});

export default rootReducer;
