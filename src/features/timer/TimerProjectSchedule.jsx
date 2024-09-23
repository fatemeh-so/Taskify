import { useEffect } from 'react'
import { Input } from '@nextui-org/react'
import TimerProjectSettings from './TimerProjectSetting'
import { useDispatch, useSelector } from 'react-redux'
import useGetTimer from './useTimer'
import Spinner from '../../components/Spinner'
import { formatDate, formatTime } from '../../helpers/TimeConverter'
import { startOfDay, startOfWeek, endOfWeek } from 'date-fns'
import {
  addGroupDataTimerArray,
  updateTaskName,
  setWeekStartDates,
} from './timerScheduleSlice'
import useEditTimer from './useEditTimer'
import TimerScheduleDataInitializer from '../dashboard/TimerScheduleDataInitializer'
import useGetUser from '../auth/useGetUser'

function TimerProjectSchedule() {
  const { data: timerDatas, isLoading } = useGetTimer()
  const { mutate: edit, isLoading: isEdit } = useEditTimer()
  const { data: user, isLoading: isUser } = useGetUser()
  const timerData = timerDatas?.filter((timer) => timer.user_id === user.id)

  const dispatch = useDispatch()
  const { taskNames, weekStartDates } = useSelector(
    (store) => store.timerSchedule
  )
  useEffect(() => {
    if (!isLoading && timerData) {
      const filterTimer = timerData.filter(
        (timer) => timer.filter === 'schedule'
      )
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
  // console.log(weekEnd);
  return (
    <div className='mb-8 w-full'>
      {weekStartDates?.length > 0 && (
        <div className='mt-6 w-full'>
          {weekStartDates.map(({ weekStart, weekEnd, groups }, index) => (
            <div key={`week-${index}`} className='mb-8'>
              <div className='flex m-2 gap-1'>
                <div className='text-md text-gray-600'>
                  {weekStart.split(',').slice(1)} -{weekEnd.split(',').slice(1)}
                </div>
                |
                <div className='flex items-center gap-1 text-sm text-gray-500'>
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
                  className='flex flex-col rounded-xl mt-3'
                >
                  <div className='flex flex-col bg-purple-200 w-full rounded-xl shadow-sm p-4'>
                    <div className='flex justify-between items-center mb-4'>
                      <span className='text-gray-700 font-semibold'>
                        {formatDate(new Date(group[0].created_at), 'MM/dd')}
                      </span>
                      <span className='text-gray-900 lg:text-xl text-lg font-bold'>
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
                        className={`bg-white border-t flex flex-col lg:flex-row items-center justify-between w-full gap-4 px-4 py-2 lg:px-4 lg:py-4 ${
                          idx === group.length - 1 ? 'rounded-b-xl' : ''
                        }`}
                      >
                        <div className='w-full flex justify-between items-center py-2 lg:py-0 gap-4'>
                          <Input
                            variant='bordered'
                            size='lg'
                            className='flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            type='text'
                            value={taskNames[timerToday.id] || ''}
                            onChange={(e) =>
                              handleInputChange(timerToday.id, e.target.value)
                            }
                            onBlur={(e) =>
                              handleEditInput(timerToday.id, e.target.value)
                            }
                          />
                          <div className='block lg:hidden'>
                            <TimerProjectSettings id={timerToday.id} />
                          </div>
                        </div>

                        <div className='w-full flex justify-between lg:justify-end bg- sm:flex-row sm:items-center gap-4 px-[2px]'>
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
                          <div className='hidden lg:block'>
                            <TimerProjectSettings id={timerToday.id} />
                          </div>
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

const TaskReportWithInitialization = () => (
  <TimerScheduleDataInitializer>
    <TimerProjectSchedule />
  </TimerScheduleDataInitializer>
)

export default TaskReportWithInitialization
