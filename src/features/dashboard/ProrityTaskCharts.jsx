import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Card, CardHeader, CardBody } from '@nextui-org/react'

function ProrityTaskCharts({ tasks }) {
  const { t } = useTranslation()
  const COLORS = [
    '#7CB342', // Green
    '#FFB300', // Amber
    '#F06292', // Pink
    '#4DD0E1', // Cyan
    '#9575CD', // Deep Purple
    '#FF7043', // Deep Orange
    '#81C784', // Light Green
    '#4DB6AC', // Teal
    '#64B5F6', // Blue
    '#A1887F', // Brown
  ]

  const totalTasks = tasks.length

  const taskCategories = useMemo(() => {
    const categories = {}
    if (tasks) {
      tasks.forEach((task) => {
        if (categories[task.category]) {
          categories[task.category]++
        } else {
          categories[task.category] = 1
        }
      })
    }
    return Object.entries(categories).map(([name, value]) => ({
      name: t(name),
      value,
      percentage: ((value / totalTasks) * 100).toFixed(0),
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
          {t('taskCategories')}
        </h3>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <ResponsiveContainer width='100%' height={250} cy='50%'>
          <PieChart>
            <Pie
              data={taskCategories}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={80}
              innerRadius={60} // Donut chart for more modern look
              paddingAngle={5}
              fill='#8884d8'
              label={({ percentage }) => `${percentage}%`}
            >
              {taskCategories.map((entry, index) => (
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

ProrityTaskCharts.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default ProrityTaskCharts
