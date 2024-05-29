import React from 'react'
import { DatePicker } from '@nextui-org/react'
import { now, parseAbsoluteToLocal } from '@internationalized/date'
import { useDispatch, useSelector } from 'react-redux'
import { changeDate } from './timerSlice'

export default function DatePickerTimer() {
  const dispatch = useDispatch()
  const { currentDate } = useSelector((store) => store.timer)

  const now = new Date().toISOString()

  let [date, setDate] = React.useState(parseAbsoluteToLocal(now))
  console.log(date)
  function handel() {
    dispatch(changeDate(date))
  }
  return (
    <div className='w-[99%] bg-[#ffffff] mx-2  mt-4 flex flex-col gap-4'>
      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
        <DatePicker
          variant='bordered'
          granularity='day'
          label='Date'
          value={date}
          onChange={() => {
            setDate
            handel()
          }}
        />
      </div>
    </div>
  )
}
