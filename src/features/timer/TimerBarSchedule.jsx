/* eslint-disable react/prop-types */
import { Button, Card } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  resetTimer,
  setOpen,
  startTimer,
  stopTimer,
} from './timerScheduleSlice'
import Spinner from '../../components/Spinner'
import useAddTimer from './useAddTimer'
import useEditTask from '../schedule/useEditTask'
import toast from 'react-hot-toast'
import useGetTask from '../schedule/useGetTask'
import ScheduleSearchResult from './ScheduleSearchResult'
import useGetUser from '../auth/useGetUser'
import { useTranslation } from 'react-i18next'
import { Play, Stop } from 'phosphor-react'

function TimerBarSchedule() {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const { mutate: addTimer, isLoading: isAddTimer } = useAddTimer()
  const { mutate: editTask, isLoading: isEditTask } = useEditTask()
  const { data: user, isLoading: isUser } = useGetUser()
  const [valueSearch, setValueSearch] = useState('')

  const { data: tasks, isLoading: isTask } = useGetTask()
  const task = tasks?.filter((task) => task.user_id === user.id)
  const { duration, taskName, startTime, open, taskId } = useSelector(
    (store) => store.timerSchedule
  )

  // Convert duration to a time string starting from 00:00:00
  const convertDuration = new Date(duration * 1000).toISOString().substr(11, 8)
  useEffect(() => {
    let id

    if (open) {
      id = setInterval(() => {
        dispatch(
          startTimer({
            duration: duration + 1,
            startTime: startTime || new Date().toISOString(),
          })
        )
      }, 1000)
    }
    return () => {
      if (id) clearInterval(id)
    }
  }, [dispatch, duration, open, startTime, taskName])

  const handleStartStop = async () => {
    if (!taskName) {
      toast.error('Select a schedule first')
      return
    }
    if (open) {
      const endTimeValue = new Date().toISOString()
      const curTask = task.find((task) => task.id === taskId)
      const curTaskDur = curTask.duration
      const all = {
        filter: 'schedule',
        duration,
        taskName,
        startTime,
        endTime: endTimeValue,
        created_at: startTime,
        user_id: user.id,
      }
      dispatch(stopTimer(endTimeValue))
      addTimer(all)
      editTask({ duration: curTaskDur + duration, id: taskId })
      dispatch(resetTimer())
      setValueSearch('')
    }
    dispatch(setOpen(!open))
  }
  if (isAddTimer || isEditTask || isTask || isUser) return <Spinner />

  return (
    <Card
      className='w-full p-4 border-none shadow-sm bg-white overflow-visible' // overflow-visible for dropdowns
      shadow='sm'
    >
      <div className='flex flex-col md:flex-row items-center gap-4 justify-between'>
        <div className='w-full lg:max-w-xl z-20 relative'>
          <ScheduleSearchResult
            valueSearch={valueSearch}
            setValueSearch={setValueSearch}
          />
        </div>

        <div className='flex items-center gap-6 w-full md:w-auto justify-between md:justify-end'>
          <div className='font-mono text-2xl font-bold text-gray-800 tracking-wider bg-gray-50 px-4 py-2 rounded-lg min-w-[120px] text-center'>
            {convertDuration}
          </div>

          <Button
            color={!open ? 'secondary' : 'danger'}
            className='font-semibold min-w-[120px]'
            size='lg'
            radius='lg'
            variant={open ? 'flat' : 'solid'}
            startContent={
              open ? (
                <Stop weight='bold' size={20} />
              ) : (
                <Play weight='bold' size={20} />
              )
            }
            onClick={handleStartStop}
          >
            {open ? t('stop') : t('start')}
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default TimerBarSchedule
