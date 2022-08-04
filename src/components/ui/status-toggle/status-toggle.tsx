import styles from './status-toggle.module.scss'

interface IStatusToggleProps {
    stateValue: string;
    onChangeHandler: React.FormEventHandler<HTMLInputElement>;
    idPrefix?: number;
    legend?: string
}

const StatusToggle: React.FC<IStatusToggleProps> = ({stateValue, onChangeHandler, idPrefix = '', legend = '' }) => {
    return (
        <fieldset className={styles['status-toggle']}>
            {legend && <legend>{legend}</legend>}
            <div className={styles['status-toggle__group']}>
                <input
                    type='radio'
                    name={`status-${idPrefix}`}
                    id={`${idPrefix}radio-reading`}
                    value='reading'
                    checked={stateValue === 'reading'}
                    onChange={onChangeHandler}
                    className='visually-hidden'
                />
                <label
                    htmlFor={`${idPrefix}radio-reading`}
                    className={`${styles['status-toggle__label']} button`}
                >
                    Reading
                </label>
            </div>
            <div className={styles['status-toggle__group']}>
                <input
                    type='radio'
                    name={`status-${idPrefix}`}
                    id={`${idPrefix}radio-read`}
                    value='read'
                    checked={stateValue === 'read'}
                    onChange={onChangeHandler}
                    className='visually-hidden'
                />
                <label
                    htmlFor={`${idPrefix}radio-read`}
                    className={`${styles['status-toggle__label']} button`}
                >
                    Read
                </label>
            </div>
        </fieldset>
    );
}

export default StatusToggle