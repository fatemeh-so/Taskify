import { useEffect } from 'react'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Switch,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@nextui-org/react'
import HeaderTitle from './HeaderTitle.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUser from '../features/auth/useGetUser.js'
import Spinner from './Spinner.jsx'
import { SignOut } from 'phosphor-react'
import useLogout from '../features/auth/useSignout.js'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { data: user, isLoading } = useGetUser()
  const { mutate: logout, isLoading: isOut } = useLogout()
  const { pathname } = useLocation()
  // const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage')
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  // const handleFocus = (value) => {
  //   dispatch(openSearch(value))
  // }

  // const handleChange = (e) => {
  //   dispatch(addInputValue(e.target.value))
  // }

  // const handleClearSearch = () => {
  //   handleFocus(false)
  //   dispatch(addInputValue(''))
  // }

  const handleLanguageSwitch = () => {
    const newLanguage = i18n.language === 'en' ? 'fa' : 'en'
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('appLanguage', newLanguage)
  }

  if (pathname === '/login' || pathname === '/signup') return null
  if (isLoading || isOut) return <Spinner />

  return (
    <Navbar
      maxWidth='full'
      className='z-10 bg-transparent shadow-sm'
      height='4rem'
    >
      <NavbarBrand>
        <HeaderTitle />
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex' justify='center'>
        {/* <NavbarItem>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[20rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder={t('searchInput')}
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
            variant="bordered"
            onChange={handleChange}
            onFocus={() => handleFocus(true)}
            dir={i18n.language === 'en' ? 'ltr' : 'rtl'}
            endContent={
              <Button 
                size="sm" 
                variant="light" 
                isIconOnly 
                onClick={handleClearSearch}
              >
                ✕
              </Button>
            }
          />
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Switch
            size='md'
            color='secondary'
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <span className={`${className} text-[10px] font-semibold `}>
                  EN
                </span>
              ) : (
                <span className={`${className} text-[10px] font-semibold `}>
                  FA
                </span>
              )
            }
            isSelected={i18n.language === 'en'}
            onValueChange={handleLanguageSwitch}
          />
        </NavbarItem>
        <NavbarItem>
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
                onClick={() => navigate('/profile')}
                onTouchStart={() => navigate('/profile')}
              >
                {t('myProfile')}
              </DropdownItem>
              <DropdownItem key='logout' color='danger' className='p-0'>
                <Button
                  variant='light'
                  startContent={<SignOut size={18} />}
                  onClick={logout}
                  onTouchStart={logout}
                  className='
      w-full justify-start px-2
      bg-transparent
      hover:bg-transparent
      active:bg-transparent
      focus:bg-transparent
      data-[hover=true]:bg-transparent
    '
                >
                  {t('logout')}
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
