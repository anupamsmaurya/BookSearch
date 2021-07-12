import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import bookReducer from "./reducers/bookReducer";

export const initialState = {
  booksList: [],
  totalCount: 0,
  page: 1,
  itemsPerPage: 20,
  filters: [],
  isLoading: false
}

function configureStore() {
  return createStore(bookReducer, initialState, applyMiddleware(thunk));
}

export default configureStore;