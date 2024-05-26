import { configureStore } from "@reduxjs/toolkit";
// import taskSlice from "./src/features/schedule/taskSlice";
import taskReducer from "./src/features/schedule/taskSlice"
export const store=configureStore({
    reducer: {
      task:taskReducer
      },
})
// store.js

