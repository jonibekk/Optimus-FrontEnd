import './style.css'

import notFoundSvg from '../../assets/404.svg';
import { Fragment } from 'react';
import Header from '../../components/UI/AuthHeader';
import { useSelector } from 'react-redux';
import Button from '../../components/UI/Button';
import { Link } from 'react-router-dom';

function NotFound() {

    const auth = useSelector(state => state.auth);

    return (
        <Fragment>
            {auth.isAuthenticated && <Header logo />}
            <div className='page-not-found'>
                <img alt='not-found' src={notFoundSvg} />
                <h1>Page not found!</h1>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <Button text='Go to Home' className='btn__primary' maxWidth='300px' />
                </Link>
            </div>
        </Fragment>
    )
}

export default NotFound;
