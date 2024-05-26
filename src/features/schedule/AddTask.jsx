import { ArrowCircleLeft } from 'phosphor-react'
import AddTaskContenet from './AddTaskContenet'

function AddTask({ onClose }) {
  return (
    <div
      className={`fixed  top-0 left-0 z-50 w-full h-full flex justify-end transition-opacity duration-300 `}
    >
      <div className='flex pr-[2rem] overflow-y-auto overflow-x-hidden flex-col bg-[#ffffff] w-3/4 md:w-3/4 xl:w-1/3'>
        <button onClick={onClose} className='self-start mr-2 m-2 text-white'>
          <ArrowCircleLeft size={28} color='#9cd5fb' />
        </button>
        <AddTaskContenet />
      </div>
    </div>
  )
}

export default AddTask
