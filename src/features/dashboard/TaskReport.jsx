import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../../components/Spinner'
import useGetTask from '../schedule/useGetTask'
import TimerScheduleDataInitializer from '../dashboard/TimerScheduleDataInitializer'

function TaskReport() {
  const { data: task, isLoading: isTask } = useGetTask()
  const { weekStartDates } = useSelector((store) => store.timer)
  const { weekStartDates: weekStartDates2 } = useSelector(
    (store) => store.timerSchedule
  )

  if (isTask) return <Spinner />

  const total = task?.length || 0
  const todoTask = task?.filter((task) => task.status?.toString() === 'Not Started').length || 0
  const inProgressTask = task?.filter((task) => task.status?.toString() === 'In Progress').length || 0
  const completedTask = task?.filter((task) => task.status?.toString() === 'Completed').length || 0

  const allTimer = task?.reduce((acc, cur) => acc + cur?.duration, 0) || 0

  const totalWeekTimer = weekStartDates?.[0]?.groups
    ?.flat()
    .reduce((acc, cur) => acc + cur?.duration, 0) || 0

  const totalWeekTimer2 = weekStartDates2?.[0]?.groups
    ?.flat()
    .reduce((acc, cur) => acc + cur?.duration, 0) || 0

  const constTotalWeeks = totalWeekTimer + totalWeekTimer2
  const formattedTotalWeekTimer = new Date(constTotalWeeks * 1000)
    .toISOString()
    .substr(11, 8)

  return (
    <div className='w-full p-2 md:p-4'>
      <div className='flex flex-wrap justify-around gap-2 md:gap-4'>
        <div className='bg-white p-2 md:p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow flex-1 min-w-[120px] md:min-w-[150px]'>
          <span className='text-lg md:text-2xl text-green-500'>{total}</span>
          <h1 className='text-sm md:text-lg text-gray-600'>Total Tasks</h1>
        </div>
        <div className='bg-white p-2 md:p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow flex-1 min-w-[120px] md:min-w-[150px]'>
          <span className='text-lg md:text-2xl text-pink-500'>{todoTask}</span>
          <h1 className='text-sm md:text-lg text-gray-600'>Not Started</h1>
        </div>
        <div className='bg-white p-2 md:p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow flex-1 min-w-[120px] md:min-w-[150px]'>
          <span className='text-lg md:text-2xl text-blue-500'>
            {inProgressTask}
          </span>
          <h1 className='text-sm md:text-lg text-gray-600'>In Progress</h1>
        </div>
        <div className='bg-white p-2 md:p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow flex-1 min-w-[120px] md:min-w-[150px]'>
          <span className='text-lg md:text-2xl text-yellow-500'>
            {completedTask}
          </span>
          <h1 className='text-sm md:text-lg text-gray-600'>Completed</h1>
        </div>
        <div className='bg-white p-2 md:p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow flex-1 min-w-[120px] md:min-w-[150px]'>
          <span className='text-lg md:text-2xl text-orange-500'>
            {formattedTotalWeekTimer}
          </span>
          <h1 className='text-sm md:text-lg text-gray-600'>
            Current Week Timer
          </h1>
        </div>
      </div>
    </div>
  )
}

const TaskReportWithInitialization = () => (
  <TimerScheduleDataInitializer>
    <TaskReport />
  </TimerScheduleDataInitializer>
)

export default TaskReportWithInitialization
