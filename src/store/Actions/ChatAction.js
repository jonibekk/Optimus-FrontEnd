import axios from 'axios';
import { chatActions } from '../Slices/ChatSlice';

import { CHAT } from '../Api';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const getChatRooms = () => async (dispatch) => {
    try {
        const res = await axios.get(`${CHAT}/rooms`);
        await dispatch(chatActions.getChatRooms(res.data.body));
    } catch (err) {
        console.log(err);
        // await dispatch(userActions.error());
    }
}

export const getChatMessages = (roomId) => async (dispatch) => {
    try {
        const res = await axios.get(`${CHAT}/room/${roomId}/messages`);
        await dispatch(chatActions.getMessages(res.data.body));
    } catch (err) {
        console.log(err);
        // await dispatch(userActions.error());
    }
}

export const setChatRoom = (room) => async (dispatch) => {
    try {
        await dispatch(chatActions.setChatRoom(room));
        await dispatch(getChatMessages(room.id));
    } catch (err) {
        console.log(err);
        // await dispatch(userActions.error());
    }
}
