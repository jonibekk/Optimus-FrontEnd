import { createSlice } from '@reduxjs/toolkit';

const initUserState = {
    loading: true,
    users: null
}

const userSlice = createSlice({
    name: 'authentication',
    initialState: initUserState,
    reducers: {
        getAllUsers(state, action) {
            state.loading = false;
            state.users = action.payload;
        },
        userError(state) {
            state.loading = false;
        },
        reset(state, action) {
            state.loading = true;
            state.users = null;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;