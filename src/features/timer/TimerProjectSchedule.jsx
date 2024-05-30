import React, { useEffect } from 'react'
import { Input } from '@nextui-org/react'
import TimerProjectSettings from './TimerProjectSetting'
import { useDispatch, useSelector } from 'react-redux'
import useGetTimer from './useTimer'
import Spinner from '../../components/Spinner'
import { formatDate, formatTime } from '../../helpers/TimeConverter'
import { isToday, startOfDay } from 'date-fns'
import { addGroupDataTimerArray, updateTaskName } from './timerScheduleSlice'
import useEditTimer from './useEditTimer'
function TimerProjectSchedule() {
  const { data: timerData, isLoading } = useGetTimer()
  const { mutate: edit, isLoading: isEdit } = useEditTimer()
  const dispatch = useDispatch()
  const { GroupDataTimerArray, taskNames } = useSelector((store) => store.timerSchedule)
  const filterTimer=timerData.filter(timer=>timer.filter==="schedule")

  useEffect(() => {
    if (!isLoading && timerData) {
      // Group data by created_at date using startOfDay to handle date boundaries correctly
      const groupedData = filterTimer.reduce((acc, current) => {
        const date = formatDate(startOfDay(new Date(current.created_at)))

        if (!acc[date]) {
          acc[date] = []
        }

        acc[date].push(current)

        return acc
      }, {})

      // Convert the grouped data object to an array of arrays and sort by date
      const groupedDataArray = Object.keys(groupedData)
        .sort((a, b) => {
          const dateA = new Date(a)
          const dateB = new Date(b)

          if (isToday(dateA)) return -1 // Show today first
          if (isToday(dateB)) return 1

          return dateB - dateA // Then sort by other dates in descending order
        })
        .map((date) => groupedData[date])

      dispatch(addGroupDataTimerArray(groupedDataArray))
    }
  }, [timerData, isLoading, dispatch])

  const handleInputChange = (id, value) => {
    dispatch(updateTaskName({ id, taskName: value }))
  }
  const handleEditInput = (id, value) => {
    edit({ id: id, taskName: value })
  }
  if (isLoading || isEdit) return <Spinner />

  // console.log('GroupDataTimerArray:', GroupDataTimerArray)
  // console.log('Task Names:', taskNames)

  return (
    <div className='mb-8'>
      {GroupDataTimerArray.length > 0 && (
        <div className='mt-6 w-full h-full'>
          {GroupDataTimerArray.map((group, index) => (
            <div
              key={`group-${index}`}
              className='shadow-lg mr-4 bg-white h-auto flex flex-col rounded-xl mt-3 ml-2'
            >
              <div className='flex flex-col bg-blue-100 w-full rounded-[1rem] shadow-sm'>
                <div className='flex justify-between p-4 items-center'>
                  <span className='text-gray-700 font-semibold'>
                    {formatDate(group[0].created_at)}
                  </span>
                  <span className='text-gray-900 text-xl font-bold'>
                    {new Date(
                      group.reduce((acc, timer) => acc + timer.duration, 0) *
                        1000
                    )
                      .toISOString()
                      .substr(11, 8)}
                  </span>
                </div>

                {group.map((timerToday, idx) => (
                  <div
                    key={timerToday.id}
                    className={`bg-[#ffffff] border-b flex items-center justify-between w-auto gap-5 p-4 ${
                      idx === group.length - 1 ? 'rounded-b-[1rem]' : ''
                    }`}
                  >
                    <Input
                      variant='bordered'
                      size='lg'
                      className='w-1/3 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      type='text'
                      value={taskNames[timerToday.id] || ''}
                      onChange={(e) => {
                        handleInputChange(timerToday.id, e.target.value)

                        console.log('cur', timerToday.id, e.target.value)
                      }}
                      onBlur={(e) =>
                        handleEditInput(timerToday.id, e.target.value)
                      }
                    />
                    <div className='flex items-center gap-5'>
                      <div className='flex justify-end items-center gap-1 text-gray-700'>
                        <span>{formatTime(timerToday.startTime)}</span>
                        <span>-</span>
                        <span>{formatTime(timerToday.endTime)}</span>
                      </div>
                      <span className='text-gray-700'>
                        {new Date(timerToday.duration * 1000)
                          .toISOString()
                          .substr(11, 8)}
                      </span>
                      <TimerProjectSettings id={timerToday.id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TimerProjectSchedule