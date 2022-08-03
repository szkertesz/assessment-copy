import { Link } from "react-router-dom"
import { IBookItem } from "./book-item.interface"
import styles from './book-item.module.scss'

type IBookItemProps = {
    bookInfo: IBookItem
}

const BookItem: React.FC<IBookItemProps> = ({ bookInfo }) => {
    const {id, title} = bookInfo
    return (
        <article className={styles['book-item']}>
            <h2 className={styles['book-item__title']}>{title}</h2>
            <div className={styles['book-item__actions']}>
                <Link to={`edit/${id}`} />
            </div>
        </article>
    );
}

export default BookItem