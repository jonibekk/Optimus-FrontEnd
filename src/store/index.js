import { configureStore } from '@reduxjs/toolkit';

import AuthSliceReducer from './Slices/AuthSlice';
import HomeFeedReducer from './Slices/HomeFeedSlice';
import GoalSlice from './Slices/GoalSlice';
import TeamSlice from './Slices/TeamSlice';
import UserSlice from './Slices/UserSlice';
import ChatSlice from './Slices/ChatSlice';
import UI from './Slices/UI';

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