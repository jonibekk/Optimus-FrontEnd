import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../../store/Actions/AuthAction';
import UnauthHeader from '../../components/UI/UnauthHeader';
import FormInput from '../../components/UI/FormInput';


const SignIn = (props) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [data, setData] = useState({ email: '', password: '' });

    const onInputChange = (name, value) => {
        setData({ ...data, [name]: value });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(Login(data));
    }

    const prevPath = props.location && props.location.state ? props.location.state.fromPath : '/home';

    console.log(prevPath);

    return auth.loading ? <div>Loading...</div> : (
        auth.isAuthenticated ? <Redirect to={prevPath} /> : (
            <div className='signin-container'>
                <UnauthHeader />
                <div className='signin-wrapper'>
                    <form className='signin-form' onSubmit={onFormSubmit}>
                        <h1>Sign In</h1>

                        <span className='input-label'>Email address</span>
                        <FormInput name='email' type='email' placeholder='Email' onchange={onInputChange} value={data.email} required={true} />

                        <div className='vertical-space-15'></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className='input-label'>Password</span>
                            <Link to='/forgot-password'>Forgot password?</Link>
                        </div>
                        <FormInput name='password' type='password' placeholder='Password' onchange={onInputChange} value={data.password} required={true} />

                        <div className='vertical-space-10'></div>
                        <div className='signin-btn'>
                            <Button className='btn__primary' maxWidth='100%' maxHeight='40px' text='Sign In' fontSize='1.1em' />
                        </div>
                    </form>
                </div>
            </div>
        )
    )
}

export default SignIn;
