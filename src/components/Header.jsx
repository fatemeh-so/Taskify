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
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { data: user, isLoading } = useGetUser()
  const { mutate: logout, isLoading: isOut } = useLogout()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // Retrieve language from localStorage on component mount
    const savedLanguage = localStorage.getItem('appLanguage')
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

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

  const handleLanguageSwitch = () => {
    const newLanguage = i18n.language === 'en' ? 'fa' : 'en'
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('appLanguage', newLanguage) // Save the new language
  }

  if (pathname === '/login' || pathname === '/signup') return null
  if (isLoading || isOut) return <Spinner />

  const inputClassNames = {
    base: 'w-[9rem] sm:w-[12rem] h-9 md:h-10',
    mainWrapper: 'h-full',
    input: 'text-small',
    inputWrapper: 'h-full font-normal text-default-500 bg-[#ffffff] dark:bg-[#ffffff]',
  }

  return (
    <div className='flex justify-between py-4'>
      <HeaderTitle />
      <div className='flex items-center gap-5 px-6 '>
        {/* Language Switch */}
        <div className='flex items-center gap-2'>
          <Switch size='sm' onClick={handleLanguageSwitch}>
            {i18n.language !== 'en' ? <p>فارسی</p> : <p>english</p>}
          </Switch>
        </div>

        {/* Search */}
        <Input
          dir={i18n.language === 'en' ? 'ltr' : 'rtl'}
          classNames={`${inputClassNames}`}
          onChange={handleChange}
          onFocus={() => handleFocus(true)}
          placeholder={t('searchInput')}
          size='sm'
          startContent={<SearchIcon size={18} />}
          type='search'
          endContent={<button onClick={handleClearSearch}>x</button>}
        />
        <Dropdown dir={i18n.language === 'en' ? 'ltr' : 'rtl'} placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform w-[3rem]'
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
              onClick={() => navigate('/profile')}
              onTouchStart={() => navigate('/profile')}
            >
              {t('myProfile')}
            </DropdownItem>
            <DropdownItem key='logout' color='danger'>
              <div
                onClick={logout}
                onTouchStart={logout}
                className='flex gap-1 text-red-500'
              >
                <SignOut className='mt-1' /> <p>{t('logout')}</p>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}
