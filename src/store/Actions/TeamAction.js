import axios from 'axios';
import { teamActions } from '../Slices/TeamSlice';

import { CREATE_TEAM, LOAD_TEAMS, TEAM, EMAIL_INVITE_MEMBERS } from '../Api';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const getMyTeams = () => async (dispatch) => {
    try {
        const res = await axios.get(LOAD_TEAMS)
        dispatch(teamActions.currentTeam(res.data.body['current_team']));
        dispatch(teamActions.getMyTeam(res.data.body['my_teams']));
    } catch (err) {
        console.log(err);
        dispatch(teamActions.error());
    }
}

export const CreateNewTeam = (data) => async (dispatch) => {

    try {
        const res = await axios.post(CREATE_TEAM, data);
        dispatch(teamActions.currentTeam(res.data.body));
        dispatch(getMyTeams());
    } catch (err) {
        console.log(err.message);
        dispatch(teamActions.error());
    }
}

export const GetTeamUsersIncPending = (teamId) => async (dispatch) => {

    try {
        const res = await axios.get(`${TEAM}/${teamId}/users`);
        dispatch(teamActions.getTeamUsers(res.data.body));
    } catch (err) {
        console.log(err.message);
        dispatch(teamActions.error());
    }
}

export const updateTeamInfo = (teamId, formData) => async (dispatch) => {

    try {
        await axios.post(`${TEAM}/${teamId}/update`, formData);
        dispatch(getMyTeams());
    } catch (err) {
        console.log(err.message);
        dispatch(teamActions.error());
    }
}

export const inviteNewUserToTeam = (data) => async (dispatch) => {

    try {
        await axios.post(`${EMAIL_INVITE_MEMBERS}`, data);
        await dispatch(GetTeamUsersIncPending(data.team_id));
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
