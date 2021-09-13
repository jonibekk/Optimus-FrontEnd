import axios from 'axios';
import { UiActions } from '../slices/UI';

import { LOAD_FEED_WIDGETS } from '../api';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const actionCreateTrigger = (flag) => {
    return async (dispatch) => {
        await dispatch(UiActions.actionCreate(flag));
    }
}

export const loadActivityHeatmap = () => async (dispatch) => {
    try {
        const res = await axios.get(LOAD_FEED_WIDGETS);
        dispatch(UiActions.loadActivityGraph(res.data.body['heatmap']));
        dispatch(UiActions.loadActionsWidget(res.data.body['actions']));
        dispatch(UiActions.loadGoalsWidget(res.data.body['goals']));
    } catch (err) {
        console.log(err);
    }
}