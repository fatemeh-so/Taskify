import { Spinner } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';
import useGetTask from '../features/schedule/useGetTask';
import useGetTimer from '../features/timer/useTimer';
import { useNavigate } from 'react-router-dom';
import { addInputValue, openSearch } from '../features/Header/HeaderSlice';
import useGetUser from '../features/auth/useGetUser';

function SearchInputResult() {
  const { data: task, isLoading: isTask } = useGetTask();
  const { data: timerDatas, isLoading: isTimerLoading } = useGetTimer();
  const { inputValue } = useSelector((store) => store.header);
  const { data: user, isLoading: isUser } = useGetUser()
  const timerData = timerDatas?.filter((timer) => timer.user_id === user.id)
  const tasks=task?.filter(task=>task.user_id===user.id)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isTask || isTimerLoading)
    return (
      <div className="flex justify-center my-8">
        <Spinner size={48} color="#4A90E2" />
      </div>
    );

  const filteredTasks = inputValue
    ? tasks?.filter((task) => {
        return (
          task?.title.toLowerCase().includes(inputValue.toLowerCase()) ||
          task?.priority.toLowerCase()?.includes(inputValue?.toLowerCase()) ||
          task?.status.toLowerCase().includes(inputValue.toLowerCase())
        );
      })
    : [];

  const filteredScheduleTimer = inputValue
    ? timerData.filter(
        (timer) =>
          timer.filter === 'schedule' &&
          typeof timer.taskName === 'string' &&
          timer.taskName.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];

  const filteredTimer = inputValue
    ? timerData.filter(
        (timer) =>
          timer?.filter === 'timer' &&
          typeof timer?.taskName === 'string' &&
          timer?.taskName?.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  function handelNavigateToSchedule(route) {
    navigate(`/${route}`);
    dispatch(openSearch(false));
    dispatch(addInputValue(null));
  }

  return (
    <div className="w-full h-full bg-gray-50 p-4 pl-[7rem] overflow-x-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Tasks</h2>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handelNavigateToSchedule('schedule')}
              className="bg-white p-4 mb-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{task.title}</h3>
              <p className="text-gray-600 mb-1"><span className="font-medium text-blue-500">Category:</span> {task.category}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium text-blue-500">Priority:</span> {task.priority}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium text-blue-500">Status:</span> {task.status}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium text-blue-500">Created At:</span> {formatDateTime(task.created_at)}</p>
              {task.due_date && <p className="text-gray-600 mb-1"><span className="font-medium text-blue-500">Due Date:</span> {formatDateTime(task.due_date)}</p>}
              <div className="mt-2">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">Description:</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {task.description.map((desc, index) => (
                    <li key={index} className={desc.completed ? 'line-through text-red-500' : ''}>{desc.text}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No tasks found matching your search criteria.</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Scheduled Timers</h2>
        {filteredScheduleTimer.length > 0 ? (
          filteredScheduleTimer.map((timer) => (
            <div
              key={timer.id}
              onClick={() => handelNavigateToSchedule('timer')}
              className="bg-white p-4 mb-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{timer.taskName}</h3>
              <p className="text-gray-600 mb-1"><span className="font-medium text-blue-500">Start Time:</span> {formatDateTime(timer.startTime)}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium text-blue-500">End Time:</span> {timer.endTime ? formatDateTime(timer.endTime) : 'N/A'}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium text-blue-500">Duration:</span> {timer.duration ? `${timer.duration} seconds` : 'N/A'}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No scheduled timers found matching your search criteria.</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Timers</h2>
        {filteredTimer.length > 0 ? (
          filteredTimer.map((timer) => (
            <div
              key={timer.id}
              onClick={() => handelNavigateToSchedule('timer')}
              className="bg-white p-4 mb-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{timer.taskName}</h3>
              <p className="text-gray-600 mb-1"><span className="font-medium text-blue-500">Start Time:</span> {formatDateTime(timer.startTime)}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium text-blue-500">End Time:</span> {timer.endTime ? formatDateTime(timer.endTime) : 'N/A'}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium text-blue-500">Duration:</span> {timer.duration ? `${timer.duration} seconds` : 'N/A'}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No timers found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
}

export default SearchInputResult;
