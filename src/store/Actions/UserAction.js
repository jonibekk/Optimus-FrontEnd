import axios from 'axios';
import { userActions } from '../slices/UserSlice';

import { USER } from '../api';
import { Auth } from './AuthAction';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const getAllUsers = (teamId) => async (dispatch) => {
    try {
        const res = await axios.get(`${USER}/team/${teamId}/all-users`);
        await dispatch(userActions.getAllUsers(res.data.body));
    } catch (err) {
        console.log(err);
        await dispatch(userActions.error());
    }
}

export const updateMeProfile = (userId, data) => async (dispatch) => {

    try {
        const res = await axios.post(`${USER}/${userId}/update`, data);
        console.log(res.data);
        await dispatch(Auth());
    } catch (err) {
        console.log(err);
        // await dispatch(userActions.error());
    }

}