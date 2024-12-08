import {createSlice} from '@reduxjs/toolkit';

const taskListSlice = createSlice({
  name: 'taskList',
  initialState: {
    taskList: [],
  },
  reducers: {
    setTaskList(state, action) {
      state.taskList = action.payload;
    },
  },
});

export const {setTaskList} = taskListSlice.actions;
export default taskListSlice;
