import { useState } from 'react'
import { format, addDays, subDays } from 'date-fns'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { Button } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { addDateCal, closeDateCal, openAddTask } from './taskSlice'
import App1 from './DatePicker'
import useGetTask from './useGetTask'
import Spinner from '../../components/Spinner'

function ScheduleBar() {
  const { data: task, isLoading: isTask } = useGetTask()

  const { close, status } = useSelector((store) => store.task)
  const [openSchedule, setOpenSchedule] = useState(false)
  const dispatch = useDispatch()
  const [currentDate, setCurrentDate] = useState(new Date())
  function openTask() {
    dispatch(openAddTask(true))
  }
  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1))
  }

  const handlePrevDay = () => {
    setCurrentDate(subDays(currentDate, 1))
  }
  if (isTask) return <Spinner />

  return (
    <div className='bg-[#ffffff] flex max-w-full rounded-[1rem] mt-[1rem] ml-2 h-[3rem] md:h-[4rem] flex items-center justify-between px-4'>
      <div className='flex items-center'>
        <div className='flex-1 text-center'>
          <span className='sm:text-lg sm:font-bold   text-sm '>
            {format(currentDate, 'MMMM dd, yyyy')}
          </span>
        </div>
        <Button
          size='sm'
          isIconOnly
          onClick={handlePrevDay}
          className='bg-blue1 hover:bg-gray-40  font-bold mx-2 py-2 px-2 rounded-full'
        >
          <CaretLeft size={24} color='#0f0e0f' />
        </Button>
        <Button
          size='sm'
          isIconOnly
          onClick={handleNextDay}
          className='bg-blue1 hover:bg-gray-40   font-bold mx-2 py-2 px-2 rounded-full'
        >
          <CaretRight size={24} color='#0f0e0f' />
        </Button>
      </div>
      <div className='flex items-center gap- sm:gap-3'>
        <App1 />
        <Button color='primary' onClick={()=>    dispatch(closeDateCal(false))
}>
          Show All
        </Button>
        <Button
          onClick={openTask}
          color='primary'
          className=' font-semibold w-[3rem] '
          variant='bordered'
          size='md'
        >
          + Add Task
        </Button>
      </div>
    </div>
  )
}

export default ScheduleBar
