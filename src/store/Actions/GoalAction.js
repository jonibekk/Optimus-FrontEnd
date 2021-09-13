import axios from 'axios';

import { goalActions } from '../slices/GoalSlice';
import {
    GET_GOALS,
    GOALS,
    KR,
    ACTION
} from '../api';
import { loadFeedData } from './HomeFeedAction';
import { loadActivityHeatmap } from './UiAction';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

export const getAllGoals = (teamId, userId) => async (dispatch) => {
    try {
        const res = await axios.get(GET_GOALS + `/${teamId}/goals`);
        const goals = res.data.body;
        const myGoals = goals.filter(goal => goal.user_id === userId);
        const subsGoals = goals.filter(goal => goal.user_id !== userId && goal.member.filter(user => user.id === userId).length > 0);

        await dispatch(goalActions.getMyGoals(myGoals));
        await dispatch(goalActions.getMySubGoals(subsGoals));
        await dispatch(goalActions.getAllGoals(goals));
    } catch (err) {
        console.log(err.response.message);
        dispatch(goalActions.error());
    }
}

export const getCurrentGoalWithData = (goalId) => async (dispatch) => {
    try {
        const res = await axios.get(GOALS + `/${goalId}/details`);
        dispatch(goalActions.getCurrentGoalData(res.data.body[0]));
    } catch (err) {
        console.log(err.response.data);
        await dispatch(goalActions.error());
    }
}

export const createGoal = (teamId, userId, data) => async (dispatch) => {
    try {
        await axios.post(`${GOALS}/create`, data);
        await dispatch(getAllGoals(teamId, userId))
    } catch (err) {
        console.log(err.response.data);
    }
}

export const createKr = (goalId, data) => async (dispatch) => {
    try {
        await axios.post(`${KR}/goal/${goalId}/create`, data);
        dispatch(getCurrentGoalWithData(goalId));
    } catch (err) {
        console.log(err.response.data);
    }
}

export const createAction = (goalId, krId, data) => async (dispatch) => {
    try {
        await axios.post(`${ACTION}/goal/${goalId}/kr/${krId}/create`, data);
        await dispatch(loadFeedData());
        await dispatch(loadActivityHeatmap())
    } catch (err) {
        console.log(err.response.data);
    }
}

export const subscribeToGoalAction = (userId, teamId, goalId) => async dispatch => {
    try {
        await axios.post(`${GOALS}/${goalId}/subscribe`, { userId: userId, teamId: teamId });
        await dispatch(getAllGoals(teamId, userId));
    } catch (err) {
        console.log(err.response.data);
    }
}