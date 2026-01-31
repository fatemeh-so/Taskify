/* eslint-disable react/prop-types */
import {
  Checkbox,
  Chip,
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from '@nextui-org/react'
import { format } from 'date-fns-jalali'

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
  Clock,
} from 'phosphor-react'
import useDeleteTask from './useDeleteTask'
import Spinner from '../../components/Spinner'
import { useDispatch } from 'react-redux'
import EditTaskModal from './EditTaskModal'
import { editTask } from './taskSlice'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function SquareRow({ task }) {
  const { t, i18n } = useTranslation()
  const { mutate: deleteTask, isLoading: isDelete } = useDeleteTask()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const priorityColorsChip = {
    Low: 'success',
    Medium: 'secondary',
    High: 'warning',
    Urgent: 'danger',
  }

  const categoryIcons = {
    Work: <Briefcase size={18} />,
    Personal: <User size={18} />,
    Study: <BookOpen size={18} />,
    Fitness: <DribbbleLogo size={18} />,
    Family: <Heart size={18} />,
    Health: <Heartbeat size={18} />,
    Finance: <Wallet size={18} />,
    Travel: <Airplane size={18} />,
    Hobbies: <Palette size={18} />,
    Social: <UsersThree size={18} />,
  }

  const priorityColorChip = priorityColorsChip[task?.priority] || 'default'

  const createdAtDate = task?.created_at ? new Date(task.created_at) : null
  const isPersian = i18n.language === 'fa'
  const formattedDate = !isPersian
    ? createdAtDate
      ? createdAtDate.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        })
      : ''
    : format(createdAtDate, 'd MMMM')

  const formattedTime = createdAtDate
    ? createdAtDate.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : ''

  function editTaskHandler(id) {
    dispatch(editTask(id))
    navigate(`/schedule/${id}`)
  }

  if (isDelete) return <Spinner />

  return (
    <Card
      className='w-full mb-3 border-none hover:scale-[1.02] transition-transform duration-200'
      shadow='sm'
    >
      <CardHeader className='flex justify-between items-start px-4 pt-4 pb-0'>
        <div className='flex flex-col gap-1 items-start max-w-[70%]'>
          <div className='flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider'>
            {categoryIcons[task?.category]}
            <span>{t(task?.category)}</span>
          </div>
          <h4 className='text-md font-bold text-gray-800 line-clamp-2 text-left'>
            {task?.title}
          </h4>
        </div>
        <Chip
          color={priorityColorChip}
          size='sm'
          variant='flat'
          className='capitalize border-none'
        >
          {t(task.priority)}
        </Chip>
      </CardHeader>

      <CardBody className='px-4 py-3'>
        <div className='flex flex-col gap-2'>
          {task?.description?.map((desc, index) => (
            <Checkbox
              key={index}
              defaultSelected={desc?.completed}
              lineThrough
              size='sm'
              color={
                priorityColorChip === 'default' ? 'primary' : priorityColorChip
              }
              classNames={{
                label: 'text-gray-600 text-sm',
              }}
            >
              {desc.text}
            </Checkbox>
          ))}
        </div>
      </CardBody>

      <CardFooter className='flex justify-between items-center px-4 py-3 border-t border-gray-100 bg-gray-50/50'>
        <div className='flex items-center gap-1 text-gray-400 text-xs'>
          <Clock size={14} />
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{formattedTime}</span>
          {task?.duration > 0 && (
            <>
              <span className='ml-1'>•</span>
              <span className='font-medium text-gray-600'>
                {new Date(task.duration * 1000).toISOString().substr(11, 8)}
              </span>
            </>
          )}
        </div>

        <div className='flex gap-1'>
          <Tooltip content={t('edit')}>
            <Button
              isIconOnly
              size='sm'
              variant='light'
              color='primary'
              onClick={() => editTaskHandler(task.id)}
            >
              <Pencil size={18} />
            </Button>
          </Tooltip>
          <Tooltip content={t('delete')} color='danger'>
            <Button
              isIconOnly
              size='sm'
              variant='light'
              color='danger'
              onClick={() => deleteTask(task.id)}
            >
              <Trash size={18} />
            </Button>
          </Tooltip>
          {/* <EditTaskModal task={task} /> REMOVED: Handled by Route */}
        </div>
      </CardFooter>
    </Card>
  )
}

export default SquareRow
