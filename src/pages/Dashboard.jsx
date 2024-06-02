import React from 'react'
import CalenderSection from '../features/dashboard/CalenderSection'
import { Calendar } from '@nextui-org/react'
import { NoteBlank } from 'phosphor-react'
import useGetTask from '../features/schedule/useGetTask'
import Spinner from '../components/Spinner'
import TaskReport from '../features/dashboard/TaskReport'

function Dashboard() {
  const { data: task, isLoading: isTask } = useGetTask()

  const todoTask =
    task?.filter((task) => task?.status?.toString() === 'Not Started').length ||
    []
  console.log(todoTask)
  if (isTask) return <Spinner />

  return (
    <div className='h-[100%] w-[100%]'>
     <TaskReport/>
    </div>
  )
}

export default Dashboard
