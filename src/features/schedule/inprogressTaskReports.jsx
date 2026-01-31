import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'phosphor-react'
import TaskReview from '../dashboard/TaskReview'
import { useTranslation } from 'react-i18next'
import { Card, CardHeader, CardBody, Button } from '@nextui-org/react'

function InprogressTaskReports({ taskFilterInProgressive }) {
  const { t } = useTranslation()

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
    <Card className='w-full mb-6 border-none' shadow='sm'>
      <CardHeader className='flex justify-between items-center px-6 py-4'>
        <h1 className='text-lg md:text-xl font-bold text-gray-800'>
          {t('InProgressReview')}
        </h1>
        <div className='flex gap-2'>
          <Button
            isIconOnly
            variant='light'
            radius='full'
            onClick={scrollLeft}
            aria-label='Scroll Left'
          >
            <ArrowLeft size={20} />
          </Button>
          <Button
            isIconOnly
            variant='light'
            radius='full'
            onClick={scrollRight}
            aria-label='Scroll Right'
          >
            <ArrowRight size={20} />
          </Button>
        </div>
      </CardHeader>
      <CardBody className='px-0 pb-4'>
        <div
          ref={scrollContainerRef}
          className='flex w-full overflow-x-auto gap-4 px-6 pb-2 scrollbar-hide'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {taskFilterInProgressive.length > 0 ? (
            taskFilterInProgressive.map((task) => (
              <div key={task.id} className='min-w-[280px]'>
                <TaskReview task={task} />
              </div>
            ))
          ) : (
            <div className='flex justify-center items-center w-full h-32 text-gray-500'>
              {t('noTask')}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default InprogressTaskReports
