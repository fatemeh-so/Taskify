import { Input } from '@nextui-org/react'
import { useState } from 'react'
import useGetTask from '../schedule/useGetTask'
import Spinner from '../../components/Spinner'
import { useDispatch } from 'react-redux'
import { addTaskId, addTaskName } from './timerScheduleSlice'

function ScheduleSearchResult({valueSearch,setValueSearch}) {
  // const [valueSearch, setValueSearch] = useState('')
  const[close1,setClose]=useState(false)
  const { data: tasks, isLoading: isTaskLoading } = useGetTask()
  const dispatch = useDispatch()
  function handleSearchResult(e) {
    setValueSearch(e.target.value)
    setClose(false)
  }
  // Filter tasks based on the input value
  const filteredTasks = tasks?.filter((task) =>
    task.title.toLowerCase().includes(valueSearch.toLowerCase())
  )
  function handelAddTaskName(n,id) {
    dispatch(addTaskName(n))
    dispatch(addTaskId(id))
    setValueSearch(n)
    setClose(true)
   
    // console.log('n', n)
  }
  // console.log(filteredTasks)
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
        placeholder={`Select your task ...`}
        value={valueSearch}
        variant='bordered'
        className='flex-grow min-w-[200px]'
        endContent={<div onClick={()=>{setClose(true)}} className='cursor-pointer'>x</div>}
      />
      { close1 || valueSearch&&(
        <div className=' w-full  my-[.1rem]  bg-white2 rounded  h-auto'>
          {isTaskLoading ? (
            <p>Loading tasks...</p>
          ) : (
            filteredTasks?.map((task) => (
              <div
                key={task.id}
                onClick={() => handelAddTaskName(task.title,task.id)}
                className='border-b flex gap-1 pl-2 cursor-pointer  hover:bg-slate-300 hover:w-full'
              
              >
                <div className=''>
                  <span>{task.title}</span>
                </div>

                <span>
                  {task.status === 'Not Started' ? (
                    <div className='flex gap-1 items-center'>
                      <div className='rounded-full w-2  bg-pink-200 h-2 '></div>
                      Todo
                    </div>
                  ) : (
                    <div className='flex gap-1 items-center'>
                      <div className='rounded-full w-2  bg-yellow-200 h-2 '></div>
                      In Progress
                    </div>
                  )}{' '}
                </span>
                <div className='flex items-center gap-1'>
                  {/* <span
                    className={`w-2 h-2 rounded-full ${
                      priority ? priority.color : ''
                    }`}
                  ></span> */}
                  <span
                  // className={`${priority ? priority.color : ''}`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default ScheduleSearchResult
