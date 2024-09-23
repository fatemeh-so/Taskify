import React from 'react'
import { Tabs, Tab } from '@nextui-org/react'
import ColumnTodo from './ColumnTodo'
import ColumnInProgress from './ColumnInProgress'
import ColumnCompleted from './ColumnCopmleted'
import Spinner from '../../components/Spinner'
import useGetTask from './useGetTask'
import useGetUser from '../auth/useGetUser'
import { format, isValid } from 'date-fns'
import { useSelector } from 'react-redux'

export default function MobileTab() {
  const { dateCal, datePickerStatus } = useSelector(
    (store) => store.task
  )
  const [selected, setSelected] = React.useState('photos')
  const { data: tasks, isLoading: isTask } = useGetTask()
  const { data: user, isLoading } = useGetUser()
  const task = tasks?.filter((task) => task.user_id === user.id)

  const filteredTasks = task?.filter((t) => {
    const taskDate = new Date(t.created_at)
    const selectedDate = new Date(dateCal)
    if (!isValid(taskDate) || !isValid(selectedDate)) {
      return false
    }
    return format(taskDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  })

  const tasksToDisplay = datePickerStatus
    ? filteredTasks?.length > 0
      ? filteredTasks
      : []
    : task


  if (isTask || isLoading) return <Spinner />
  return (
    <div className='   md:hidden z-0   w-full h-[70%] md:h-[90%] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden'>
      <Tabs
        color='secondary'
        fullWidth={true}
        variant='underlined'
        aria-label='Options'
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key='photos' title='ToDo' className='z-0 '>
            <ColumnTodo task={tasksToDisplay} />
        </Tab>
        <Tab key='music' title='In Procces'>
            <ColumnInProgress task={tasksToDisplay} />
        </Tab>
        <Tab key='videos' title='Completed'>
          <ColumnCompleted task={tasksToDisplay} />
        </Tab>
      </Tabs>
    </div>
  )
}
