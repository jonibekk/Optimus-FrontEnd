import axios from 'axios';
import { authActions } from '../slices/AuthSlice';
import { chatActions } from '../slices/ChatSlice';
import { goalActions } from '../slices/GoalSlice';
import { homeFeedActions } from '../slices/HomeFeedSlice';
import { teamActions } from '../slices/TeamSlice';
import { UiActions } from '../slices/UI';
import { userActions } from '../slices/UserSlice';
import SetAuth from '../../components/Util/SetAuth';

import { REGISTER_NEW, LOGIN, ACCOUNT_ME, LOGOUT, INVITATION } from '../api';
import { getGmtTimezone } from '../../components/Util/Utils';
import { getMyTeams } from './TeamAction';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const Auth = () => {

    return async (dispatch) => {
        const token = localStorage.getItem('jwt_token');

        if (SetAuth(token)) {
            try {
                const res = await axios.get(ACCOUNT_ME);
                await dispatch(authActions.login(res.data.body));
                await dispatch(getMyTeams());
            } catch (err) {
                console.log(err.response.data);
                dispatch(authActions.authError());
            }
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