import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'phosphor-react'
import useGetTask from '../features/schedule/useGetTask'
import Spinner from '../components/Spinner'
import TaskReport from '../features/dashboard/TaskReport'
import TaskReview from '../features/dashboard/TaskReview'
import ProrityTaskCharts from '../features/dashboard/ProrityTaskCharts'
import StatusTaskChart from '../features/dashboard/StatusTaskChart'
import { isThisWeek } from 'date-fns'
import WeeklyTaskDurationChart from './WeeklyTaskDurationChart'
import useGetTimer from '../features/timer/useTimer'
import useGetUser from '../features/auth/useGetUser'
import { useTranslation } from 'react-i18next'

function Dashboard() {
  const { t } = useTranslation()
  const { data: task, isLoading: isTask } = useGetTask()
  const { data: timerDatas, isLoading } = useGetTimer()
  const { data: user, isLoading: isUser } = useGetUser()

  const scrollContainerRef = useRef(null)
  const timerData = timerDatas?.filter((task) => task?.user_id === user?.id)
  const tasks = task?.filter((task) => task.user_id === user.id)
  const taskFilterInProgressive = tasks?.filter(
    (task) => task?.status === 'In Progress'
  )
  const filter7lastDay = timerData?.filter((t) =>
    isThisWeek(new Date(t?.created_at))
  )

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' })
    }
  }

  if (isTask || isLoading || isUser) return <Spinner />

  const chartHeight = 300
  return (
    <div className='w-[100%] lg:pl-[7rem] lg:pr-4 px-4 overflow-h-auto md:overflow-hidden xl:h-[90vh] md:h-[100vh] h-[257%]'>
      <TaskReport />

      <div className='relative min-h-[18rem] bg-white rounded-lg'>
        <div className='flex justify-between items-center px-4 pt-4'>
          <h1 className='text-lg md:text-lg lg:text-xl pb-2 font-bold text-gray-800'>
            {t('InProgressReview')}
          </h1>
          <div className='gap-2 flex'>
            <button
              className='rounded-full border p-2 hover:bg-blue-100'
              onClick={scrollLeft}
              aria-label='Scroll Left'
            >
              <ArrowLeft size={24} />
            </button>
            <button
              className='rounded-full border p-2 hover:bg-blue-100'
              onClick={scrollRight}
              aria-label='Scroll Right'
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          className='flex w-full overflow-x-hidden gap-2 justify-start items-start px-4 pb-4 '
        >
          {taskFilterInProgressive.length > 0 ? (
            taskFilterInProgressive.map((task) => (
              <TaskReview key={task.id} task={task} />
            ))
          ) : (
            <div className='flex justify-center items-center w-full h-32 text-gray-500'>
              {t('noTask')}
            </div>
          )}
        </div>
      </div>

      <div className='flex items-start flex-col md:flex-row gap-4 md:h-[30rem]'>
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
