import axios from 'axios';
import { authActions } from '../Slices/AuthSlice';
import { chatActions } from '../Slices/ChatSlice';
import { goalActions } from '../Slices/GoalSlice';
import { homeFeedActions } from '../Slices/HomeFeedSlice';
import { teamActions } from '../Slices/TeamSlice';
import { UiActions } from '../Slices/UI';
import { userActions } from '../Slices/UserSlice';
import SetAuth from '../../components/Util/SetAuth';

import { REGISTER_NEW, LOGIN, ACCOUNT_ME, LOGOUT, INVITATION } from '../Api';
import { getGmtTimezone } from '../../components/Util/Utils';
import { getMyTeams } from './TeamAction';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const Auth = () => {

    return async (dispatch) => {
        const token = localStorage.getItem('jwt_token');

        if (SetAuth(token)) {
            await axios.get(ACCOUNT_ME).then(async res => {
                await dispatch(authActions.login(res.data.body));
                await dispatch(getMyTeams());
            }).catch(error => {
                console.log(error.response.data);
                dispatch(authActions.authError());
            })
        }
        else {
            dispatch(authActions.authError());
        }
    }
}

export const Login = (data) => {

    return async (dispatch) => {

        await axios.post(LOGIN, data).then(res => {
            const token = res.data.body.token;

            if (SetAuth(token)) {
                dispatch(Auth());
            }
        }).catch(err => {
            console.log(err.response.data);
        })

    }
}

export const RegisterNewUser = (data) => async (dispatch) => {

    const timezoneGMT = getGmtTimezone();
    data = {
        user: {
            email: data.email,
            password: data.password,
            first_name: data.firstname,
            last_name: data.lastname,
            timezone: timezoneGMT
        }
    };

    try {
        await axios.post(REGISTER_NEW, data);
        dispatch(Login(data.user));
    } catch (err) {
        console.log(err);
    }
}

export const RegisterByInvitation = (token, data) => async (dispatch) => {

    const timezoneGMT = getGmtTimezone();
    const body = {
        email: data.email,
        password: data.password,
        first_name: data.firstname,
        last_name: data.lastname,
        timezone: timezoneGMT,
        user_exists: data.userExists,
        invitation: data.invitation
    };

    try {
        await axios.post(`${INVITATION}/${token}`, body);
        if (!data.userExists) {
            dispatch(Login(data));
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const Logout = () => async (dispatch) => {

    await axios.post(LOGOUT).then(res => {
        console.log(res.data);
        dispatch(authActions.logout());
        dispatch(chatActions.reset());
        dispatch(goalActions.reset());
        dispatch(homeFeedActions.reset());
        dispatch(teamActions.reset());
        dispatch(UiActions.reset());
        dispatch(userActions.reset());
        return true;
    }).catch(e => {
        console.log(e);
        return false;
    })
}