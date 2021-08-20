import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import UnauthHeader from '../../components/UI/UnauthHeader';
import './style.css'

const Landing = () => {

    const auth = useSelector(state => state.auth);

    return auth.loading ? <h1>Loading...</h1> : auth.isAuthenticated
        ? <Redirect to='/home' />
        : (
            <div className='landing-container'>
                <UnauthHeader />
                Welcome, peace of shit!
            </div>
        )
}

export default Landing
