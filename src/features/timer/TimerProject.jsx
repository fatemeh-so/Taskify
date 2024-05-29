import React, { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import TimerProjectSettings from './TimerProjectSetting';
import { useSelector } from 'react-redux';
import useGetTimer from './useTimer';
import Spinner from '../../components/Spinner';
import { formatDate, formatTime } from '../../helpers/TimeConverter';
import { isToday, subDays, startOfDay, isEqual } from 'date-fns';

function TimerProject() {
  const { data: timerData, isLoading } = useGetTimer();
  const { duration, taskName, startTime, open } = useSelector(
    (store) => store.timer
  );
  const [groupedDataArray, setGroupedDataArray] = useState([]);

  useEffect(() => {
    if (!isLoading && timerData) {
      // Step 1: Group data by created_at date
      const groupedData = timerData.reduce((acc, current) => {
        const date = new Date(current.created_at).toISOString().split('T')[0];

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(current);

        return acc;
        // console.log(aaa);
      }, {});

      // Step 2: Convert the grouped data object to an array of arrays and sort by date
      const groupedDataArray = Object.keys(groupedData)
        .sort((a, b) => new Date(b) - new Date(a))
        .map((date) => groupedData[date]);
      
      setGroupedDataArray(groupedDataArray);
    }
  }, [timerData, isLoading]);

  if (isLoading) return <Spinner />;

  const totalDuration = timerData?.reduce(
    (acc, timer) => acc + timer.duration,
    0
  );

  console.log('Total Duration:', totalDuration);

  return (
    <div className='mb-8'>
      {groupedDataArray.length > 0 && (
        <div className='mt-6 w-full h-full'>
          {groupedDataArray.map((group, index) => (
            <div key={index} className='shadow-lg mr-4 bg-white h-auto flex flex-col rounded-xl mt-3 ml-2'>
              <div className='flex flex-col bg-blue-100 w-full rounded-[1rem] shadow-sm'>
                <div className='flex justify-between p-4 items-center'>
                  <span className='text-gray-700 font-semibold'>
                    {formatDate(group[0].created_at)}
                  </span>
                  <span className='text-gray-900 text-xl font-bold'>
                    {new Date(group.reduce((acc, timer) => acc + timer.duration, 0) * 1000).toISOString().substr(11, 8)}
                  </span>
                </div>

                {group.map((timerToday, idx) => (
                  <div
                    key={timerToday.id}
                    className={`bg-[#ffffff] border-b flex items-center justify-between w-auto gap-5 p-4 ${
                      idx === group.length - 1 ? 'rounded-b-[1rem]' : ''
                    }`}
                  >
                    <Input
                      variant='bordered'
                      className='w-1/3 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      type='text'
                      placeholder={timerToday.taskName}
                    />
                    <div className='flex items-center gap-5'>
                      <div className='flex justify-end items-center gap-1 text-gray-700'>
                        <span>{formatTime(timerToday.startTime)}</span>
                        <span>-</span>
                        <span>{formatTime(timerToday.endTime)}</span>
                      </div>
                      <span className='text-gray-700'>
                        {new Date(timerToday.duration * 1000).toISOString().substr(11, 8)}
                      </span>
                      <TimerProjectSettings id={timerToday.id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TimerProject;
