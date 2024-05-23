import React, { useState } from 'react'
import { format, addDays, subDays } from 'date-fns'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { Button } from '@nextui-org/react'

function ScheduleBar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1))
  }

  const handlePrevDay = () => {
    setCurrentDate(subDays(currentDate, 1))
  }

  return (
    <div className='bg-[#ffffff] flex max-w-full rounded-[1rem] mt-[1rem] ml-2 h-[3rem] md:h-[4rem] flex items-center justify-between px-4'>
      <div className='flex items-center'>
        <div className='flex-1 text-center'>
          <span className='sm:text-lg font-bold text-[1rem] '>
            {format(currentDate, 'MMMM dd, yyyy')}
          </span>
        </div>{' '}
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
      <div className='flex'>
        <Button color='primary' className="h-[2rem] w-[3rem] md:w-[4.3rem] md:h-[2.4rem]" variant='bordered' size=''>
          + Add Task
        </Button>
      </div>
    </div>
  )
}

export default ScheduleBar
