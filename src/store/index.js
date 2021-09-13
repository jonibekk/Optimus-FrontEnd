import { configureStore } from '@reduxjs/toolkit';

import AuthSliceReducer from './slices/AuthSlice';
import HomeFeedReducer from './slices/HomeFeedSlice';
import GoalSlice from './slices/GoalSlice';
import TeamSlice from './slices/TeamSlice';
import UserSlice from './slices/UserSlice';
import ChatSlice from './slices/ChatSlice';
import UI from './slices/UI';

const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        feed: HomeFeedReducer,
        goal: GoalSlice,
        team: TeamSlice,
        user: UserSlice,
        chat: ChatSlice,
        ui: UI,
    }
})

export default store;