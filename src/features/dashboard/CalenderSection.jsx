import React from 'react'
import { Calendar } from '@nextui-org/react'
import { parseDate } from '@internationalized/date'

export default function CalenderSection() {
  let [value, setValue] = React.useState(parseDate('2024-03-07'))

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='flex'>
        {' '}
        <Calendar
          // calendarWidth="100%"
          aria-label='Date (Controlled)'
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  )
}
