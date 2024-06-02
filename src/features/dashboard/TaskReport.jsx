import { format } from 'date-fns';
import Spinner from '../../components/Spinner';
import useGetTask from '../schedule/useGetTask';

function TaskReport() {
  const { data: task, isLoading: isTask } = useGetTask();
  
  if (isTask) return <Spinner />;

  const total = task.length || 0;
  const todoTask = task.filter(task => task.status?.toString() === 'Not Started').length || 0;
  const InProgressTask = task.filter(task => task.status?.toString() === 'In Progress').length || 0;
  const CompletedTask = task.filter(task => task.status?.toString() === 'Completed').length || 0;
  const allTimer = task.reduce((acc, cur) => acc + cur.duration, 0) || 0;

  return (
    <div className='w-full p-4 md:p-8'>
      <div className='flex flex-wrap justify-around'>
        <div className='bg-white p-4 m-2 rounded-lg shadow-md w-full md:w-1/6 text-center'>
          <span className='text-2xl text-green-400'>{total}</span>
          <h1 className='text-lg text-gray-600'>Total Task</h1>
        </div>
        <div className='bg-white p-4 m-2 rounded-lg shadow-md w-full md:w-1/6 text-center'>
          <span className='text-2xl text-pink-400'>{todoTask}</span>
          <h1 className='text-lg text-gray-600'>Not Started Task</h1>
        </div>
        <div className='bg-white p-4 m-2 rounded-lg shadow-md w-full md:w-1/6 text-center'>
          <span className='text-2xl text-blue-400'>{InProgressTask}</span>
          <h1 className='text-lg text-gray-600'>In Progress Task</h1>
        </div>
        <div className='bg-white p-4 m-2 rounded-lg shadow-md w-full md:w-1/6 text-center'>
          <span className='text-2xl text-yellow-400'>{CompletedTask}</span>
          <h1 className='text-lg text-gray-600'>Completed Task</h1>
        </div>
        <div className='bg-white p-4 m-2 rounded-lg shadow-md w-full md:w-1/6 text-center'>
          <span className='text-2xl text-orange-400'>{new Date(allTimer * 1000).toISOString().substr(11, 8)}</span>
          <h1 className='text-lg text-gray-600'>Total Task Timer</h1>
        </div>
      </div>
    </div>
  );
}

export default TaskReport;
