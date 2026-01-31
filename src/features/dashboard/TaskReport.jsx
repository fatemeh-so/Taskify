import { useSelector } from 'react-redux'
import Spinner from '../../components/Spinner'
import useGetTask from '../schedule/useGetTask'
import useGetUser from '../auth/useGetUser'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from '@nextui-org/react'
import {
  CheckCircle,
  Clock,
  HourglassHigh,
  ListChecks,
  Circle,
} from 'phosphor-react'

export default function TaskReport() {
  const { t } = useTranslation()
  const { data: tasks, isLoading: isTask } = useGetTask()
  const { data: user, isLoading: isUser } = useGetUser()

  const { weekStartDates } = useSelector((store) => store.timer)
  const { weekStartDates: weekStartDates2 } = useSelector(
    (store) => store.timerSchedule
  )
  const task = tasks?.filter((timer) => timer.user_id === user.id)

  if (isTask || isUser) return <Spinner />

  const total = task?.length || 0
  const todoTask =
    task?.filter((task) => task.status?.toString() === 'Not Started').length ||
    0
  const inProgressTask =
    task?.filter((task) => task.status?.toString() === 'In Progress').length ||
    0
  const completedTask =
    task?.filter((task) => task.status?.toString() === 'Completed').length || 0

  const totalWeekTimer =
    weekStartDates?.[0]?.groups
      ?.flat()
      .reduce((acc, cur) => acc + cur?.duration, 0) || 0

  const totalWeekTimer2 =
    weekStartDates2?.[0]?.groups
      ?.flat()
      .reduce((acc, cur) => acc + cur?.duration, 0) || 0

  const constTotalWeeks = totalWeekTimer + totalWeekTimer2
  const formattedTotalWeekTimer = new Date(constTotalWeeks * 1000)
    .toISOString()
    .substr(11, 8)

  const stats = [
    {
      title: t('totalTask'),
      value: total,
      icon: ListChecks,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
    },
    {
      title: t('notStarted'),
      value: todoTask,
      icon: Circle,
      color: 'text-rose-500',
      bg: 'bg-rose-50',
    },
    {
      title: t('inProgress'),
      value: inProgressTask,
      icon: HourglassHigh,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      title: t('completed'),
      value: completedTask,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
    {
      title: t('currentWeekTimer'),
      value: formattedTotalWeekTimer,
      icon: Clock,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
  ]

  return (
    <div className='w-full grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6'>
      {stats.map((stat, index) => (
        <Card
          key={index}
          shadow='sm'
          className='
  border-none
  last:odd:col-span-2
  md:last:odd:col-span-1
  lg:col-span-1
'
        >
          <CardBody className='flex flex-row items-center justify-between p-4'>
            <div>
              <p className='text-sm text-gray-500 font-medium mb-1'>
                {stat.title}
              </p>
              <h4 className='text-2xl font-bold text-gray-800'>{stat.value}</h4>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} weight='bold' />
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
