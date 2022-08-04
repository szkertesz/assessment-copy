import { SetStateAction, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import styles from './new-book.module.scss';
import { addBook } from '../../features/books/books-slice';

const NewBook = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const [addRequestError, setAddRequestError] = useState('');
    const [formValidity, setFormValidity] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [description, setDescription] = useState('');

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
                    addBook({
                        title,
                        author,
                        description,
                        reading: false,
                        read: false,
                    })
                );
                setTitle('');
                setAuthor('');
                setDescription('');
                navigate('/', { replace: true });
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
            <form action='' className={styles['book-form']}>
                <div className={styles['book-form__group']}>
                    <label htmlFor='bookTitle'>Title*</label>
                    <input
                        type='text'
                        id='bookTitle'
                        name='bookTitle'
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
                        rows={3}
                        onChange={handleOnDescriptionChanged}
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

export default NewBook;
