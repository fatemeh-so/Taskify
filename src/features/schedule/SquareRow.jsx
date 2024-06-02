import { Checkbox, Chip, Tooltip } from '@nextui-org/react'
import {
  Briefcase,
  User,
  BookOpen,
  DribbbleLogo,
  Heart,
  Wallet,
  Airplane,
  Palette,
  UsersThree,
  Heartbeat,
  Trash,
  Pencil,
} from 'phosphor-react'
import useDeleteTask from './useDeleteTask'
import Spinner from '../../components/Spinner'
import { useDispatch } from 'react-redux'
import EditTaskModal from './EditTaskModal'
import { editTask } from './taskSlice'
import { useNavigate, useSearchParams } from 'react-router-dom'

/* eslint-disable react/prop-types */
function SquareRow({ task }) {
  const { mutate: deleteTask, isLoading: isDelete } = useDeleteTask()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const priorityColorsChip = {
    Low: 'success',
    Medium: 'secondary',
    High: 'warning',
    Urgent: 'danger',
  }

  const categoryIcons = {
    Work: <Briefcase size={20} />,
    Personal: <User size={20} />,
    Study: <BookOpen size={20} />,
    Fitness: <DribbbleLogo size={28} color='#f4ecf4' />,
    Family: <Heart size={20} />,
    Health: <Heartbeat size={28} color='#f4ecf4' />,
    Finance: <Wallet size={20} />,
    Travel: <Airplane size={20} />,
    Hobbies: <Palette size={20} />,
    Social: <UsersThree size={20} />,
  }

  const priorityColorChip = priorityColorsChip[task?.priority] || 'gray'

  const createdAtDate = task?.created_at ? new Date(task.created_at) : null
  const formattedDate = createdAtDate
    ? createdAtDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''
  const formattedTime = createdAtDate
    ? createdAtDate.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''

  function editTaskHandler(id) {
    dispatch(editTask(id))
    navigate(`/schedule/${id}`)
  }

  if (isDelete) return <Spinner />

  return (
    <div className='p-4 overflow-x-hidden bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300 ease-in-out'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4'>
        <div className='font-bold  sm:text-xl md:text-lg text-gray-800 mb-2 sm:mb-0' style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
          <span>{task?.title}</span>
        </div>
        <div className='flex items-center gap-3'>
          <span className='text-sm sm:text-base text-gray-600'>
            {task?.duration ? new Date(task.duration * 1000).toISOString().substr(11, 8) : ''}
          </span>
          <Chip color={priorityColorChip} size='sm' variant='flat'>
            {task.priority}
          </Chip>
        </div>
      </div>
      <div className='border p-4 rounded-lg bg-gray-50'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center' style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
            {categoryIcons[task?.category]}
            <span className='ml-3 text-gray-700 text-lg'>{task?.category}</span>
          </div>
        </div>
        <div className='text-gray-700'>
          {task?.description?.map((desc, index) => (
            <div key={index} className='flex justify-start mt-2 mb-2'>
              <Checkbox lineThrough defaultSelected={desc?.completed}>
                <span className='ml-3' style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  {desc.text}
                </span>
              </Checkbox>
            </div>
          ))}
        </div>
      </div>
      {createdAtDate && (
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 pt-4 border-t text-sm text-gray-500'>
          <span style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
            {formattedDate}, {formattedTime}
          </span>
          <div className='flex gap-4 mt-2 sm:mt-0'>
            <Tooltip content='Edit'>
              <Pencil
                onClick={() => editTaskHandler(task.id)}
                size={20}
                className='cursor-pointer hover:text-blue-500 transition-colors duration-200'
              />
            </Tooltip>
            <Tooltip content='Delete'>
              <Trash
                onClick={() => deleteTask(task.id)}
                size={20}
                className='cursor-pointer hover:text-red-500 transition-colors duration-200'
              />
            </Tooltip>
            <EditTaskModal task={task} />
          </div>
        </div>
      )}
    </div>
  )
}

export default SquareRow
