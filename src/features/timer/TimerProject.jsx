import React, { useEffect } from 'react'
import { Input } from '@nextui-org/react'
import TimerProjectSettings from './TimerProjectSetting'
import { useDispatch, useSelector } from 'react-redux'
import useGetTimer from './useTimer'
import useEditTimer from './useEditTimer'

import Spinner from '../../components/Spinner'
import { formatDate, formatTime } from '../../helpers/TimeConverter'
import { startOfDay, startOfWeek, endOfWeek, isThisWeek } from 'date-fns'
import {
  addGroupDataTimerArray,
  updateTaskName,
  setWeekStartDates,
} from './timerSlice'
import useGetUser from '../auth/useGetUser'

function TimerProject() {
  const { data: timerDatas, isLoading } = useGetTimer()
  const { mutate: edit, isLoading: isEdit } = useEditTimer()
  const { data: user, isLoading: isUser } = useGetUser()
  const timerData = timerDatas?.filter((timer) => timer.user_id === user.id)
  const dispatch = useDispatch()
  const { GroupDataTimerArray, taskNames, weekStartDates } = useSelector(
    (store) => store.timer
  )

  useEffect(() => {
    if (!isLoading && timerData) {
      const filterTimer = timerData.filter((timer) => timer.filter === 'timer')
      const groupedData = filterTimer.reduce((acc, current) => {
        const date = formatDate(startOfDay(new Date(current.created_at)))
        if (!acc[date]) {
          acc[date] = []
        }

        acc[date].push(current)

        return acc
      }, {})

      const sortedGroupedData = Object.keys(groupedData)
        .map((date) => groupedData[date])
        .reverse() // Reverse the order of sortedGroupedData, first add first show

      dispatch(addGroupDataTimerArray(sortedGroupedData))

      // Group by week
      const weekStartDates = sortedGroupedData.reduce((weeks, group) => {
        const weekStart = formatDate(
          startOfWeek(new Date(group[0].created_at), { weekStartsOn: 1 })
        )
        const weekEnd = formatDate(
          endOfWeek(new Date(group[0].created_at), { weekStartsOn: 1 })
        )

        if (!weeks[weekStart]) {
          weeks[weekStart] = []
        }

        weeks[weekStart].push(group)
        return weeks
      }, {})

      const labeledWeeks = Object.entries(weekStartDates).map(
        ([weekStart, groups]) => {
          const weekEnd = formatDate(
            endOfWeek(new Date(groups[0][0].created_at), { weekStartsOn: 1 })
          )

          return { weekEnd, weekStart, groups }
        }
      )

      dispatch(setWeekStartDates(labeledWeeks))
    }
  }, [timerDatas, isLoading, dispatch])

  const handleInputChange = (id, value) => {
    dispatch(updateTaskName({ id, taskName: value }))
  }

  const handleEditInput = (id, value) => {
    edit({ id: id, taskName: value })
  }

  if (isLoading || isEdit || isUser) return <Spinner />

  return (
    <div className='w-[98%] mx-auto mb-8'>
      {weekStartDates.length > 0 && (
        <div className='mt-6 w-full h-full'>
          {weekStartDates.map(({ weekStart, weekEnd, groups }, index) => (
            <div key={`week-${index}`} className='mb-8'>
              <div className='flex  m-2 gap-1'>
                <div className='text-md text-gray-600'>
                  {weekStart !== 'Today'
                    ? weekStart.split(',').slice(1)
                    : 'Today'} -
                  {weekEnd.split(',').slice(1)}
                </div>
                |
                <div className='flex fle items-center gap-1 text-sm text-gray-500'>
                  <span>Total : </span>
                  <span className='font-semibold text-gray-700'>
                    {new Date(
                      groups.reduce((acc, group) => {
                        return (
                          acc +
                          group.reduce(
                            (groupAcc, cur) => groupAcc + cur.duration,
                            0
                          )
                        )
                      }, 0) * 1000
                    )
                      .toISOString()
                      .substr(11, 8)}
                  </span>
                </div>
              </div>

              {groups.map((group, groupIndex) => (
                <div
                  key={`group-${groupIndex}`}
                  className='shadow-lg bg-white h-auto flex flex-col rounded-xl mt-3 ml-2'
                >
                  <div className='flex flex-col bg-blue-100 w-full rounded-[1rem] shadow-sm'>
                    <div className='flex justify-between p-4 items-center bg-blue-200 rounded-t-[1rem]'>
                      <span className='text-gray-700 font-semibold'>
                        {formatDate(new Date(group[0].created_at), 'MM/dd')}
                      </span>
                      <span className='text-gray-900 text-xl font-bold'>
                        {new Date(
                          group.reduce(
                            (acc, timer) => acc + timer.duration,
                            0
                          ) * 1000
                        )
                          .toISOString()
                          .substr(11, 8)}
                      </span>
                    </div>

                    {group.map((timerToday, idx) => (
                      <div
                        key={timerToday.id}
                        className={`bg-white border-b flex items-center justify-between w-full gap-5 p-4 ${
                          idx === group.length - 1 ? 'rounded-b-[1rem]' : ''
                        }`}
                      >
                        <Input
                          variant='bordered'
                          size='lg'
                          className='w-1/3  py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                          type='text'
                          value={taskNames[timerToday.id] || ''}
                          onChange={(e) => {
                            handleInputChange(timerToday.id, e.target.value)
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
          ))}
        </div>
      )}
    </div>
  )
}

export default TimerProject
