import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from ".."

export interface BookType {
    book_author: string[],
    book_pages: number,
    book_publication_city: string,
    book_publication_country: string,
    book_publication_year: number,
    book_title: string,
    id: number
}

export interface BookResponseType {
    books: BookType[],
    count: number
}

export interface FilterType {
    type: string,
    values: string[]
}

export interface BookRequestOptions {
    page?: number,
    itemsPerPage? : number,
    filters? : FilterType[]
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector