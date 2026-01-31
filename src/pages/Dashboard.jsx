import useGetTask from '../features/schedule/useGetTask'
import Spinner from '../components/Spinner'
import TaskReport from '../features/dashboard/TaskReport'
import ProrityTaskCharts from '../features/dashboard/ProrityTaskCharts'
import StatusTaskChart from '../features/dashboard/StatusTaskChart'
import { isThisWeek } from 'date-fns'
import WeeklyTaskDurationChart from './WeeklyTaskDurationChart'
import useGetTimer from '../features/timer/useTimer'
import useGetUser from '../features/auth/useGetUser'
import { useTranslation } from 'react-i18next'
import InprogressTaskReports from '../features/schedule/inprogressTaskReports'

function Dashboard() {
  const { i18n, t } = useTranslation()
  const { data: task, isLoading: isTask } = useGetTask()
  const { data: timerDatas, isLoading } = useGetTimer()
  const { data: user, isLoading: isUser } = useGetUser()

  const timerData = timerDatas?.filter((task) => task?.user_id === user?.id)
  const tasks = task?.filter((task) => task.user_id === user.id)
  const taskFilterInProgressive = tasks?.filter(
    (task) => task?.status === 'In Progress'
  )
  const filter7lastDay = timerData?.filter((t) =>
    isThisWeek(new Date(t?.created_at))
  )

  if (isTask || isLoading || isUser) return <Spinner />

  return (
    <div className='min-h-screen bg-[#f8f9fa] p-4 lg:px-8 lg:py-4 lg:pl-28 pb-20'>
      {/* <div className='flex flex-col mb-4'>
        <p className='text-gray-500 mt-1 font-normal text-lg'>
          {t('welcome_message', {
            defaultValue: 'Welcome back to your daily overview',
          })}
        </p>
      </div> */}

      <TaskReport />

      <InprogressTaskReports
        taskFilterInProgressive={taskFilterInProgressive}
      />

      <div
        dir={i18n.language === 'en' ? 'ltr' : 'rtl'}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      >
        <div className='w-full'>
          <ProrityTaskCharts tasks={tasks} />
        </div>
        <div className='w-full'>
          <WeeklyTaskDurationChart tasks={filter7lastDay} />
        </div>
        <div className='w-full'>
          <StatusTaskChart tasks={tasks} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
