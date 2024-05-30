import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Tooltip,
} from '@nextui-org/react'
import useGetTask from '../schedule/useGetTask'
import Spinner from '../../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { addTaskId, addTaskName } from './timerScheduleSlice'

export default function ScheduleTimer() {
  const { data: tasks, isLoading: isTask } = useGetTask()
  const dispatch = useDispatch()
  const { taskId } = useSelector((store) => store.timerSchedule)

  // console.log(tasks)
  const filterTask = tasks?.filter((task) => task.status !== 'Completed')
  const items = filterTask.map((task) => ({
    key: task.id,
    label: task.title,
    status: task.status,
  }))
  if (isTask) return <Spinner />
  console.log(filterTask)
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className='h-[2rem] font-semibold md:w-[4rem] md:h-[2.4rem]'
          color='secondary'
          size='lg'
        >
          select Task
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Dynamic Actions'>
        {items.map((item) => (
          <DropdownItem
            startContent={
              <div className='flex gap-1'>
                <h3 className=''>
                  {item.status === 'Not Started' ? (
                    <Tooltip content='Todo'>
                      <h3 className='bg-pink-200 w-5 text-center'>T </h3>
                    </Tooltip>
                  ) : (
                    <Tooltip content='In Progress'>
                      <h3 className='bg-blue-200 w-5 text-center'>P </h3>
                    </Tooltip>
                  )}
                </h3>{' '}
                :
              </div>
            }
            onClick={() => {
              dispatch(addTaskName(item.label))
              dispatch(addTaskId(item.key))
            }}
            onTouchStart={() => {
              dispatch(addTaskName(item.label))
              dispatch(addTaskId(item.key))
            }} // Added touch event handler
            on
            key={item.key}
            color={item.status === 'Not Started' ? 'danger' : 'primary'}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
