import { createSlice } from '@reduxjs/toolkit';

const initUserState = {
    loading: true,
    chatRooms: null,
    currentRoom: null,
    messages: null
}

const chatSlice = createSlice({
    name: 'chat',
    initialState: initUserState,
    reducers: {
        getChatRooms(state, action) {
            state.loading = false;
            state.chatRooms = action.payload;
        },
        setChatRoom(state, action) {
            state.loading = false;
            state.currentRoom = action.payload;
        },
        getMessages(state, action) {
            state.loading = false;
            state.messages = action.payload
        },
        reset(state, action) {
            state.loading = true;
            state.chatRooms = null;
            state.currentRoom = null;
            state.messages = null;
        }
    }
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;