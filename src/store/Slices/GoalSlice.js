import { createSlice } from '@reduxjs/toolkit';


const initState = {
    loading: true,
    myGoals: null,
    subscribedGoals: null,
    allGoals: null,
    currentGoal: null
};

const goalSlice = createSlice({
    name: 'goals',
    initialState: initState,
    reducers: {
        getMyGoals(state, action) {
            state.loading = false;
            state.myGoals = action.payload
        },
        getCurrentGoalData(state, action) {
            state.loading = false;
            state.currentGoal = action.payload
        },
        getMyGoalsIncSubs(state, action) {
            state.loading = false;
            state.subscribedGoals = action.payload
        },
        getAllGoals(state, action) {
            state.loading = false;
            state.allGoals = action.payload
        },
        createGoal(state, action) {
            state.loading = false;
            console.log(action.payload);
        },
        error(state) {
            state.loading = false;
            state.currentGoal = null;
        },
        reset(state, action) {
            state.loading = true;
            state.myGoals = null;
            state.subscribedGoals = null;
            state.allGoals = null;
            state.currentGoal = null;
        }
    }
});

export const goalActions = goalSlice.actions;

export default goalSlice.reducer;