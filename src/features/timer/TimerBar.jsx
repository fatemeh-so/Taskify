import { format } from 'date-fns'
import { Button, Input } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  addAll,
  addTaskName,
  resetTimer,
  startTimer,
  stopTimer,
} from './timerSlice'
import Spinner from '../../components/Spinner'
import useGetTimer from './useTimer'
import useAddTimer from './useAddTimer'
// import { openAddTask } from './taskSlice'

function TimerBar() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { mutate: addTimer, isLoading: isAddTimer } = useAddTimer()
  const { duration, taskName, startTime, endTime } = useSelector(
    (store) => store.timer
  )

  // Convert startTime to a time string starting from 00:00:00
  const convertDuration = new Date(duration * 1000).toISOString().substr(11, 8)

  useEffect(() => {
    let id
    if (open) {
      id = setInterval(() => {
        dispatch(
          startTimer({
            duration: duration + 1,
            startTime: new Date().toISOString(),
          })
        )
      }, 1000)
    }
    return () => {
      if (id) clearInterval(id)
    }
  }, [dispatch, duration, open])
  // let AllData
  async function start() {
    setOpen((o) => !o)

    if (open) {
      const endTimeValue = await new Date().toISOString()
      const all = { duration, taskName, startTime, endTime: endTimeValue }
      dispatch(stopTimer(endTimeValue))
      addTimer(all)
      console.log({ duration, taskName, startTime, endTimeValue })
      dispatch(resetTimer())
    }
  }
  if (isAddTimer ) return <Spinner />
  return (
    <div className='bg-[#ffffff] gap-6 flex max-w-full rounded-[1rem] mt-[1rem] ml-2 h-[3rem] md:h-[4rem] flex items-center justify-between px-4'>
      <Input
        type='text'
        placeholder={`what are you working on?`}
        value={taskName}
        variant='bordered'
        // className='w-1/4'
        onChange={(e) => {
          dispatch(addTaskName(e.target.value))
        }}
      />
      <div>
        <span>{convertDuration}</span>
      </div>
      <Button
        // onClick={openTask}
        color={!open ? 'primary' : 'danger'}
        className=' h-[2rem] font-semibold w-[3rem] md:w-[4.3rem] md:h-[2.4rem]'
        size='lg'
        onClick={start}
        // variant='underline'
        // color="#ffffff"
      >
        {open ? 'Stop' : 'Start'}
      </Button>
    </div>
  )
}

export default TimerBar
