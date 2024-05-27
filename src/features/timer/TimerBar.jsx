import { format } from 'date-fns'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { Button, Input } from '@nextui-org/react'
// import { openAddTask } from './taskSlice'

function TimerBar() {
  return (
    <div className='bg-[#ffffff] gap-6 flex max-w-full rounded-[1rem] mt-[1rem] ml-2 h-[3rem] md:h-[4rem] flex items-center justify-between px-4'>
      <Input type='text' placeholder={`what are you work on?`} />
      <div>
        <span>00:00</span>
      </div>
      <Button
        //   onClick={openTask}
        color='primary'
        className=' h-[2rem] font-semibold w-[3rem] md:w-[4.3rem] md:h-[2.4rem]'
        size='lg'
        // color="#ffffff"
      >
        Start
      </Button>
    </div>
  )
}

export default TimerBar
