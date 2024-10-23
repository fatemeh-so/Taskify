import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Switch,
} from '@nextui-org/react'
import HeaderTitle from './HeaderTitle.jsx'
import { SearchIcon } from './SearchIcon.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addInputValue, openSearch } from '../features/Header/HeaderSlice.jsx'
import useGetUser from '../features/auth/useGetUser.js'
import Spinner from './Spinner.jsx'
import { SignOut } from 'phosphor-react'
import useLogout from '../features/auth/useSignout.js'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const [isEn, setIsEn] = useState()
  const { t, i18n } = useTranslation()

  const { data: user, isLoading } = useGetUser()
  const { mutate: logout, isLoading: isOut } = useLogout()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleFocus = (value) => {
    dispatch(openSearch(value))
  }

  const handleChange = (e) => {
    dispatch(addInputValue(e.target.value))
  }

  const handleClearSearch = () => {
    handleFocus(false)
    dispatch(addInputValue(''))
  }
  function handelNavigate(value) {
    navigate(value)
  }
  if (pathname === '/login' || pathname === '/signup') return null
  if (isLoading || isOut) return <Spinner />

  const inputClassNames = {
    base: 'w-[9rem] sm:w-[12rem] h-9 md:h-10',
    mainWrapper: 'h-full',
    input: 'text-small',
    inputWrapper:
      'h-full font-normal text-default-500 bg-[#ffffff] dark:bg-[#ffffff]',
  }

  return (
    <div className='flex justify-between py-4'>
      <HeaderTitle />
      <div className='flex items-center gap-5 px-6 '>
        {/* change language */}
        <div className='flex items-center gap-2'>
          <Switch
            size='sm'
            onClick={() => {
              setIsEn(!isEn)
              if (isEn) {
                i18n.changeLanguage('en')
              }else{
                i18n.changeLanguage("fa")
              }
            }}
          >
            {!isEn ? <p>{t("persian")}</p> : <p>فارسی</p>}
          </Switch>
        </div>

        {/* search */}
        <Input
          classNames={inputClassNames}
          onChange={handleChange}
          onFocus={() => handleFocus(true)}
          placeholder='Type to search...'
          size='sm'
          startContent={<SearchIcon size={18} />}
          type='search'
          endContent={<button onClick={handleClearSearch}>x</button>}
        />
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='secondary'
              name={user?.user_metadata?.username || 'User'}
              size='sm'
              src={user?.user_metadata?.avatar}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold'>{user?.user_metadata?.username}</p>
              <p className='font-semibold'>{user?.email}</p>
            </DropdownItem>
            <DropdownItem
              key='settings'
              onClick={() => handelNavigate('/profile')}
              onTouchStart={() => handelNavigate('/profile')}
            >
              My Profile
            </DropdownItem>
            <DropdownItem
              onTouchStart={() => handelNavigate('/')}
              onClick={() => handelNavigate('/')}
              key='analytics'
            >
              Analytics
            </DropdownItem>
            <DropdownItem key='system'>
              {/* <NavLink to='/'>System</NavLink> */}
            </DropdownItem>
            <DropdownItem key='logout' color='danger'>
              <div
                onClick={logout}
                onTouchStart={logout}
                className='flex gap-1 text-red-500'
              >
                <SignOut className='mt-1' /> <p>Log Out</p>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}
