import { configureStore } from "@reduxjs/toolkit";
// import taskSlice from "./src/features/schedule/taskSlice";
import taskReducer from "./src/features/schedule/taskSlice"
import timerReducer from "./src/features/timer/timerSlice"
import timerScheduleReducer from "./src/features/timer/timerScheduleSlice"
import headerReducer from "./src/features/Header/HeaderSlice"

export const store=configureStore({
    reducer: {
      task:taskReducer,
      timer:timerReducer,
      timerSchedule:timerScheduleReducer,
      header:headerReducer,

      },
})
// store.js

