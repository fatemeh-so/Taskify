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

function ProrityTaskCharts({ tasks }) {
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
      percentage: ((value / totalTasks) * 100).toFixed(0), // Calculate percentage without decimal places
    }))
  }, [tasks, totalTasks])

  if (tasks.length === 0) {
    return (
      <div className='flex mt-4 h-[17.3rem] shadow-sm rounded-lg justify-center items-center bg-white w-full text-gray-500'>
        {t('noTask')}
      </div>
    )
  }

  return (
    <div className='mt-4 bg-white p-4 rounded-lg '>
      <h2 className='text-lg text-gray-800 mb-4'>{t('taskCategories')}</h2>
      <ResponsiveContainer
        width='100%'
        height={190}
        minHeight={150}
        maxHeight={200}
      >
        <PieChart>
          <Pie
            data={taskCategories}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={60}
            fill='#8884d8'
            label={({ percentage }) => `${percentage}%`} // Display percentage inside the Pie
          >
            {taskCategories.map((entry, index) => (
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
            radius='100'
            className='rounded-full'
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
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
