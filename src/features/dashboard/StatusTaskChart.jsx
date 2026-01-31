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
import { Card, CardHeader, CardBody } from '@nextui-org/react'

// eslint-disable-next-line react/prop-types
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
      <Card className='h-[19rem] shadow-sm border border-gray-100 flex justify-center items-center text-gray-500'>
        {t('noTask')}
      </Card>
    )
  }

  return (
    <Card className='shadow-sm border border-gray-100 h-full'>
      <CardHeader className='pb-0 pt-4 px-4 flex-col items-start'>
        <h3 className='font-bold text-large text-gray-800'>
          {t('taskStatus')}
        </h3>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie
              data={taskStatuses}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={80}
              innerRadius={60}
              paddingAngle={5}
              fill='#8884d8'
              label={({ percentage }) => `${percentage}%`} // Display percentage inside the Pie
            >
              {taskStatuses.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke='none'
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend
              layout='vertical'
              align='right'
              verticalAlign='middle'
              iconType='circle'
            />
          </PieChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}

export default StatusTaskChart
