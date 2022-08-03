import { useAppSelector } from "../../app/hooks";
import { IBookItem } from "../../components/book-item/book-item.interface";
import type { RootState } from '../../app/store';

export const booksSelector = (state: RootState) => {
    const filterStatus = state.books.filterOptions.status
    if (filterStatus) {
        return state.books.books.filter((book) => {
            return book.reading === Boolean(state.books.filterOptions.status === 'reading')
        })
    }
    return state.books.books;
}

export const useBooks = () => useAppSelector(booksSelector)