import { createSlice } from "@reduxjs/toolkit"

const initialState={
    duration:0,
    status:'paused',
    taskName:'',
    startTime:'',
    endTime:'',
    tags:'',
    notes:'',
    all:null,
}
const timerSlice=createSlice({
    name:'timer',
    initialState,
    reducers:{
        startTimer:(state,action)=>{
            state.duration=action.payload.duration
            state.startTime=action.payload.startTime
            state.status="running"
        },
        addTaskName:(state,action)=>{
            state.taskName=action.payload
        },
        stopTimer:(state,action)=>{
            state.endTime=action.payload
            state.status = 'stopped'; 
        },
        resetTimer: (state) => {
            state.duration = 0;
            state.taskName = '';
            state.startTime = null;
            state.endTime = null;
            // state.all=null;
            state.status = 'stopped';
          },
          addAll:(state,action)=>{
            state.all=action.payload
          }
    }
})
export const {startTimer,addTaskName,resetTimer,stopTimer,addAll}=timerSlice.actions

export default timerSlice.reducer