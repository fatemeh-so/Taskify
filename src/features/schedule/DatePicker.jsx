import React from 'react'
import { DatePicker } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { addDateCal, closeDateCal } from './taskSlice'
import useGetTask from './useGetTask'
import Spinner from '../../components/Spinner'
import { format, isValid } from 'date-fns'

export default function App1() {
  const { dateCal,datePickerStatus } = useSelector((store) => store.task)
  const dispatch = useDispatch()

  function handleCal(value) {
    dispatch(addDateCal(value))
    dispatch(closeDateCal(true))

  }

  const { data: task, isLoading: isTask } = useGetTask()

  if (isTask) return <Spinner />

  const filteredTasks = task.filter((t) => {
    const taskDate = new Date(t.created_at)
    const selectedDate = new Date(dateCal)
    if (!isValid(taskDate) || !isValid(selectedDate)) {
      return false
    }
    return format(taskDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  })


  return (
    <div className='w-full'>
      <DatePicker
      fullWidth={true}
        size='sm'
        color='secondary'
        variant='bordered'
        label='Filter by date'
        className='w-full h-[rem]'
        onChange={handleCal}
        value={dateCal}
      />
      <div>
        {/* {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id}>
              <div>{task.name}</div>
            </div>
          ))
        ) : (
          <div>No tasks for this date.</div>
        )} */}
      </div>
    </div>
  )
}
