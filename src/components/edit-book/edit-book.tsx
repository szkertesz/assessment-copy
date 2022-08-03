import { SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../new-book/new-book.module.scss';
import { editBook, selectBookById } from '../../features/books/books-slice';
import type { RootState } from '../../app/store'
import { IBookItem } from '../book-item/book-item.interface';

const EditBook = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { bookId } = useParams()
    const bookToEdit = useAppSelector(state => selectBookById(state, Number(bookId))) as IBookItem;
    console.log(bookToEdit)

    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const [addRequestError, setAddRequestError] = useState('');
    const [formValidity, setFormValidity] = useState(false);
    const [title, setTitle] = useState(bookToEdit.title);
    const [author, setAuthor] = useState(bookToEdit.author);
    const [description, setDescription] = useState(bookToEdit.description);
    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);

    const canSave =
        formValidity && addRequestStatus === 'idle';

    const checkValidity = () => {
        setFormValidity([title, author].every(Boolean) ? true : false);
    };

    const handleOnTitleChanged = (e: {
        target: { value: SetStateAction<string> };
    }) => {
        setTitle(e.target.value);
    };
    const handleOnAuthorChanged = (e: {
        target: { value: SetStateAction<string> };
    }) => {
        setAuthor(e.target.value);
    };
    const handleOnDescriptionChanged = (e: {
        target: { value: SetStateAction<string> };
    }) => {
        setDescription(e.target.value);
    };
    const handleOnTitleBlur = (e: { target: { value: string } }) => {
        setTitleError(e.target.value ? false : true);
        checkValidity();
    };
    const handleOnAuthorBlur = (e: { target: { value: string } }) => {
        setAuthorError(e.target.value ? false : true);
        checkValidity();
    };
    const handleOnDescriptionBLur = (e: { target: { value: string } }) => {
        checkValidity();
    };
    const handleOnCancel = () => {
        setTitle('');
        setAuthor('');
        setDescription('');
        navigate('/books', { replace: true });
    };
    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                await dispatch(
                    editBook({
                        id: Number(bookId),
                        title,
                        author,
                        description,
                        reading: false,
                        read: false,
                    })
                );
                navigate('/books', { replace: true });
            } catch (error) {
                setAddRequestError(`Failed to add new book: ${error}`);
            } finally {
                setAddRequestStatus('idle');
            }
        } else {
        }
    };
    return (
        <>
            <h1>Add new book</h1>
            <form action='' className='book-form'>
                <div className={styles['book-form__group']}>
                    <label htmlFor='bookTitle'>Title*</label>
                    <input
                        type='text'
                        id='bookTitle'
                        name='bookTitle'
                        value={title}
                        onChange={handleOnTitleChanged}
                        onBlur={handleOnTitleBlur}
                        className={`
                            ${styles['book-form__input']}
                            ${
                                titleError
                                    ? styles['book-form__input--error']
                                    : !titleError && title
                                    ? styles['book-form__input--valid']
                                    : ``
                            }`}
                        required
                    />
                    {titleError && <p role='alert'>Title is required</p>}
                </div>
                <div className={styles['book-form__group']}>
                    <label htmlFor='bookAuthor'>Author*</label>
                    <input
                        type='text'
                        id='bookAuthor'
                        name='bookAuthor'
                        value={author}
                        onChange={handleOnAuthorChanged}
                        onBlur={handleOnAuthorBlur}
                        className={`
                            ${styles['book-form__input']}
                            ${
                                authorError
                                    ? styles['book-form__input--error']
                                    : !authorError && author
                                    ? styles['book-form__input--valid']
                                    : ``
                            }`}
                        required
                    />
                    {authorError && <p role='alert'>Author is required</p>}
                </div>
                <div className={styles['book-form__group']}>
                    <label htmlFor='bookDescription'>Description</label>
                    <textarea
                        id='bookDescription'
                        name='bookDescription'
                        value={description}
                        rows={3}
                        onChange={handleOnDescriptionChanged}
                        onBlur={handleOnDescriptionBLur}
                    ></textarea>
                </div>
                <div className={styles['book-form__actions']}>
                    <button
                        type='submit'
                        onClick={handleOnSubmit}
                        id={'add-book-submit'}
                        disabled={!formValidity}
                    >
                        Submit
                    </button>
                    <button type='button' onClick={handleOnCancel}>
                        Cancel
                    </button>
                </div>
            </form>
            <div>
                {addRequestStatus === 'pending' && <p>Loading...</p>}
                {addRequestError && <p>{addRequestError}</p>}
            </div>
        </>
    );
};

export default EditBook;


