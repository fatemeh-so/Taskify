import { createSlice } from '@reduxjs/toolkit'
import { useTranslation } from 'react-i18next'
const initialState = {
  currentStatus: '',
  close: false,
  title: null,
  dateCal: null,
  test: false,
  datePickerStatus: false,
  categories: [
    { id: '1', name: { en: 'Work', fa: 'کار' } },
    { id: '2', name: { en: 'Personal', fa: 'شخصی' } },
    { id: '3', name: { en: 'Study', fa: 'تحصیل' } },
    { id: '4', name: { en: 'Fitness', fa: 'تناسب اندام' } },
    { id: '5', name: { en: 'Family', fa: 'خانواده' } },
    { id: '6', name: { en: 'Health', fa: 'سلامتی' } },
    { id: '7', name: { en: 'Finance', fa: 'مالی' } },
    { id: '8', name: { en: 'Travel', fa: 'سفر' } },
    { id: '9', name: { en: 'Hobbies', fa: 'سرگرمی' } },
    { id: '10', name: { en: 'Social', fa: 'اجتماعی' } },
  ],
  statuses: [
    { id: 1, name: { en: 'Not Started', fa: 'شروع نشده' } },
    { id: 2, name: { en: 'In Progress', fa: 'در حال انجام' } },
    { id: 3, name: { en: 'Completed', fa: 'تکمیل شده' } },
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
    openAddTask(state) {
      state.close = true
      state.status = 'open'
    },
    CloseAddTask(state) {
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
    closeEditTask: (state) => {
      state.OpenEditTask = false
      state.editStatus = 'close'
    },
    addEditTaskValue: (state, action) => {
      state.allEditTask = action.payload
    },
    addStatus: (state, action) => {
      state.currentStatus = action.payload
    },
    addDateCal: (state, action) => {
      state.dateCal = action.payload
      state.datePickerStatus = true
    },
    closeDateCal: (state, action) => {
      state.datePickerStatus = action.payload
    },
    testadd: (state, action) => {
      state.test = action.payload
    },
    clearAllField: (state) => {
      state.title = null
      state.currentPriority = null
      state.statuses = []
      state.currentCategory = null
      state.currentStatus = ''
    },
  },
})

export const {
  testadd,
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
  clearAllField,
} = taskSlice.actions

export default taskSlice.reducer
