import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setStatusFilter } from '../../features/books/books-slice';
import styles from './status-filter.module.scss'

function StatusFilter() {
    const dispatch = useAppDispatch();
    const [value, setValue] = React.useState<string>('');
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    useEffect(() => {
        dispatch(setStatusFilter(value as string));
    }, [value, dispatch]);
    return (
        <fieldset className={styles['status-filter']}>
            <legend className='visually-hidden'>Filters:</legend>
            <div className={styles['status-filter__group']}>
                <input
                    type='radio'
                    name='status'
                    id='radio-reading'
                    value='reading'
                    checked={value === 'reading'}
                    onChange={handleOnChange}
                />
                <label htmlFor='radio-reading'>Reading</label>
            </div>
            <div className={styles['status-filter__group']}>
                <input
                    type='radio'
                    name='status'
                    id='radio-read'
                    value='read'
                    checked={value === 'read'}
                    onChange={handleOnChange}
                />
                <label htmlFor='radio-read'>Read</label>
            </div>
        </fieldset>
    );
}

export default StatusFilter;
