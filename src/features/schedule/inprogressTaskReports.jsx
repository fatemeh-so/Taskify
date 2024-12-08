import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'phosphor-react'
import TaskReview from '../dashboard/TaskReview'
import { useTranslation } from 'react-i18next'

function InprogressTaskReports({taskFilterInProgressive}) {
  const { t, i18n } = useTranslation()

  const scrollContainerRef = useRef(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' })
    }
  }
  return (
    <div className='relative min-h-[18rem] bg-white rounded-lg'>
      <div className='flex justify-between items-center px-4 pt-4'>
        <h1 className='text-lg md:text-lg lg:text-xl pb-2 font-bold text-gray-800'>
          {t('InProgressReview')}
        </h1>
        <div className='gap-2 flex'>
          <button
            className='rounded-full border p-2 hover:bg-blue-100'
            onClick={scrollLeft}
            aria-label='Scroll Left'
          >
            <ArrowLeft size={24} />
          </button>
          <button
            className='rounded-full border p-2 hover:bg-blue-100'
            onClick={scrollRight}
            aria-label='Scroll Right'
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className='flex w-full overflow-x-hidden gap-2 justify-start items-start px-4 pb-4 '
      >
        {taskFilterInProgressive.length > 0 ? (
          taskFilterInProgressive.map((task) => (
            <TaskReview key={task.id} task={task} />
          ))
        ) : (
          <div className='flex justify-center items-center w-full h-32 text-gray-500'>
            {t('noTask')}
          </div>
        )}
      </div>
    </div>
  )
}

export default InprogressTaskReports
