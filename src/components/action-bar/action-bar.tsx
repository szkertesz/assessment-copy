import React from 'react'
import { Link } from 'react-router-dom'
import styles from './action-bar.module.scss'
import StatusFilter from 'components/status-filter'

type ActionBarProps = {
    loadingState: boolean
}
const ActionBar: React.FC<ActionBarProps> = ({ loadingState }) => {
    return (
        <section className={styles['action-bar']}>
            <Link
                to="/books/new"
                className={`${styles['action-bar__button']} button`}
            >
                New
            </Link>
            <div>{loadingState ? 'loading...' : ''}</div>
            <StatusFilter />
        </section>
    )
}

export default ActionBar
