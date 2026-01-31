/* eslint-disable react/prop-types */
import { Chip, Progress, Card, CardBody } from '@nextui-org/react'
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
} from 'phosphor-react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns-jalali'

function TaskReview({ task }) {
  const { t, i18n } = useTranslation()
  const processValueLength = task?.description?.filter(
    (task) => task?.completed === true
  )?.length
  const allProcess = task?.description?.map((task) => task.text)

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
  const createdAtDate = task?.created_at ? new Date(task?.created_at) : null
  const isPersian = i18n.language === 'fa'
  const formattedDate = !isPersian
    ? createdAtDate
      ? createdAtDate.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : ''
    : format(createdAtDate, 'yyyy , d MMMM ')

  const formattedTime = createdAtDate
    ? createdAtDate.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Ensures 24-hour format without AM/PM
      })
    : ''

  return (
    <Card
      dir={isPersian ? 'rtl' : 'ltr'}
      className='bg-white rounded-xl shadow-sm border border-gray-100'
    >
      <CardBody className='p-4'>
        <div className='flex justify-between items-start mb-3'>
          <h1 className='text-lg font-bold text-gray-800 line-clamp-1'>
            {task?.title}
          </h1>
          <Chip size='sm' variant='flat' color={priorityColorChip}>
            {t(task?.priority)}
          </Chip>
        </div>

        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center text-gray-600'>
            {categoryIcons[task?.category]}
            <span className='ml-2 text-sm font-medium'>
              {t(task?.category)}
            </span>
          </div>

          <span className='text-sm font-mono text-gray-500'>
            {task?.duration
              ? new Date(task.duration * 1000).toISOString().substr(11, 8)
              : ''}
          </span>
        </div>

        <div className='bg-gray-50 p-3 rounded-lg mb-4'>
          <div className='flex justify-between text-xs mb-2'>
            <span className='text-gray-500'>{t('taskCompletion')}:</span>
            <span className='font-semibold text-gray-700'>
              {processValueLength}/{allProcess?.length}
            </span>
          </div>
          <Progress
            size='sm'
            aria-label='Task completion'
            value={(processValueLength / allProcess?.length) * 100}
            className='max-w-full'
            color={
              processValueLength === allProcess?.length ? 'success' : 'primary'
            }
          />
        </div>

        <div className='flex items-center text-xs text-gray-400'>
          <span>
            {formattedDate} , {formattedTime}
          </span>
        </div>
      </CardBody>
    </Card>
  )
}

export default TaskReview
