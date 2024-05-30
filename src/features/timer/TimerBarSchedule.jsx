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
  const { data: task, isLoading: isTask } = useGetTask();

  const { duration, taskName, startTime, open, taskId } = useSelector(
    (store) => store.timerSchedule
  )

  // Convert duration to a time string starting from 00:00:00
  const convertDuration = new Date(duration * 1000).toISOString().substr(11, 8)
  useEffect(() => {
    let id
   
    if (open ) {
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
      toast.error("select schedule first")
      return
    }
    if (open) {
      const endTimeValue = new Date().toISOString()
      const curTask=task.find(task=>task.id===taskId)
      const curTaskDur=curTask.duration
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
      editTask({ duration:curTaskDur+duration, id: taskId })
      dispatch(resetTimer())
    }
    dispatch(setOpen(!open))
  }
  // console.log(taskName);
  if (isAddTimer || isEditTask||isTask) return <Spinner />

  return (
    <div className='bg-[#ffffff] gap-6 flex max-w-full mr-4 rounded-[1rem] mt-[1rem] ml-2 h-[3rem] md:h-[4rem] items-center justify-between px-4'>
      <Input
        type='text'
        placeholder={`What are you working on?`}
        value={taskName}
        variant='bordered'
        // onChange={(e) => {
        //   dispatch(addTaskName(e.target.value))
        // }}
      />
      <div>
        <span>{convertDuration}</span>
      </div>
      <Button
        color={!open ? 'primary' : 'danger'}
        className='h-[2rem] font-semibold w-[3rem] md:w-[4.3rem] md:h-[2.4rem]'
        size='lg'
        onClick={handleStartStop}
      >
        {open ? 'Stop' : 'Start'}
      </Button>
      <ScheduleTimer />
    </div>
  )
}

export default TimerBarSchedule
