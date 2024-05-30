import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
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
  const filterTask = tasks?.filter((task) => task.status !== "Completed")
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
        <Button className='font' color='secondary'>
          Open Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Dynamic Actions'>
        {items.map((item) => (
          <DropdownItem
            startContent={
              <div>
                {item.status === 'Not Started' ? 'Todo :' : 'In Progress :'}
              </div>
            }
            onClick={() => {
              dispatch(addTaskName(item.label))
              dispatch(addTaskId(item.key))
            }}
            key={item.key}
            color={item.status === 'Not Started' ? 'danger' : 'success'}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
