import axios from 'axios';

import { homeFeedActions } from '../Slices/HomeFeedSlice';
import { LOAD_FEED } from '../Api';

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