import { AppDispatch, RootState } from "../..";
import { BookRequestOptions, BookResponseType } from "../../types/typeDefinitions";

export const SELECT_CHANNEL = 'SELECT_CHANNEL';
export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';

export const requestBooks = () => ({
    type: REQUEST_BOOKS
});

export const receivedBooks = (data: BookResponseType, options: BookRequestOptions) => ({
    type: RECEIVE_BOOKS,
    data,
    options
});

export function fetchBooks(options: BookRequestOptions) {
    return async function (dispatch: AppDispatch, getState: RootState) {
      dispatch(requestBooks());
      const { filters, itemsPerPage, page } = getState()
      const postOptions = {filters, itemsPerPage, page, ...options}
      try {
        const response = await fetch(`http://nyx.vima.ekt.gr:3000/api/books`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postOptions)
        });
        const data = await response.json();
        dispatch(receivedBooks(data, postOptions));
      } catch (error) {
        console.log('An error occurred.', error)
      }
    };
   }