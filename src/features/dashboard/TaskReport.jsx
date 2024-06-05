import React from 'react'
import { format } from 'date-fns'
import Spinner from '../../components/Spinner'
import useGetTask from '../schedule/useGetTask'
import { useSelector } from 'react-redux'

function TaskReport() {
  const { data: task, isLoading: isTask } = useGetTask()
  const { GroupDataTimerArray, taskNames, weekStartDates } = useSelector(
    (store) => store.timer
  )

  if (isTask) return <Spinner />

  const total = task?.length || 0
  const todoTask = task?.filter((task) => task.status?.toString() === 'Not Started').length || 0
  const inProgressTask = task?.filter((task) => task.status?.toString() === 'In Progress').length || 0
  const completedTask = task?.filter((task) => task.status?.toString() === 'Completed').length || 0
  const allTimer = task?.reduce((acc, cur) => acc + cur.duration, 0) || 0

  // Flatten the nested groups array and calculate the total duration
  const totalWeekTimer = weekStartDates?.[0]?.groups
    .flat()
    .reduce((acc, cur) => acc + cur.duration, 0) || 0

  const formattedTotalWeekTimer = new Date(totalWeekTimer * 1000).toISOString().substr(11, 8)

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
          <span className='text-lg md:text-2xl text-blue-500'>{inProgressTask}</span>
          <h1 className='text-sm md:text-lg text-gray-600'>In Progress</h1>
        </div>
        <div className='bg-white p-2 md:p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow flex-1 min-w-[120px] md:min-w-[150px]'>
          <span className='text-lg md:text-2xl text-yellow-500'>{completedTask}</span>
          <h1 className='text-sm md:text-lg text-gray-600'>Completed</h1>
        </div>
        <div className='bg-white p-2 md:p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow flex-1 min-w-[120px] md:min-w-[150px]'>
          <span className='text-lg md:text-2xl text-orange-500'>{formattedTotalWeekTimer}</span>
          <h1 className='text-sm md:text-lg text-gray-600'> Current Week Timer</h1>
        </div>
      </div>
    </div>
  )
}

export default TaskReport
