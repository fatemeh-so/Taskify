import { DatePicker } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { addDateCal, closeDateCal } from './taskSlice'
import useGetTask from './useGetTask'
import Spinner from '../../components/Spinner'

export default function App1() {
  const { dateCal } = useSelector((store) => store.task)
  const dispatch = useDispatch()

  function handleCal(value) {
    dispatch(addDateCal(value))
    dispatch(closeDateCal(true))

  }

  const { data: task, isLoading: isTask } = useGetTask()

  if (isTask) return <Spinner />


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
      </div>
    </div>
  )
}
