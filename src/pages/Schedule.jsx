import { useDispatch, useSelector } from 'react-redux'
import { format, isValid } from 'date-fns'
import { Outlet } from 'react-router-dom'
import ColumnTodo from '../features/schedule/ColumnTodo'
import ColumnInProgress from '../features/schedule/ColumnInProgress'
import ScheduleBar from '../features/schedule/ScheduleBar'
import AddTask from '../features/schedule/AddTask'
import MobileTab from '../features/schedule/MobileTab'
import { CloseAddTask } from '../features/schedule/taskSlice'
import useGetTask from '../features/schedule/useGetTask'
import Spinner from '../components/Spinner'
import ColumnCompleted from '../features/schedule/ColumnCopmleted'
import useGetUser from '../features/auth/useGetUser'
import { useTranslation } from 'react-i18next'

function Schedule() {
  const { t } = useTranslation()
  const { close, dateCal, datePickerStatus } = useSelector(
    (store) => store.task
  )
  const dispatch = useDispatch()
  const { data: tasks, isLoading: isTask } = useGetTask()

  const { data: user, isLoading } = useGetUser()
  const task = tasks?.filter((task) => task.user_id === user.id)
  const filteredTasks = task?.filter((t) => {
    const taskDate = new Date(t.created_at)
    const selectedDate = new Date(dateCal)
    if (!isValid(taskDate) || !isValid(selectedDate)) {
      return false
    }
    return format(taskDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  })

  const tasksToDisplay = datePickerStatus
    ? filteredTasks?.length > 0
      ? filteredTasks
      : []
    : task

  function openTask() {
    dispatch(CloseAddTask(false))
  }

  if (isTask || isLoading) return <Spinner />

  return (
    <div className='relative lg:pl-28 z-10 h-screen w-full bg-[#f8f9fa] flex flex-col'>
      <AddTask onClose={openTask} close={close} />

      <div className='flex-none p-4 lg:pr-8 pt-6'>
        <ScheduleBar />
      </div>

      <div className='hidden md:flex flex-1 overflow-hidden px-4 lg:pr-8 pb-4'>
        <div className='hidden md:flex w-full h-full gap-6'>
          <ColumnTodo
            task={tasksToDisplay}
            label={t('notStarted')}
            color='pink1'
          />
          <ColumnInProgress
            task={tasksToDisplay}
            label={t('inProgress')}
            color='blue1'
          />
          <ColumnCompleted
            task={tasksToDisplay}
            label={t('completed')}
            color='yellow'
          />
        </div>
      </div>

      {/* for being responsive in mobile size */}
      <div className='md:hidden w-full flex-1'>
        <MobileTab />
      </div>
      <Outlet />
    </div>
  )
}

export default Schedule
