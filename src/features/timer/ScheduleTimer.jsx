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

  const filterTask = tasks?.filter((task) => task.status !== 'Completed')
  const items = filterTask.map((task) => ({
    key: task.id,
    label: task.title,
    status: task.status,
  }))

  if (isTask) return <Spinner />

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className='h-8 font-semibold w-full md:w-auto md:h-10'
          color='secondary'
          size='lg'
        >
          Select Task
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Dynamic Actions'
        css={{
          '@xs': {
            width: '100%',
          },
          '@sm': {
            width: '20rem',
          },
        }}
      >
        {items.map((item) => (
          <DropdownItem
            key={item.key}
            startContent={
              <div className='flex gap-1'>
                <h3>
                  {item.status === 'Not Started' ? (
                    <Tooltip content='Todo'>
                      <span className='bg-pink-200 w-5 text-center'>T</span>
                    </Tooltip>
                  ) : (
                    <Tooltip content='In Progress'>
                      <span className='bg-blue-200 w-5 text-center'>P</span>
                    </Tooltip>
                  )}
                </h3>
                :
              </div>
            }
            onClick={() => {
              dispatch(addTaskName(item.label))
              dispatch(addTaskId(item.key))
            }}
            color={item.status === 'Not Started' ? 'danger' : 'primary'}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
