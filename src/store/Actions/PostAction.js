import axios from "axios";
import { ACTION } from "../Api";
import { loadFeedData } from "./HomeFeedAction";

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