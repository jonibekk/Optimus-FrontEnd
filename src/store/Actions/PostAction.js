import axios from "axios";
import { UiActions } from '../Slices/UI';
import { loadFeedData } from "./HomeFeedAction";
import { ACTION } from "../Api";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const postLike = (postId, status, likeId) => async (dispatch) => {

    try {
        await axios.post(`${ACTION}/${postId}/like`, { status: status, like_id: likeId });
        dispatch(loadFeedData());
    } catch (err) {
        console.log(err.response.data);
        return false;
    }

    return true;
}

export const postDetails = (postId) => async (dispatch) => {

    try {
        const res = await axios.get(`${ACTION}/${postId}/details`);
        dispatch(UiActions.loadPostDetails(res.data.body))
    } catch (err) {
        console.log(err.response.data);
    }
}

export const cleanPostDetails = () => async (dispatch) => {
    await dispatch(UiActions.cleanPostDetails());
}