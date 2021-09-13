import axios from 'axios';

import { homeFeedActions } from '../slices/HomeFeedSlice';
import { LOAD_FEED } from '../api';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const loadFeedData = () => {
    return async (dispatch) => {

        await axios.get(LOAD_FEED).then(res => {
            dispatch(homeFeedActions.loadActions(res.data.body));
        }).catch(err => {
            console.log(err);
        });

    }
}