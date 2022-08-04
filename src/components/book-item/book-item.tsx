import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { editBook } from "../../features/books/books-slice"
import StatusToggle from "../ui/container/status-toggle"
import { IBookItem } from "./book-item.interface"
import styles from './book-item.module.scss'

type IBookItemProps = {
    bookInfo: IBookItem
}

const BookItem: React.FC<IBookItemProps> = ({ bookInfo }) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = React.useState<string>(bookInfo.read ? 'read' : 'reading');
    const [requestStatus, setRequestStatus] = useState('idle');
    const {id, title, author, description} = bookInfo
    const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
            try {
                setRequestStatus('pending');
                await dispatch(
                    editBook({
                        id,
                        title,
                        author,
                        description,
                        reading:
                        event.target.value === 'reading' ? true : false,
                        read: event.target.value === 'read' ? true : false,
                    })
                ).unwrap();
            } catch (error) {
                alert(error);
            } finally {
                setRequestStatus('idle')
            }
    };
    return (
        <article className={styles['book-item']}>
            <h2 className={styles['book-item__title']}>{title}</h2>
            <div className={styles['book-item__actions']}>
                <Link to={`/edit/${id}`}>edit</Link>
                <StatusToggle stateValue={value} onChangeHandler={handleOnChange} idPrefix={id} />
            </div>
        </article>
    );
}

export default BookItem