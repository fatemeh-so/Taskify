import React, { useRef, useMemo } from 'react'
import { ArrowLeft, ArrowRight } from 'phosphor-react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import useGetTask from '../features/schedule/useGetTask'
import Spinner from '../components/Spinner'
import TaskReport from '../features/dashboard/TaskReport'
import TaskReview from '../features/dashboard/TaskReview'
import ProrityTaskCharts from '../features/dashboard/ProrityTaskCharts'
import PriorityTasksChart from '../features/dashboard/PriorityTasksChart'
import StatusTaskChart from '../features/dashboard/StatusTaskChart'

function Dashboard() {
  const { data: tasks, isLoading: isTask } = useGetTask()
  const scrollContainerRef = useRef(null)

  if (isTask) return <Spinner />

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
    <div className='w-auto px-4 overflow-h-auto'>
      <TaskReport />

      <div className='relative bg-white rounded-lg '>
        <div className='flex h-[4rem] justify-between items-center mt-4 p-4'>
          <h1 className='text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mt-5'>
            In Progress Review
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
          className='flex  overflow-x-hidden  gap-2  justify-start items-start pb-4 px-4 '
        >
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskReview key={task.id} task={task} />)
          ) : (
            <div className='flex justify-center items-center w-full h-32 text-gray-500'>
              No tasks to display
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-4 md:h-[30rem]  '>
        <div className='w-full md:w-2/4 md:h-[5vh] md:mb-[1rem]'>
          <ProrityTaskCharts height={300} />
        </div>
        <div className='w-full md:w-2/4 md:h-[5vh] md:mb-[1rem]'>
        <StatusTaskChart height={300} />
        </div>
        <div className='w-full md:w-2/4 md:h-[5vh] md:mb-[1rem]'>
        <PriorityTasksChart height={300} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
