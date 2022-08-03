import { IBookItem } from "./book-item.interface"

type IBookItemProps = {
    bookInfo: IBookItem
}

const BookItem: React.FC<IBookItemProps> = ({ bookInfo }) => {
    const {title} = bookInfo
    return (
        <article>
            <h2>{title}</h2>
        </article>
    )
}

export default BookItem