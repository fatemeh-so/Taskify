/* eslint-disable react/prop-types */
import { Button, Input, Card } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  addTaskName,
  resetTimer,
  setOpen,
  startTimer,
  stopTimer,
} from './timerSlice'
import Spinner from '../../components/Spinner'
import useAddTimer from './useAddTimer'
import useGetUser from '../auth/useGetUser'
import { useTranslation } from 'react-i18next'
import { Play, Stop, Timer as TimerIcon } from 'phosphor-react'

function TimerBar() {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const { mutate: addTimer, isLoading: isAddTimer } = useAddTimer()
  const { duration, taskName, startTime, open } = useSelector(
    (store) => store.timer
  )
  const { data: user, isLoading: isUser } = useGetUser()

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
  }, [dispatch, duration, open, startTime])

  const handleStartStop = async () => {
    if (open) {
      const endTimeValue = new Date().toISOString()
      const all = {
        duration,
        taskName,
        startTime,
        endTime: endTimeValue,
        created_at: startTime,
        filter: 'timer',
        user_id: user.id,
      }
      dispatch(stopTimer(endTimeValue))
      addTimer(all)
      dispatch(resetTimer())
    }
    dispatch(setOpen(!open))
  }
  if (isAddTimer || isUser) return <Spinner />

  return (
    <Card className='w-full p-4 border-none shadow-sm bg-white' shadow='sm'>
      <div
        dir={i18n.language == 'en' ? 'ltr' : 'rtl'}
        className='flex flex-col md:flex-row items-center gap-4 justify-between'
      >
        <Input
          type='text'
          placeholder={t(`timerInput`)}
          value={taskName}
          size='lg'
          variant='flat'
          className='flex-1 lg:max-w-xl'
          startContent={<TimerIcon size={20} className='text-default-400' />}
          classNames={{
            input: 'text-lg',
            inputWrapper:
              'bg-gray-50 hover:bg-gray-100 group-data-[focus=true]:bg-gray-100',
          }}
          onChange={(e) => {
            dispatch(addTaskName(e.target.value))
          }}
        />

        <div className='flex items-center gap-6 w-full md:w-auto justify-between md:justify-end'>
          <div className='font-mono text-2xl font-bold text-gray-800 tracking-wider bg-gray-50 px-4 py-2 rounded-lg min-w-[120px] text-center'>
            {convertDuration}
          </div>

          <Button
            color={!open ? 'primary' : 'danger'}
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

export default TimerBar
