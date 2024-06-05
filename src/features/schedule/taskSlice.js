import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentStatus: '',
  close: false,
  title: null,
  dateCal:null,
  datePickerStatus:false,
  categories: [
    { id: '1', name: 'Work' },
    { id: '2', name: 'Personal' },
    { id: '3', name: 'Study' },
    { id: '4', name: 'Fitness' },
    { id: '5', name: 'Family' },
    { id: '6', name: 'Health' },
    { id: '7', name: 'Finance' },
    { id: '8', name: 'Travel' },
    { id: '9', name: 'Hobbies' },
    { id: '10', name: 'Social' },
  ],
   statuses : [
    { id: 1, name: 'Not Started' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Completed' },
  ],
  currentPriority: null,
  currentCategory: null,
  todoValue: [],
  allTask: null,
  allEditTask: null,
  OpenEditTask: false,
  editStatus: 'close',
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    openAddTask(state, action) {
      state.close = true
      state.status = 'open'
    },
    CloseAddTask(state, action) {
      state.close = false
      state.status = 'close'
    },
    addTitle(state, action) {
      state.status = 'open'
      state.title = action.payload
    },
    addCategories(state, action) {
      state.status = 'open'
      state.currentCategory = action.payload
    },
    addPriority: (state, action) => {
      state.currentPriority = action.payload
      state.status = 'open'
    },
    addToDoValue: (state, action) => {
      state.todoValue = action.payload
      state.status = 'open'
    },
    addTask: (state, action) => {
      state.allTask = action.payload
      state.status = 'close'
    },
    editTask: (state, action) => {
      state.OpenEditTask = true
      state.allEditTask = action.payload
      state.editStatus = 'open'
    },
    closeEditTask: (state, action) => {
      state.OpenEditTask = false
      state.editStatus = 'close'
    },
    addEditTaskValue: (state, action) => {
      state.allEditTask = action.payload
    },
    addStatus: (state, action) => {
      state.currentStatus = action.payload
    },
    addDateCal:(state,action)=>{
      state.dateCal=action.payload
      state.datePickerStatus=true

    },
    closeDateCal:(state,action)=>{
      state.datePickerStatus=action.payload
    }
  },
})

export const {
  closeDateCal,
  addDateCal,
  addStatus,
  closeEditTask,
  addTask,
  editTask,
  openAddTask,
  addTitle,
  addCategories,
  addPriority,
  addToDoValue,
  CloseAddTask,
} = taskSlice.actions

export default taskSlice.reducer
