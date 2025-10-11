import { useSelector } from 'react-redux'
import Spinner from '../../components/Spinner'
import useGetTask from '../schedule/useGetTask'
// import TimerScheduleDataInitializer from '../dashboard/TimerScheduleDataInitializer'
import useGetUser from '../auth/useGetUser'
import { useTranslation } from 'react-i18next'

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

  return (
    <div className='w-full p-0 md:py-4 mb-2 lg:mb-0'>
      <div className='flex flex-wrap justify-around gap-2 md:gap-4'>
        <div className='bg-white p-2 md:p-4 rounded-lg text-center hover:shadow-lg transition-shadow flex-1 min-w-[120px] md:min-w-[150px]'>
          <span className='text-lg md:text-2xl text-green-500'>{total}</span>
          <h1 className='text-sm md:text-lg text-gray-600'>{t('totalTask')}</h1>
        </div>
        <div className='bg-white p-2 md:p-4 rounded-lg text-center hover:shadow-lg transition-shadow flex-1 min-w-[120px] md:min-w-[150px]'>
          <span className='text-lg md:text-2xl text-pink-500'>{todoTask}</span>
          <h1 className='text-sm md:text-lg text-gray-600'>
            {t('notStarted')}
          </h1>
        </div>
        <div className='bg-white p-2 md:p-4 rounded-lg text-center hover:shadow-lg transition-shadow flex-1 min-w-[120px] md:min-w-[150px]'>
          <span className='text-lg md:text-2xl text-blue-500'>
            {inProgressTask}
          </span>
          <h1 className='text-sm md:text-lg text-gray-600'>
            {t('inProgress')}
          </h1>
        </div>
        <div className='bg-white p-2 md:p-4 rounded-lg text-center hover:shadow-lg transition-shadow flex-1 min-w-[120px] md:min-w-[150px]'>
          <span className='text-lg md:text-2xl text-yellow-500'>
            {completedTask}
          </span>
          <h1 className='text-sm md:text-lg text-gray-600'>{t('completed')}</h1>
        </div>
        <div className='bg-white p-2 md:p-4 rounded-lg text-center hover:shadow-lg transition-shadow flex-1 min-w-[120px] md:min-w-[150px]'>
          <span className='text-lg md:text-2xl text-orange-500'>
            {formattedTotalWeekTimer}
          </span>
          <h1 className='text-sm md:text-lg text-gray-600'>
            {t('currentWeekTimer')}
          </h1>
        </div>
      </div>
    </div>
  )
}
