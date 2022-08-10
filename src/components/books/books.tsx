import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { BooksState, fetchBooks } from '../../features/books/books-slice'
import { useEffect } from 'react'
import { IBookItem } from '../book-item/book-item.interface'
import BookItem from '../book-item'
import ActionBar from '../action-bar'
import { useBooks } from '../../features/books/books.hook'
import styles from './books.module.scss'

function Books(): JSX.Element {
    const dispatch = useAppDispatch()
    const booksStatus = useAppSelector(state => state.books.status)
    const booksError = useAppSelector(state => state.books.error)
    // const books = useAppSelector((state) => state.books.books);
    const books = useBooks()

    useEffect(() => {
        if (booksStatus === 'idle') {
            dispatch(fetchBooks())
        }
    }, [booksStatus, dispatch])

    return (
        <>
            <header>
                <h1>Reading List</h1>
                <ActionBar
                    loadingState={booksStatus === 'loading' ? true : false}
                />
            </header>
            <main>
                {booksStatus === 'succeeded' && (
                    <ul className={styles['books__list']}>
                        {books.map((book: IBookItem) => (
                            <li key={book.id}>
                                <BookItem bookInfo={book} />
                            </li>
                        ))}
                    </ul>
                )}

                {booksError && <span>{booksError}</span>}
            </main>
        </>
    )
}

export default Books
