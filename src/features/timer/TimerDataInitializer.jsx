import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { setWeekStartDates, addGroupDataTimerArray } from './timerSlice'
// import useGetTimer from './useGetTimer'
import { FormatDate } from '../../helpers/TimeConverter'
import { startOfDay, startOfWeek, endOfWeek } from 'date-fns'
import Spinner from '../../components/Spinner'
import { addGroupDataTimerArray, setWeekStartDates } from '../timer/timerScheduleSlice'
import useGetTimer from '../timer/useTimer'

const TimerDataInitializer = ({ children }) => {
  const dispatch = useDispatch()
  const { data: timerData, isLoading } = useGetTimer()

  useEffect(() => {
    if (!isLoading && timerData) {
      const filterTimer = timerData.filter((timer) => timer.filter === 'schedule')
      const groupedData = filterTimer.reduce((acc, current) => {
        const date = FormatDate(startOfDay(new Date(current.created_at)))
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(current)
        return acc
      }, {})

      const sortedGroupedData = Object.keys(groupedData)
        .map((date) => groupedData[date])
        .reverse()

      dispatch(addGroupDataTimerArray(sortedGroupedData))

      const weekStartDates = sortedGroupedData.reduce((weeks, group) => {
        const weekStart = FormatDate(
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
          const weekEnd = FormatDate(
            endOfWeek(new Date(groups[0][0].created_at), { weekStartsOn: 1 })
          )
          return { weekEnd, weekStart, groups }
        }
      )

      dispatch(setWeekStartDates(labeledWeeks))
    }
  }, [timerData, isLoading, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return <>{children}</>
}

export default TimerDataInitializer