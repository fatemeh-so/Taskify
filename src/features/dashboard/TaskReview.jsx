/* eslint-disable react/prop-types */
import { Chip, Progress } from '@nextui-org/react'
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
    <div
      dir={isPersian ? 'rtl' : 'ltr'}
      className='border min-h-[250px] bg-white rounded-lg  p-4 flex-shrink-0 max-w-1/5'
    >
      <div className='flex  md:flex-row justify-between items-start md:items-center '>
        <h1 className='text-lg font-bold text-gray-800 px-1'>{task?.title}</h1>
        <div className='flex items-center py-2 md:mt-0'>
          <Chip size='sm' variant='flat' color={priorityColorChip}>
            {t(task?.priority)}
          </Chip>
        </div>
      </div>

      <div className='flex justify-between items-center py-2'>
        <div className='flex'>
          {categoryIcons[task?.category]}
          <span className='ml-2 text-lg text-gray-700'>
            {t(task?.category)}
          </span>
        </div>

        <span className='text-sm font-semibold text-gray-600'>
          {task?.duration
            ? new Date(task.duration * 1000).toISOString().substr(11, 8)
            : ''}
        </span>
      </div>

      <div className='bg-gray-50 p-4 rounded-lg'>
        <div className='mb-4'>
          <span className='text-gray-700'>{t('taskCompletion')}:</span>
          <span className='ml-2 text-gray-800 font-semibold'>
            {processValueLength}/{allProcess?.length}
          </span>
        </div>
        <Progress
          aria-label='Task completion'
          value={(processValueLength / allProcess?.length) * 100}
          className='max-w-full'
        />
      </div>

      <div className='mt-4'>
        <span className='text-sm text-gray-500'>
          {formattedDate} , {formattedTime}
        </span>
      </div>
    </div>
  )
}

export default TaskReview
