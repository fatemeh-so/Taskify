import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from '@nextui-org/react'
import HeaderTitle from './HeaderTitle.jsx'
import { SearchIcon } from './SearchIcon.jsx'
import { useLocation } from 'react-router-dom'
export default function Header() {
  const { pathname } = useLocation()
  if (pathname === '/login' || pathname==="/signup") return
  return (
    <div className=' lg:mt-[2rem] mt-[1rem]  flex justify-between mr-[1.2rem] md:mr-[1.5rem]'>
      {' '}
      <HeaderTitle />
      <div className='flex gap-5'>
        <Input
          classNames={{
            base: ' w-[9rem] sm:w-[12rem] h-9 md:h-10',
            mainWrapper: 'h-full ',
            input: 'text-small ',
            inputWrapper:
              'h-full  font-normal text-default-500 bg-[#ffffff] dark:bg-[#ffffff]',
          }}
          placeholder='Type to search...'
          size='sm'
          startContent={<SearchIcon size={18} />}
          type='search'
        />
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='secondary'
              name='Jason Hughes'
              size='sm'
              src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold'>Signed in as</p>
              <p className='font-semibold'>zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key='settings'>My Settings</DropdownItem>
            <DropdownItem key='team_settings'>Team Settings</DropdownItem>
            <DropdownItem key='analytics'>Analytics</DropdownItem>
            <DropdownItem key='system'>System</DropdownItem>
            <DropdownItem key='configurations'>Configurations</DropdownItem>
            <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
            <DropdownItem key='logout' color='danger'>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}
