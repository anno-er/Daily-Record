// store/index.js
import {configureStore} from '@reduxjs/toolkit';
import taskListSlice from './slices//taskListSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    taskList: taskListSlice.reducer,
    user: userSlice.reducer,
    // You can add more reducers here
  },
});
