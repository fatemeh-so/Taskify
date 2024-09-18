import {  XCircle } from 'phosphor-react'
import AddTaskContenet from './AddTaskContenet'

function AddTask({ onClose }) {

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-full flex justify-end transition-opacity duration-300 `}
    >
      <div className='flex pr-[2rem]  overflow-y-auto overflow-x-hidden flex-col bg-[#ffffff] w-full md:w-3/4 xl:w-1/3'>
        <button onClick={onClose} className='self-start px-4 pt-4 text-white'>
          <XCircle size={32} color='#1ca1fa' />
        </button>
        <AddTaskContenet />
      </div>
    </div>
  )
}

export default AddTask
