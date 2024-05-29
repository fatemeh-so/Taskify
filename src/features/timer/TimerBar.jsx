import { format } from 'date-fns'
import { Button, Input } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  addTaskName,
  resetTimer,
  setOpen,
  startTimer,
  stopTimer,
} from './timerSlice'
import Spinner from '../../components/Spinner'
import useAddTimer from './useAddTimer'

function TimerBar() {
  const dispatch = useDispatch()
  const { mutate: addTimer, isLoading: isAddTimer } = useAddTimer()
  const { duration, taskName, startTime, open } = useSelector((store) => store.timer)

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
  }, [dispatch, duration, open, startTime])

  const handleStartStop = async () => {
    if (open) {
      const endTimeValue = new Date().toISOString()
      const all = { duration, taskName, startTime, endTime: endTimeValue, created_at: startTime }
      dispatch(stopTimer(endTimeValue))
      addTimer(all)
      dispatch(resetTimer())
    }
    dispatch(setOpen(!open))
  }
// console.log(open);
  if (isAddTimer) return <Spinner />

  return (
    <div className='bg-[#ffffff] gap-6 flex max-w-full rounded-[1rem] mt-[1rem] ml-2 h-[3rem] md:h-[4rem] items-center justify-between px-4'>
      <Input
        type='text'
        placeholder={`What are you working on?`}
        value={taskName}
        variant='bordered'
        onChange={(e) => {
          dispatch(addTaskName(e.target.value))
        }}
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
    </div>
  )
}

export default TimerBar
