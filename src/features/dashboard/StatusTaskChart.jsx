import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const StatusTaskChart = ({ tasks }) => {
  const { t } = useTranslation()
  const COLORS = [
    '#7CB342',
    '#FFB300',
    '#F06292',
    '#4DD0E1',
    '#9575CD',
    '#FF7043',
    '#81C784',
    '#4DB6AC',
    '#64B5F6',
    '#A1887F',
  ]

  const totalTasks = tasks.length

  const taskStatuses = useMemo(() => {
    const statuses = {}
    if (tasks.length === 0) return []

    tasks.forEach((task) => {
      const status = task.status || 'Unknown' // If status is undefined, consider it as 'Unknown'
      statuses[status] = (statuses[status] || 0) + 1
    })

    return Object.entries(statuses).map(([name, value]) => ({
      name: t(name),
      value,
      percentage: ((value / totalTasks) * 100).toFixed(0), // Calculate percentage without decimal places
    }))
  }, [tasks, totalTasks])

  if (tasks.length === 0) {
    return (
      <div className='flex mt-8 h-[17.3rem] shadow-sm justify-center items-center bg-white w-full  text-gray-500'>
        {t('noTask')}
      </div>
    )
  }

  return (
    <div className='mt-4 bg-white p-4 rounded-lg shadow-md'>
      <h2 className='text-lg font-bold text-gray-800 mb-4'>
        {t('taskStatus')}
      </h2>
      <ResponsiveContainer
        width='100%'
        height={200}
        minHeight={150}
        maxHeight={300}
      >
        <PieChart>
          <Pie
            data={taskStatuses}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={60}
            fill='#8884d8'
            label={({ name, percentage }) => `${percentage}%`} // Display percentage inside the Pie
          >
            {taskStatuses.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout='vertical'
            align='right'
            verticalAlign='middle'
            radius='100%'
            className='rounded-full'
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatusTaskChart
