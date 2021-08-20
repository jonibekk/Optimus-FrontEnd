import axios from 'axios';

import { goalActions } from '../Slices/GoalSlice';
import {
    GET_GOALS,
    GOALS,
    KR,
    ACTION
} from '../Api';
import { loadFeedData } from './HomeFeedAction';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

export const getAllGoals = (teamId, userId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(GET_GOALS + `/${teamId}/goals`);
            const goals = res.data.body;
            const myGoals = goals.filter(goal => goal.user_id === userId);
            const subsGoals = goals.filter(goal => goal.user_id !== userId && goal.member.filter(user => user.id === userId).length > 0);

            await dispatch(goalActions.getMyGoals(myGoals));
            await dispatch(goalActions.getMyGoalsIncSubs(subsGoals));
            await dispatch(goalActions.getAllGoals(goals));
        } catch (err) {
            dispatch(goalActions.error());
            console.log(err);
        }
    }
}

export const getCurrentGoalWithData = (goalId) => {
    return async (dispatch) => {
        await axios.get(GOALS + `/${goalId}/with-kr-actions`)
            .then(res => {
                dispatch(goalActions.getCurrentGoalData(res.data.body[0]));
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(goalActions.error());
            });
    }
}

export const createGoal = (teamId, userId, data) => async (dispatch) => {
    try {
        const res = await axios.post(`${GOALS}/create`, data);
        dispatch(getAllGoals(teamId, userId))
        console.log(res.data);
    } catch (err) {
        console.log(err.response.data);
    }
}

export const createKr = (goalId, data) => async (dispatch) => {
    try {
        const res = await axios.post(`${KR}/goal/${goalId}/create`, data);
        console.log(res.data);
        dispatch(getCurrentGoalWithData(goalId));
    } catch (err) {
        console.log(err.response.data);
    }
}

export const createAction = (goalId, krId, data) => async (dispatch) => {
    try {
        const res = await axios.post(`${ACTION}/goal/${goalId}/kr/${krId}/create`, data);
        console.log(res.data);
        dispatch(loadFeedData());
    } catch (err) {
        console.log(err.response.data);
    }
}