import { parseAbsoluteToLocal } from '@internationalized/date'
import { createSlice } from '@reduxjs/toolkit'
const now=new Date().toISOString()
const initialState = {
  duration: 0,
  taskName: '',
  startTime: null,
  endTime: null,
  open: false,
  currentDate:parseAbsoluteToLocal(now)
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state, action) => {
      state.duration = action.payload.duration
      if (!state.startTime) {
        state.startTime = action.payload.startTime
      }
    },
    stopTimer: (state, action) => {
      state.endTime = action.payload
    },
    resetTimer: (state) => {
      state.duration = 0
      state.taskName = ''
      state.startTime = null
      state.endTime = null
      state.open = false
    },
    addTaskName: (state, action) => {
      state.taskName = action.payload
    },
    setOpen: (state, action) => {
      state.open = action.payload
    },
    changeDate:(state,action)=>{
      state.currentDate=action.payload
    }
  },
})

export const {changeDate, startTimer, stopTimer, resetTimer, addTaskName, setOpen } = timerSlice.actions

export default timerSlice.reducer
