import { useEffect, useState } from 'react';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';

import UnauthHeader from '../../components/UI/UnauthHeader';
import FormInput from '../../components/UI/FormInput';
import Button from '../../components/UI/Button';
import Avatar from '../../components/UI/Avatar';
import { RegisterByInvitation } from '../../store/Actions/AuthAction';
import { validPassword } from '../../components/Util/Utils';

import './style.css';

import { INVITATION } from '../../store/Api';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const Invitation = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        password: '',
        passwordConfirm: '',
    });
    const [validation, setValidation] = useState({
        password: false,
    });
    const [invitation, setInvitation] = useState({
        data: null,
        invitationLoaded: false
    });

    const onInputChange = (name, value) => {
        if (name === 'password') {
            setValidation({ ...validation, [name]: validPassword(value) });
        }
        setData({ ...data, [name]: value });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (validation.password && data.password === data.passwordConfirm) {
            const body = {
                ...data,
                email: invitation.data.invitation.email,
                invitation: invitation.data.invitation,
                userExists: invitation.data.userExists
            }
            dispatch(RegisterByInvitation(params.token, body))
                .then(res => {
                    if (res === false) {
                        return history.push('/login');
                    }
                }).catch(err => {
                    return history.push('/login');
                })
        } else {
            // Error Log
            console.log('error');
        }
    }

    const getInvitation = async (token) => {
        await axios.get(`${INVITATION}/${token}`).then(res => {
            setInvitation({ data: res.data.body, invitationLoaded: true });
        }).catch(err => {
            setInvitation({ data: null, invitationLoaded: true });
        });
    }

    useEffect(() => {
        getInvitation(params.token);
    }, [dispatch, params]);

    return (invitation.data === null && invitation.invitationLoaded === true) ? <Redirect to='/login' /> : (
        <div className='invitation-container'>
            <UnauthHeader invitation />
            <div className='invitation-wrapper'>
                <form className='invitation-form' onSubmit={onFormSubmit}>
                    <div className='invitation-team'>
                        <div width='70px'>
                            <Avatar width='70px' height='70px' src={invitation.data && invitation.data.team.logo_url} borderRadius='99px' />
                        </div>
                        <span>{invitation.data && invitation.data.team.name}</span>
                    </div>
                    <span className='invitation-from-text'>Invitation from </span>
                    <div className='invitation-from-user'>
                        <div width='30px'>
                            <Avatar width='30px' height='30px' src={invitation.data && invitation.data.user.avatar_url} borderRadius='99px' />
                        </div>
                        <span>{invitation.data && (invitation.data.user.first_name + ' ' + invitation.data.user.last_name)}</span>
                    </div>

                    {(invitation.data && !invitation.data.userExists) &&
                        <div>
                            <div className='invitation-fullname'>
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

                            <span className='input-label'>Password</span>
                            <FormInput name='password' type='password' placeholder='Password' onchange={onInputChange}
                                value={data.password} required={true} error={!validation.password && data.password.length > 0} />

                            <div className='vertical-space-15'></div>

                            <span className='input-label'>Confirm password</span>
                            <FormInput name='passwordConfirm' type='password' placeholder='Confirm Password' onchange={onInputChange}
                                value={data.passwordConfirm} required={true} error={data.password !== data.passwordConfirm} />

                            <div className='vertical-space-10'></div>
                        </div>
                    }
                    <div className='invitation-btn'>
                        <Button className='btn__primary' maxWidth='100%' maxHeight='40px' text='Join to this team' fontSize='1.1em' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default connect(null, [])(Invitation);
