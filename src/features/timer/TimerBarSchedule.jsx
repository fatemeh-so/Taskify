import { Button, Input } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
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

function TimerBarSchedule() {
  const dispatch = useDispatch()
  const { mutate: addTimer, isLoading: isAddTimer } = useAddTimer()
  const { mutate: editTask, isLoading: isEditTask } = useEditTask()
  const { data: task, isLoading: isTask } = useGetTask()

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
      }
      dispatch(stopTimer(endTimeValue))
      addTimer(all)
      editTask({ duration: curTaskDur + duration, id: taskId })
      dispatch(resetTimer())
    }
    dispatch(setOpen(!open))
  }

  if (isAddTimer || isEditTask || isTask) return <Spinner />

  return (
    <div className='bg-white gap-4 flex flex-wrap max-w-full rounded-xl mt-4 p-2 md:p-4 items-center justify-between shadow-md'>
      <Input
      disabled
        type='text'
        placeholder={`select your task ...`}
        value={taskName}
        variant='bordered'
        className='flex-grow min-w-[200px]'
        readOnly
      />

      <Button
        color={!open ? 'secondary' : 'danger'}
        className='font-semibold min-w-[80px] md:min-w-[100px]'
        size='lg'
        onClick={handleStartStop}
      >
        {open ? 'Stop' : 'Start'}
      </Button>
      <div className='text-lg font-semibold'>{convertDuration}</div>
      <ScheduleTimer />
    </div>
  )
}

export default TimerBarSchedule
