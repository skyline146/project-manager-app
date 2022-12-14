import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

interface IErrorPageProps {
    type?: string,
}

export const ErrorPage = ({type}:IErrorPageProps) => {
    // const error = useRouteError();
    // console.error(error);
    
    return (
        <div className={styles.rootWrapper}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                {type}
            </p>
            <Link to='/'>
                <p>Go Home</p>
            </Link>
        </div>
    )
}