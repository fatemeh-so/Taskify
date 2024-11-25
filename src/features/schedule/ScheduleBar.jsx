import { useState } from 'react'
import { format} from 'date-fns'
import { format as formatJalali } from 'date-fns-jalali'
import { Button } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { closeDateCal, openAddTask } from './taskSlice'
import useGetTask from './useGetTask'
import Spinner from '../../components/Spinner'
import { useTranslation } from 'react-i18next'
import FilterTaskByDate from './DatePicker'

function ScheduleBar() {
  const { t, i18n } = useTranslation()
  const { data: task, isLoading: isTask } = useGetTask()

  const { datePickerStatus } = useSelector((store) => store.task)
  const dispatch = useDispatch()
  const [currentDate, setCurrentDate] = useState(new Date())

  function openTask() {
    dispatch(openAddTask(true))
  }

  if (isTask) return <Spinner />

  return (
    <div className='bg-[#ffffff] flex flex-col gap-2 md:gap-0 md:flex-row max-w-full rounded-[1rem] h-auto  items-center justify-between px-4 py-4'>
      <div className='flex items-center w-full justify-between md:justify-start'>
        <div className='flex-2  text-center md:text-left mb-2 md:mb-0'>
          <span  className='sm:text-lg sm:font-semibold text-[1rem]'>
            {i18n.language == 'en'
              ? format(currentDate, 'MMMM dd, yyyy')
              : formatJalali(currentDate, ' yyyy,dd MMMM')}
          </span>
        </div>
        <div className='flex items-center'>
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
        <FilterTaskByDate />
        <Button
          onClick={openTask}
          color='primary'
          className='hidden md:flex font-semibold text-[1rem] md:w-auto md:text-[1.1rem] md:h-11 h-9  mr-1 md:ml-2'
          variant='bordered'
          size='sm'
        >
          +{t('task')}
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
