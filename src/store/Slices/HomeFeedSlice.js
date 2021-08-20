import { createSlice } from '@reduxjs/toolkit';

const initHomeFeedState = {
    isLoading: true,
    feedActions: null
}

const homeFeedSlice = createSlice({
    name: 'homefeed',
    initialState: initHomeFeedState,
    reducers: {
        loadActions(state, action) {
            state.isLoading = false;
            state.feedActions = action.payload;
        },
        reset(state, action) {
            state.isLoading = true;
            state.feedActions = null;
        }
    }
});

export const homeFeedActions = homeFeedSlice.actions;

export default homeFeedSlice.reducer;