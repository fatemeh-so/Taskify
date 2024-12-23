/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'
import {
  format as formatJalali,
  startOfWeek as startOfWeekJalali,
  endOfWeek as endOfWeekJalali,
  eachDayOfInterval as eachDayOfIntervalJalali,
} from 'date-fns-jalali'
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'

import { useTranslation } from 'react-i18next'

const WeeklyTaskDurationChart = ({ tasks }) => {
  const { t, i18n } = useTranslation()
  const weekDays =
    i18n.language === 'fa'
      ? eachDayOfIntervalJalali({
          start: startOfWeekJalali(new Date()),
          end: endOfWeekJalali(new Date()),
        })
      : eachDayOfInterval({
          start: startOfWeek(new Date()),
          end: endOfWeek(new Date()),
        })

  const data = weekDays.map((day) => {
    const formattedDay = format(day, 'yyyy-MM-dd')
    const totalDuration = tasks
      .filter(
        (task) =>
          format(new Date(task.created_at), 'yyyy-MM-dd') === formattedDay
      )
      .reduce((sum, task) => sum + task.duration, 0)
    return {
      day: format(day, 'EEEE'),
      duration: totalDuration, // Store duration in seconds for YAxis
      formattedDuration: new Date(totalDuration * 1000)
        .toISOString()
        .substr(11, 8), // For tooltip
    }
  })
  const JalaliData = weekDays.map((day) => {
    const formattedDay = formatJalali(day, 'yyyy-MM-dd')
    const totalDuration = tasks
      .filter(
        (task) =>
          formatJalali(new Date(task.created_at), 'yyyy-MM-dd') === formattedDay
      )
      .reduce((sum, task) => sum + task.duration, 0)
    return {
      day: formatJalali(day, 'EEEE'),
      duration: totalDuration, // Store duration in seconds for YAxis
      formattedDuration: new Date(totalDuration * 1000)
        .toISOString()
        .substr(11, 8), // For tooltip
    }
  })
  return (
    <div className='mt-4 bg-white p-4 rounded-lg shadow-md'>
      <h2 className='text-lg text-gray-800 mb-4'>
        {t('taskTimer')}
      </h2>
      <ResponsiveContainer
        width='100%'
        height={200}
        minHeight={150}
        maxHeight={300}
      >
        <BarChart data={i18n.language === 'fa' ? JalaliData : data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='day' />
          <YAxis />
          <Tooltip
            formatter={(value) =>
              new Date(value * 1000).toISOString().substr(11, 8)
            }
          />
          <Legend />
          <Bar dataKey='duration' name={t('duration')} fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeeklyTaskDurationChart
