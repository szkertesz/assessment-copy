import { useAppSelector } from '../../app/hooks'
import type { RootState } from '../../app/store'

export const booksSelector = (state: RootState) => {
    const filterStatus = state.books.filterOptions.status
    if (filterStatus) {
        return state.books.books.filter(
            book =>
                book.read ===
                Boolean(state.books.filterOptions.status === 'read')
        )
    }
    return state.books.books
}

export const useBooks = () => useAppSelector(booksSelector)
