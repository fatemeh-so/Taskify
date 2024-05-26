// Schedule.js
import Column from '../features/schedule/ColumnCopmleted'
import ScheduleBar from '../features/schedule/ScheduleBar'
import { useDispatch, useSelector } from 'react-redux'
import AddTask from '../features/schedule/AddTask'
import { CloseAddTask } from '../features/schedule/taskSlice'
import ColumnTodo from '../features/schedule/ColumnTodo'
import ColumnInProgress from '../features/schedule/ColumnInProgress'
import ColumnCompleted from '../features/schedule/ColumnCopmleted'

function Schedule() {
  const { close, status } = useSelector((store) => store.task)
  const dispatch = useDispatch()

  function openTask() {
    dispatch(CloseAddTask(false));
  }
  return (
    <div className='relative z-10 h-[85vh] w-full overflow-hidden'>
      {close && <AddTask onClose={openTask} />}
      <div className='w-full h-full'>
        <div className='w-full h-auto'>
          <ScheduleBar />
        </div>
        <div className='mt-4 w-full h-[90%] md:h-[90%] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden'>
          <ColumnTodo label='To Do' color='pink1' />
          <ColumnInProgress label='In Progress' color='blue1' />
          <ColumnCompleted label='Completed' color='yellow' />
        </div>
      </div>
    </div>
  )
}

export default Schedule
