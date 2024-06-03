import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'
import useGetTask from '../schedule/useGetTask'
import Spinner from '../../components/Spinner'
import { useDispatch } from 'react-redux'
import { addTaskId, addTaskName } from './timerScheduleSlice'
import { openAddTask } from '../schedule/taskSlice'
import { useNavigate } from 'react-router-dom'

function ScheduleSearchResult({ valueSearch, setValueSearch }) {
  const [close1, setClose] = useState(false)
  const { data: tasks, isLoading: isTaskLoading } = useGetTask()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSearchResult(e) {
    setValueSearch(e.target.value)
    setClose(false)
  }

  const filteredTasks = tasks?.filter((task) =>
    task.title.toLowerCase().includes(valueSearch.toLowerCase())
  )

  function handelAddTaskName(n, id) {
    dispatch(addTaskName(n))
    dispatch(addTaskId(id))
    setValueSearch(n)
    setClose(true)
  }

  function openTask() {
    dispatch(openAddTask(true))
    navigate("/schedule")
  }

  const priorities = [
    { id: 1, name: 'Low', color: 'text-green-500' },
    { id: 2, name: 'Medium', color: 'text-yellow-500' },
    { id: 3, name: 'High', color: 'text-red-500' },
    { id: 4, name: 'Urgent', color: 'text-purple-500' },
  ]

  if (isTaskLoading) return <Spinner />

  return (
    <div className='flex flex-col w-full'>
      <Input
        onChange={handleSearchResult}
        type='text'
        placeholder='Select your task ...'
        value={valueSearch}
        variant='bordered'
        className='flex-grow min-w-[200px]'
        endContent={
          <div
            onClick={() => {
              setClose(true)
            }}
            className='cursor-pointer'
          >
            x
          </div>
        }
      />
      {!close1 && valueSearch && (
        <div className='w-full my-[.1rem] bg-white rounded h-auto shadow-md'>
          {filteredTasks?.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handelAddTaskName(task.title, task.id)}
                className='border-b flex gap-2 p-2 cursor-pointer hover:bg-slate-100 transition duration-200'
              >
                <div className='flex-1'>
                  <span className='font-semibold'>{task.title}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span>
                    {task.status === 'Not Started' ? (
                      <div className='flex gap-1 items-center'>
                        <div className='rounded-full w-2 h-2 bg-pink-200'></div>
                        Todo
                      </div>
                    ) : (
                      <div className='flex gap-1 items-center'>
                        <div className='rounded-full w-2 h-2 bg-yellow-200'></div>
                        In Progress
                      </div>
                    )}
                  </span>
                  <span className={`font-mono ${priorities.find(p => p.name === task.priority)?.color}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className='p-2 text-gray-500'>No tasks found.</p>
          )}
          <div className='text-center'> <Button
            className='mx-2 my-2 text-center'
            auto
            size='sm'
            color='primary'
            onClick={openTask}
          >
            Add New Task
          </Button></div>
         
        </div>
      )}
    </div>
  )
}

export default ScheduleSearchResult
