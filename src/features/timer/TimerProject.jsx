import { Input } from '@nextui-org/react'
import TimerProjectSettings from './TimerProjectSetting'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startTimer } from './timerSlice'
import useGetTimer from './useTimer'
import Spinner from '../../components/Spinner'
import { formatDate, formatTime } from '../../helpers/TimeConverter'

function TimerProject() {
  const { data: timerData, isLoading } = useGetTimer()

  if (isLoading) return <Spinner />
  console.log(timerData)
  return (
    <div className=''>
      {timerData.map((timer) => (
        <div key={timer.id} className='mt-6 w-full h-full '>
          <div className='shadow-lg mr-4 bg-white h-auto flex flex-col rounded-xl mt-3 ml-2'>
            <div className='flex justify-between items-center p-4 bg-blue-100 w-full rounded-t-xl shadow-sm'>
              <span className='text-gray-700 font-semibold'>
                {formatDate(timer?.created_at?.toString())}
              </span>
              <span className='text-gray-900 text-xl font-bold'>
                {new Date(timer.duration * 1000).toISOString().substr(11, 8)}
              </span>
            </div>
            <div className='flex items-center justify-between w-auto gap-5 p-4'>
              <Input
              variant='bordered'
                className='w-1/3 px-3 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500'
                type='text'
                placeholder={timer.taskName}
              />
              <div className='flex items-center gap-5'>
                <div className='flex justify-end items-center gap-1 text-gray-700'>
                  <span>{formatTime(timer.startTime)}</span>
                  <span>-</span>
                  <span>{formatTime(timer.endTime)}</span>
                </div>
                <span className='text-gray-700'>00:00:00</span>
                <TimerProjectSettings />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TimerProject
