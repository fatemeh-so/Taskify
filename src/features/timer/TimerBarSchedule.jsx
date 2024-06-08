import { Button, Input } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  addTaskName,
  resetTimer,
  setOpen,
  startTimer,
  stopTimer,
} from './timerScheduleSlice'
import Spinner from '../../components/Spinner'
import useAddTimer from './useAddTimer'
import ScheduleTimer from './ScheduleTimer'
import useEditTask from '../schedule/useEditTask'
import toast from 'react-hot-toast'
import useGetTask from '../schedule/useGetTask'
import ScheduleSearchResult from './ScheduleSearchResult'
import useGetUser from '../auth/useGetUser'

function TimerBarSchedule() {
  const dispatch = useDispatch()
  const { mutate: addTimer, isLoading: isAddTimer } = useAddTimer()
  const { mutate: editTask, isLoading: isEditTask } = useEditTask()
  const { data: user, isLoading: isUser } = useGetUser()
  const [valueSearch, setValueSearch] = useState('')

  const { data: tasks, isLoading: isTask } = useGetTask()
const task=tasks?.filter(task=>task.user_id===user.id)
console.log(task);
  const { duration, taskName, startTime, open, taskId } = useSelector(
    (store) => store.timerSchedule
  )

  // Convert duration to a time string starting from 00:00:00
  const convertDuration = new Date(duration * 1000).toISOString().substr(11, 8)
  useEffect(() => {
    let id

    if (open) {
      id = setInterval(() => {
        dispatch(
          startTimer({
            duration: duration + 1,
            startTime: startTime || new Date().toISOString(),
          })
        )
      }, 1000)
    }
    return () => {
      if (id) clearInterval(id)
    }
  }, [dispatch, duration, open, startTime, taskName])

  const handleStartStop = async () => {
    if (!taskName) {
      toast.error('Select a schedule first')
      return
    }
    if (open) {
      const endTimeValue = new Date().toISOString()
      const curTask = task.find((task) => task.id === taskId)
      const curTaskDur = curTask.duration
      const all = {
        filter: 'schedule',
        duration,
        taskName,
        startTime,
        endTime: endTimeValue,
        created_at: startTime,
        user_id: user.id,
      }
      dispatch(stopTimer(endTimeValue))
      addTimer(all)
      editTask({ duration: curTaskDur + duration, id: taskId })
      dispatch(resetTimer())
      setValueSearch('')
    }
    dispatch(setOpen(!open))
  }
  console.log(taskName)
  if (isAddTimer || isEditTask || isTask || isUser) return <Spinner />

  return (
    <div className='bg-white gap-4 flex flex-wrap max-w-full rounded-xl mt-4 p-2 md:p-4 items-center justify-between shadow-md'>
      <div className='w-full'>
        <ScheduleSearchResult
          valueSearch={valueSearch}
          setValueSearch={setValueSearch}
        />
      </div>

      <Button
        color={!open ? 'secondary' : 'danger'}
        className='font-semibold min-w-[80px] md:min-w-[100px]'
        size='lg'
        onClick={handleStartStop}
      >
        {open ? 'Stop' : 'Start'}
      </Button>
      <div className='text-lg font-semibold'>{convertDuration}</div>
    </div>
  )
}

export default TimerBarSchedule
