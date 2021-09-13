import { createSlice } from '@reduxjs/toolkit';

const initUiState = {
    loading: true,
    onActionCreate: false,
    activityHeatmap: null,
    actionsWidgetCount: 0,
    goalsWidgetCount: 0,
    postDetails: null,
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
            state.actionsWidgetCount = action.payload;
        },
        loadGoalsWidget(state, action) {
            state.goalsWidgetCount = action.payload;
        },
        loadPostDetails(state, action) {
            state.loading = false;
            state.postDetails = action.payload;
        },
        cleanPostDetails(state, action) {
            state.loading = true;
            state.postDetails = null;
        },
        reset(state, action) {
            state.loading = true;
            state.activityHeatmap = null;
            state.actionsWidgetCount = 0;
            state.goalsWidgetCount = 0;
        }
    }
});

export const UiActions = UI.actions;

export default UI.reducer;