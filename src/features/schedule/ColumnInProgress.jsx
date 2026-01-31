/* eslint-disable react/prop-types */
// Column.js
import SquareRow from './SquareRow'
import { Chip } from '@nextui-org/react'

function ColumnInProgress({ label, color, task }) {
  // Check if task and task.status are defined before calling toString
  const InProgressTask =
    task?.filter((task) => task?.status?.toString() === 'In Progress') || []

  // Mapping color prop to subtle background colors for the header/count chip
  const colorMap = {
    pink1: 'danger',
    blue1: 'primary',
    yellow: 'warning',
  }

  const chipColor = colorMap[color] || 'default'

  return (
    <div className='flex flex-col h-full flex-1 min-w-[300px]'>
      {/* Column Header */}
      <div className='flex items-center justify-between px-2 mb-4'>
        <div className='flex items-center gap-2'>
          <div className={`w-3 h-3 rounded-full bg-blue-500`}></div>
          <h3 className='font-bold text-gray-700 text-lg uppercase tracking-tight'>
            {label}
          </h3>
        </div>
        <Chip
          size='sm'
          variant='flat'
          color={chipColor}
          className='font-semibold'
        >
          {InProgressTask.length}
        </Chip>
      </div>

      {/* Task List */}
      <div className='flex-1 overflow-y-auto px-2 pb-4 scrollbar-hide'>
        {InProgressTask.length > 0 ? (
          <div className='flex flex-col gap-3'>
            {InProgressTask.map((task) => {
              return <SquareRow key={task.id} task={task} />
            })}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-xl text-gray-400'>
            <span className='text-sm font-medium'>No tasks yet</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ColumnInProgress
