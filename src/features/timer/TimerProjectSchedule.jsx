import { useEffect } from 'react'
import { Input, Card, CardBody, Chip } from '@nextui-org/react'
import TimerProjectSettings from './TimerProjectSetting'
import { useDispatch, useSelector } from 'react-redux'
import useGetTimer from './useTimer'
import Spinner from '../../components/Spinner'
import {
  FormatDate,
  formatTime,
  FormatFaDate,
} from '../../helpers/TimeConverter'
import { startOfDay, startOfWeek, endOfWeek } from 'date-fns'
import {
  addGroupDataTimerArray,
  updateTaskName,
  setWeekStartDates,
} from './timerScheduleSlice'
import useEditTimer from './useEditTimer'
// import TimerScheduleDataInitializer from '../dashboard/TimerScheduleDataInitializer'
import useGetUser from '../auth/useGetUser'
import { useTranslation } from 'react-i18next'
import { Calendar } from 'phosphor-react'

export default function TimerProjectSchedule() {
  const { i18n, t } = useTranslation()
  const isEnglish = i18n.language == 'en'
  const { data: timerDatas, isLoading } = useGetTimer()
  const { mutate: edit, isLoading: isEdit } = useEditTimer()
  const { data: user, isLoading: isUser } = useGetUser()
  const timerData = timerDatas?.filter((timer) => timer.user_id === user.id)

  const dispatch = useDispatch()
  const { taskNames, weekStartDates } = useSelector(
    (store) => store.timerSchedule
  )
  useEffect(() => {
    if (!isLoading && timerData) {
      const filterTimer = timerData.filter(
        (timer) => timer.filter === 'schedule'
      )
      const groupedData = filterTimer.reduce((acc, current) => {
        const date = isEnglish
          ? FormatDate(startOfDay(new Date(current.created_at)))
          : FormatFaDate(startOfDay(new Date(current.created_at)))
        if (!acc[date]) {
          acc[date] = []
        }

        acc[date].push(current)

        return acc
      }, {})

      const sortedGroupedData = Object.keys(groupedData)
        .map((date) => groupedData[date])
        .reverse() // Reverse the order of sortedGroupedData, first add first show

      dispatch(addGroupDataTimerArray(sortedGroupedData))

      // Group by week
      const weekStartDates = sortedGroupedData.reduce((weeks, group) => {
        const weekStart = isEnglish
          ? FormatDate(
              startOfWeek(new Date(group[0].created_at), { weekStartsOn: 1 })
            )
          : FormatFaDate(
              startOfWeek(new Date(group[0].created_at), { weekStartsOn: 1 })
            )

        if (!weeks[weekStart]) {
          weeks[weekStart] = []
        }

        weeks[weekStart].push(group)
        return weeks
      }, {})

      const labeledWeeks = Object.entries(weekStartDates).map(
        ([weekStart, groups]) => {
          const weekEnd = isEnglish
            ? FormatDate(
                endOfWeek(new Date(groups[0][0].created_at), {
                  weekStartsOn: 1,
                })
              )
            : FormatFaDate(
                endOfWeek(new Date(groups[0][0].created_at), {
                  weekStartsOn: 1,
                })
              )

          return { weekEnd, weekStart, groups }
        }
      )

      dispatch(setWeekStartDates(labeledWeeks))
    }
  }, [timerDatas, isLoading, dispatch, isEnglish])

  const handleInputChange = (id, value) => {
    dispatch(updateTaskName({ id, taskName: value }))
  }

  const handleEditInput = (id, value) => {
    edit({ id: id, taskName: value })
  }

  if (isLoading || isEdit || isUser) return <Spinner />
  // console.log(weekEnd);
  return (
    <div dir={isEnglish ? 'ltr' : 'rtl'} className='mb-8 w-full pb-20'>
      {weekStartDates?.length > 0 && (
        <div className='w-full'>
          {weekStartDates.map(({ weekStart, weekEnd, groups }, index) => (
            <div key={`week-${index}`} className='mb-10'>
              {/* Week Header */}
              <div className='flex items-center gap-3 mb-4 pl-1'>
                <div className='flex items-center gap-2 text-gray-500 font-medium'>
                  <Calendar size={20} className='text-secondary' />
                  <span>{weekStart.split(',').slice(1)}</span>
                  <span className='text-gray-300 mx-1'>/</span>
                  <span>{weekEnd.split(',').slice(1)}</span>
                </div>

                <Chip size='sm' variant='flat' color='secondary'>
                  <span className='font-semibold'>
                    {new Date(
                      groups.reduce((acc, group) => {
                        return (
                          acc +
                          group.reduce(
                            (groupAcc, cur) => groupAcc + cur.duration,
                            0
                          )
                        )
                      }, 0) * 1000
                    )
                      .toISOString()
                      .substr(11, 8)}
                  </span>
                </Chip>
              </div>

              {groups.map((group, groupIndex) => (
                <Card
                  key={`group-${groupIndex}`}
                  className='mb-6 border border-gray-100 shadow-sm overflow-visible'
                  shadow='sm'
                >
                  {/* Day Header */}
                  <div className='flex justify-between items-center bg-gray-50/50 p-4 border-b border-gray-100'>
                    <span className='text-gray-700 font-bold text-lg'>
                      {isEnglish
                        ? FormatDate(
                            new Date(group[0].created_at),
                            'EEEE, MMM dd'
                          )
                        : FormatFaDate(new Date(group[0].created_at), 'MM/dd')}
                    </span>
                    <span className='font-mono font-bold text-gray-900 bg-white px-2 py-1 rounded border border-gray-200'>
                      {new Date(
                        group.reduce((acc, timer) => acc + timer.duration, 0) *
                          1000
                      )
                        .toISOString()
                        .substr(11, 8)}
                    </span>
                  </div>

                  {/* Day Items */}
                  <CardBody className='p-0'>
                    {group.map((timerToday, idx) => (
                      <div
                        key={timerToday.id}
                        className={`group relative flex flex-col md:flex-row items-center justify-between gap-4 p-4 hover:bg-gray-50 transition-colors ${
                          idx !== group.length - 1
                            ? 'border-b border-gray-100'
                            : ''
                        }`}
                      >
                        <div className='flex-1 w-full relative'>
                          <Input
                            variant='bordered'
                            size='md'
                            classNames={{
                              input: 'font-medium text-gray-700',
                              inputWrapper:
                                'border-transparent group-hover:border-default-200 bg-transparent shadow-none',
                            }}
                            placeholder={t('noDescription', {
                              defaultValue: 'No description',
                            })}
                            type='text'
                            value={taskNames[timerToday.id] || ''}
                            onChange={(e) => {
                              handleInputChange(timerToday.id, e.target.value)
                            }}
                            onBlur={(e) =>
                              handleEditInput(timerToday.id, e.target.value)
                            }
                          />
                        </div>

                        <div className='flex items-center justify-between w-full md:w-auto gap-6 md:pl-4'>
                          <div className='flex items-center gap-2 text-sm text-gray-400 font-mono'>
                            <span>{formatTime(timerToday.startTime)}</span>
                            <span>-</span>
                            <span>{formatTime(timerToday.endTime)}</span>
                          </div>

                          <div className='flex items-center gap-4'>
                            <span className='font-mono font-semibold text-gray-700'>
                              {new Date(timerToday.duration * 1000)
                                .toISOString()
                                .substr(11, 8)}
                            </span>
                            <TimerProjectSettings id={timerToday.id} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardBody>
                </Card>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
