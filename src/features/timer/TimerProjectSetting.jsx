import React, { useEffect } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { DotsThreeVertical } from 'phosphor-react'
import useDelete from './useDeleteTimer'
import Spinner from '../../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { setOpen, startTimer } from './timerSlice'

export default function TimerProjectSettings({ id }) {
  const { mutate: deleting, isLoading: isDelete } = useDelete()
  const dispatch = useDispatch()
  const { duration, startTime, open } = useSelector((store) => store.timer)

  const handleDeleteTimer = (id) => {
    deleting(id)
  }

  if (isDelete) return <Spinner />

  return (
    <div className='z-0'>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant='bordered'>
            <DotsThreeVertical size={28} color='#4e494e' />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label='Dynamic Actions'>
          <DropdownItem
            variant='light'
            onClick={() => {
              dispatch(setOpen(!open))
            }}
            onSmart
          >
            New Timer
          </DropdownItem>
          {/* <DropdownItem variant='light'>Edit Timer</DropdownItem> */}
          <DropdownItem
            variant='light'
            onClick={() => handleDeleteTimer(id)}
            onTouchStart={() => handleDeleteTimer(id)}
            color='danger'
            className='text-danger'
          >
            Delete Timer
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
