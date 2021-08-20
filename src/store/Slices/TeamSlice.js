import { createSlice } from '@reduxjs/toolkit';

const initTeamState = {
    loading: true,
    currentTeam: null,
    myTeams: null,
    currentTeamUsers: null
}

const teamSlice = createSlice({
    name: 'team',
    initialState: initTeamState,
    reducers: {
        currentTeam(state, action) {
            state.loading = false;
            state.currentTeam = action.payload;
        },
        getMyTeam(state, action) {
            state.loading = false;
            state.myTeams = action.payload;
        },
        getTeamUsers(state, action) {
            state.loading = false;
            state.currentTeamUsers = action.payload;
        },
        error(state, action) {
            state.loading = false;
            state.currentTeam = null;
        },
        reset(state, action) {
            state.loading = true;
            state.currentTeam = null;
            state.myTeams = null;
            state.currentTeamUsers = null;
        }
    }
});

export const teamActions = teamSlice.actions;

export default teamSlice.reducer;