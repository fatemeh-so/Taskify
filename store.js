import { configureStore } from "@reduxjs/toolkit";
// import taskSlice from "./src/features/schedule/taskSlice";
import taskReducer from "./src/features/schedule/taskSlice"
import timerReducer from "./src/features/timer/timerSlice"

export const store=configureStore({
    reducer: {
      task:taskReducer,
      timer:timerReducer
      },
})
// store.js

