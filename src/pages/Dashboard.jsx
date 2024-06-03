import React from 'react'
import CalenderSection from '../features/dashboard/CalenderSection'
import { Calendar } from '@nextui-org/react'
import { NoteBlank } from 'phosphor-react'
import useGetTask from '../features/schedule/useGetTask'
import Spinner from '../components/Spinner'
import TaskReport from '../features/dashboard/TaskReport'
import TaskReview from '../features/dashboard/TaskReview'

function Dashboard() {
  const { data: task, isLoading: isTask } = useGetTask()

  if (isTask) return <Spinner />

  return (
    <div className='w-[100%]'>
      <TaskReport />
      <div className='h-[60vh]'>
        <TaskReview />
      </div>
    </div>
  )
}

export default Dashboard
