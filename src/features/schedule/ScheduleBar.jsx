import { useState } from 'react'
import { format, addDays, subDays } from 'date-fns'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { Button } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { closeDateCal, openAddTask } from './taskSlice'
import App1 from './DatePicker'
import useGetTask from './useGetTask'
import Spinner from '../../components/Spinner'

function ScheduleBar() {
  const { data: task, isLoading: isTask } = useGetTask()

  const { close, status, datePickerStatus } = useSelector((store) => store.task)
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
    <div className='bg-[#ffffff] flex flex-col md:flex-row max-w-full rounded-[1rem] h-auto  items-center justify-between px-4 py-4'>
      <div className='flex items-center w-full justify-between md:justify-start'>
        <div className='flex-2 text-center md:text-left mb-2 md:mb-0'>
          <span className='sm:text-lg sm:font-bold text-1rem]'>
            {format(currentDate, 'MMMM dd, yyyy')}
          </span>
        </div>
        <div className='flex items-center'>
          <Button
            size='sm'
            isIconOnly
            onClick={handlePrevDay}
            className='hidden sm:flex bg-blue1 hover:bg-gray-40 font-bold mx-1 py-2 px-2 rounded-full'
          >
            <CaretLeft size={24} color='#0f0e0f' />
          </Button>
          <Button
            size='sm'
            isIconOnly
            onClick={handleNextDay}
            className='hidden sm:flex bg-blue1 hover:bg-gray-40 font-bold mx-1 py-2 px-2 rounded-full'
          >
            <CaretRight size={24} color='#0f0e0f' />
          </Button>{' '}
          <Button
            onClick={openTask}
            color='primary'
            className='md:hidden flex font-semibold text-[1rem] md:w-auto md:text-[1.1rem] h-9  mr-1 md:ml-2'
            variant='bordered'
            size='sm'
          >
            +Task
          </Button>
        </div>
      </div>
      <div className='flex mt-1 md:mt-0  md:flex-row justify-between items-center gap-2 md:gap-3 w-full md:w-auto'>
        <App1 />
        <Button
            onClick={openTask}
            color='primary'
            className='hidden md:flex font-semibold text-[1rem] md:w-auto md:text-[1.1rem] md:h-11 h-9  mr-1 md:ml-2'
            variant='bordered'
            size='sm'
          >
            +Task
          </Button>
        {datePickerStatus && (
          <Button
            color='primary'
            onClick={() => {
              dispatch(closeDateCal(false))
            }}
          >
            Show All
          </Button>
        )}
      </div>
    </div>
  )
}

export default ScheduleBar
