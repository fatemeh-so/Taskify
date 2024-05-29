import React from 'react'
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

export default function TimerProjectSettings({ id }) {
  const { mutate: deleting, isLoading: isDelete } = useDelete()
  // const items = {
  //   label: 'New Timer',

  //   label1: 'Edit Timer',

  //   label2: 'Delete Timer',
  // }
  function deleteTimer(id) {
    deleting(id)
  }
  if (isDelete) return <Spinner />
  return (
    <div className='mr-4'>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant='bordered'>
            <DotsThreeVertical size={28} color='#4e494e' />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label='Dynamic Actions'>
          <DropdownItem
            variant='light'
          >
            New Timer
          </DropdownItem>
          <DropdownItem
            variant='light'
          >
            Edit Timer
          </DropdownItem>{' '}
          <DropdownItem
            variant='light'
            onClick={() => deleteTimer(id)}
            color={ 'danger' }
            className={ 'text-danger'}
          >
            Delete Timer
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
