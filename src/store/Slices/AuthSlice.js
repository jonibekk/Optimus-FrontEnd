import { createSlice } from '@reduxjs/toolkit';

const initAuthState = {
    isAuthenticated: false,
    loading: true,
    meData: null
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: initAuthState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.loading = false;
            state.meData = action.payload;
        },
        logout(state) {
            localStorage.removeItem('jwt_token');
            state.isAuthenticated = false;
            state.loading = false;
            state.meData = null;
        },
        authError(state) {
            localStorage.removeItem('jwt_token');
            state.isAuthenticated = false;
            state.loading = false;
            state.meData = null;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;