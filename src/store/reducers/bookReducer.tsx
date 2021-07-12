import { RECEIVE_BOOKS, REQUEST_BOOKS } from "../actions";
import { initialState } from "../store";

const BookReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
      case REQUEST_BOOKS:
          return {
              ...state,
              isLoading: true
          }
      case RECEIVE_BOOKS:
        return {
            ...state,
          booksList: action.data.books,
          totalCount: action.data.count,
          page: action.options.page,
          itemsPerPage: action.options.itemsPerPage,
          filters: action.options.filters,
          isLoading: false
        };
      default:
        return state;
    }
  };

  export default BookReducer;