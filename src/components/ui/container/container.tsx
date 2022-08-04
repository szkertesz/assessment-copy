import { IContainer } from './container.interface'
import { Outlet } from 'react-router-dom';
import styles from './container.module.scss';

function Container(props: IContainer) {
    return (
        <div className={styles.container} data-testid='container'>
            <Outlet />
            {props.children}
        </div>
    );
}

export default Container;
