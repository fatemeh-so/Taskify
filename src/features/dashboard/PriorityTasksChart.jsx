import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Spinner from '../../components/Spinner';
import useGetTask from '../schedule/useGetTask';
import { useMemo } from 'react';

function PriorityTaskCharts() {
  const COLORS = ['#7CB342', '#FFB300', '#F06292', '#4DD0E1', '#9575CD', '#FF7043', '#81C784', '#4DB6AC', '#64B5F6', '#A1887F'];

  const { data: tasks, isLoading: isTask } = useGetTask();

  if (isTask) return <Spinner />;
  
  const totalTasks = tasks.length;

  const taskPriorities = useMemo(() => {
    const priorities = {};
    if (tasks) {
      tasks.forEach((task) => {
        if (priorities[task.priority]) {
          priorities[task.priority]++;
        } else {
          priorities[task.priority] = 1;
        }
      });
    }
    return Object.entries(priorities).map(([name, value]) => ({
      name,
      value,
      percentage: ((value / totalTasks) * 100).toFixed(0), // Calculate percentage without decimal places
    }));
  }, [tasks, totalTasks]);

  return (
    <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Task Priorities</h2>
      <ResponsiveContainer width="100%" height={200} minHeight={150} maxHeight={300}>
        <PieChart>
          <Pie
            data={taskPriorities}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            label={({ name, percentage }) => `${percentage}%`} // Display percentage inside the Pie
          >
            {taskPriorities.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" radius="100%" className='rounded-full' />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriorityTaskCharts;
