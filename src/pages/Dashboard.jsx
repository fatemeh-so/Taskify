
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
  const { i18n } = useTranslation()
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

  const chartHeight = 300
  return (
    <div className='w-[100%] lg:pl-[7rem] lg:pr-4 px-4 overflow-h-auto md:overflow-hidden xl:h-[90vh] md:h-[100vh] h-[257%]'>
      <TaskReport />

    <InprogressTaskReports taskFilterInProgressive={taskFilterInProgressive}/>

      <div dir={i18n.language==="en"?'ltr':'rtl'} className='flex items-start flex-col md:flex-row gap-4 md:h-[30rem]'>
        <div className='w-full md:w-2/4'>
          <ProrityTaskCharts tasks={tasks} height={chartHeight} />
        </div>{' '}
        <div className='w-full md:w-2/4'>
          <WeeklyTaskDurationChart
            height={chartHeight}
            tasks={filter7lastDay}
          />
        </div>
        <div className='w-full md:w-2/4'>
          <StatusTaskChart tasks={tasks} height={chartHeight} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
