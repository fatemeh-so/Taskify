import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { DotsThreeVertical } from 'phosphor-react'

export default function TimerProjectSettings() {
  const items = [
    {
      key: 'new',
      label: 'New file',
    },
    {
      key: 'copy',
      label: 'Copy link',
    },
    {
      key: 'edit',
      label: 'Edit file',
    },
    {
      key: 'delete',
      label: 'Delete file',
    },
  ]

  return (
    <div className='mr-4'>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant='bordered'>
            <DotsThreeVertical size={28} color='#4e494e' />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label='Dynamic Actions' items={items}>
          {(item) => (
            <DropdownItem
            variant='light'
              key={item.key}
              color={item.key === 'delete' ? 'danger' : 'default'}
              className={item.key === 'delete' ? 'text-danger' : ''}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
