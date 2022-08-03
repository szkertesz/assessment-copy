import { SetStateAction, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import styles from './new-book.module.scss'

const NewBook = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');

    const canSave =
        [title, author, description].every(Boolean) && addRequestStatus === 'idle';

    const handleOnTitleChanged = (e: {target: { value: SetStateAction<string> }}) => {
        setTitle(e.target.value);
    };
    const handleOnAuthorChanged = (e: {target: { value: SetStateAction<string> }}) => {
        setAuthor(e.target.value);
    };
    const handleOnDescriptionChanged = (e: {target: { value: SetStateAction<string> }}) => {
        setDescription(e.target.value);
    };
    const handleOnCancel = () => {
        setTitle('');
        setAuthor('');
        setDescription('');
        navigate('/books', {replace: true})
    }
    const handleOnSubmit = () => {
        console.log('submit')
    }
    return (
        <>
            <h1>Add new book</h1>
            <form action='' className='book-form'>
                <div className={styles['book-form__group']}>
                    <label htmlFor='bookTitle'>Title</label>
                    <input
                        type='text'
                        id='bookTitle'
                        name='bookTitle'
                        onChange={handleOnTitleChanged}
                    />
                </div>
                <div className={styles['book-form__group']}>
                    <label htmlFor='bookTitle'>Author</label>
                    <input
                        type='text'
                        id='bookAuthor'
                        name='bookAuthor'
                        onChange={handleOnAuthorChanged}
                    />
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
                        type='button'
                        onClick={handleOnSubmit}
                        id={'add-book-submit'}
                    >
                        Submit
                    </button>
                    <button type='button' onClick={handleOnCancel}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default NewBook