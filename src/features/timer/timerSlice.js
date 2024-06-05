import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  duration: 0,
  filter:"schedule",
  taskName: '',
  startTime: null,
  endTime: null,
  open: false,
  GroupDataTimerArray: [],
  taskNames: {},
  weekStartDates: [],
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state, action) => {
      state.duration = action.payload.duration;
      if (!state.startTime) {
        state.startTime = action.payload.startTime;
      }
    },
    stopTimer: (state, action) => {
      state.endTime = action.payload;
    },
    resetTimer: (state) => {
      state.duration = 0;
      state.taskName = '';
      state.startTime = null;
      state.endTime = null;
      state.open = false;
    },
    addTaskName: (state, action) => {
      state.taskName = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    addGroupDataTimerArray: (state, action) => {
      state.GroupDataTimerArray = action.payload;
      // Initialize taskNames when the data is loaded
      state.taskNames = action.payload.flat().reduce((acc, timer) => {
        acc[timer.id] = timer.taskName || '';
        return acc;
      }, {});
    },
    updateTaskName: (state, action) => {
      const { id, taskName } = action.payload;
      state.taskNames[id] = taskName;
    },
    setWeekStartDates: (state, action) => {
      state.weekStartDates = action.payload
    },
  },
});

export const {
  setWeekStartDates,
  addGroupDataTimerArray,
  startTimer,
  stopTimer,
  resetTimer,
  addTaskName,
  setOpen,
  updateTaskName
} = timerSlice.actions;





export default timerSlice.reducer;
