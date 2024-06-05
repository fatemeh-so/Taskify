import React from 'react'
import { Tabs, Tab, Card, CardBody, CardHeader } from '@nextui-org/react'
import ColumnTodo from './ColumnTodo'
import ColumnInProgress from './ColumnInProgress'
import ColumnCompleted from './ColumnCopmleted'
import Spinner from '../../components/Spinner'
import useGetTask from './useGetTask'

export default function MobileTab() {
  const [selected, setSelected] = React.useState('photos')
  const { data: task, isLoading: isTask } = useGetTask()

  if (isTask) return <Spinner />
  return (
    <div className='   md:hidden    w-full h-[80%] md:h-[90%] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden'>
      <Tabs
        color='secondary'
        fullWidth={true}
        variant='underlined'
        aria-label='Options'
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key='photos' title='ToDo'>
          <div className='mb-[-9rem]'>
            {' '}
            <ColumnTodo task={task} />
          </div>
        </Tab>
        <Tab key='music' title='In Procces'>
          <ColumnInProgress task={task} />
        </Tab>
        <Tab key='videos' title='Completed'>
          <ColumnCompleted task={task} />
        </Tab>
      </Tabs>
    </div>
  )
}
