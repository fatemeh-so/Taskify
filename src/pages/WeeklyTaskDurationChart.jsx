import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

const WeeklyTaskDurationChart = ({ tasks, height }) => {
  const weekDays = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  });

  const data = weekDays.map((day) => {
    const formattedDay = format(day, 'yyyy-MM-dd');
    const totalDuration = tasks
      .filter(
        (task) =>
          format(new Date(task.created_at), 'yyyy-MM-dd') === formattedDay
      )
      .reduce((sum, task) => sum + task.duration, 0);
    return {
      day: format(day, 'EEEE'),
      duration: totalDuration,  // Store duration in seconds for YAxis
      formattedDuration: new Date(totalDuration * 1000).toISOString().substr(11, 8),  // For tooltip
    };
  });

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <ResponsiveContainer width='100%' height={245}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='day' />
          <YAxis />
          <Tooltip formatter={(value) => new Date(value * 1000).toISOString().substr(11, 8)} />
          <Legend />
          <Bar dataKey='duration' name='Duration (seconds)' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyTaskDurationChart;
