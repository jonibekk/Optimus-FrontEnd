import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterNewUser } from '../../store/Actions/AuthAction';
import { validEmail, validPassword } from '../../components/Util/Utils';
import UnauthHeader from '../../components/UI/UnauthHeader';
import FormInput from '../../components/UI/FormInput';


const SignUp = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });
    const [validation, setValidation] = useState({
        email: false,
        password: false,
    });

    const onInputChange = (name, value) => {
        if (name === 'email') {
            console.log(validEmail(value));
            setValidation({ ...validation, [name]: validEmail(value) });
        }
        if (name === 'password') {
            setValidation({ ...validation, [name]: validPassword(value) });
        }
        setData({ ...data, [name]: value });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (validation.email && validation.password && data.password === data.passwordConfirm) {
            dispatch(RegisterNewUser(data));
        } else {
            console.log('error');
        }
    }

    return auth.isAuthenticated ? <Redirect to='/' /> : (
        <div className='signup-container'>
            <UnauthHeader />
            <div className='signup-wrapper'>
                <form className='signup-form' onSubmit={onFormSubmit}>
                    <h1>Sign Up</h1>

                    <div className='signup-fullname'>
                        <div>
                            <span className='input-label'>First name</span>
                            <FormInput name='firstname' type='text' placeholder='First Name' onchange={onInputChange} value={data.firstname} required={true} />
                        </div>
                        <div>
                            <span className='input-label'>Last name</span>
                            <FormInput name='lastname' type='text' placeholder='Last Name' onchange={onInputChange} value={data.lastname} required={true} />
                        </div>
                    </div>

                    <div className='vertical-space-15'></div>

                    <span className='input-label'>Email address</span>
                    <FormInput name='email' type='email' placeholder='Email' onchange={onInputChange}
                        value={data.email} required={true} error={!validation.email && data.email.length > 0} />

                    <div className='vertical-space-15'></div>

                    <span className='input-label'>Password</span>
                    <FormInput name='password' type='password' placeholder='Password' onchange={onInputChange}
                        value={data.password} required={true} error={!validation.password && data.password.length > 0} />

                    <div className='vertical-space-15'></div>

                    <span className='input-label'>Confirm password</span>
                    <FormInput name='passwordConfirm' type='password' placeholder='Confirm Password' onchange={onInputChange}
                        value={data.passwordConfirm} required={true} error={data.password !== data.passwordConfirm} />

                    <div className='vertical-space-10'></div>
                    <div className='signup-btn'>
                        <Button className='btn__primary' maxWidth='100%' maxHeight='40px' text='Sign Up' fontSize='1.1em' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
