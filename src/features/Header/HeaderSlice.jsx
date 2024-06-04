import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentStatus: '',
  close: false,
  inputValue: null,
}

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    openSearch: (state, action) => {
      state.close = action.payload
      state.editStatus = 'open'
    },
    addInputValue: (state, action) => {
      state.inputValue = action.payload
    },
  },
})

export const { openSearch, addInputValue } = headerSlice.actions

export default headerSlice.reducer
