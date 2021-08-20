import { createSlice } from '@reduxjs/toolkit';

const initUiState = {
    onActionCreate: false,
    activityHeatmap: null,
    actionsWidget: 0,
    goalsWidget: 0,
}

const UI = createSlice({
    name: 'ui',
    initialState: initUiState,
    reducers: {
        actionCreate(state, action) {
            state.onActionCreate = action.payload;
        },
        loadActivityGraph(state, action) {
            state.activityHeatmap = action.payload;
        },
        loadActionsWidget(state, action) {
            state.actionsWidget = action.payload;
        },
        loadGoalsWidget(state, action) {
            state.goalsWidget = action.payload;
        },
        reset(state, action) {
            state.loading = true;
            state.activityHeatmap = null;
            state.actionsWidget = 0;
            state.goalsWidget = 0;
        }
    }
});

export const UiActions = UI.actions;

export default UI.reducer;