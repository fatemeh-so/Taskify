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
import { Card, CardHeader, CardBody } from '@nextui-org/react'

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
    <Card className='shadow-sm border border-gray-100 h-full'>
      <CardHeader className='pb-0 pt-4 px-4 flex-col items-start'>
        <h3 className='font-bold text-large text-gray-800'>{t('taskTimer')}</h3>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <ResponsiveContainer width='100%' height={250}>
          <BarChart data={i18n.language === 'fa' ? JalaliData : data}>
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='#E5E7EB'
            />
            <XAxis
              dataKey='day'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: '#F3F4F6' }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value) =>
                new Date(value * 1000).toISOString().substr(11, 8)
              }
            />
            <Legend iconType='circle' />
            <Bar
              dataKey='duration'
              name={t('duration')}
              fill='#6366f1'
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}

export default WeeklyTaskDurationChart
