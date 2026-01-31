/* eslint-disable react/prop-types */
import { useState } from 'react'
import { format } from 'date-fns'
import { format as formatJalali } from 'date-fns-jalali'
import { Button } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { closeDateCal, openAddTask } from './taskSlice'
import useGetTask from './useGetTask'
import Spinner from '../../components/Spinner'
import { useTranslation } from 'react-i18next'
import FilterTaskByDate from './DatePicker'
import { Plus, X } from 'phosphor-react'

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
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-6 gap-4'>
      <div className='flex flex-col'>
        <p className='text-gray-500 font-normal text-lg'>
          {i18n.language == 'en'
            ? format(currentDate, 'MMMM dd, yyyy')
            : formatJalali(currentDate, ' yyyy,dd MMMM')}
        </p>
      </div>

      <div className='flex items-center gap-3 w-full md:w-auto'>
        <div className='flex-1 md:flex-none'>
          <FilterTaskByDate />
        </div>

        <Button
          onClick={openTask}
          color='primary'
          className='font-semibold'
          startContent={<Plus size={18} weight='bold' />}
          size='md'
          radius='md'
        >
          {t('addTask', { defaultValue: 'Add Task' })}
        </Button>

        {datePickerStatus && (
          <Button
            isIconOnly
            color='danger'
            variant='flat'
            onClick={() => {
              dispatch(closeDateCal(false))
            }}
          >
            <X size={18} weight='bold' />
          </Button>
        )}
      </div>
    </div>
  )
}

export default ScheduleBar
