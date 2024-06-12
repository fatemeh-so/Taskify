import { Files, SquaresFour, Timer, SignOut, UserGear } from 'phosphor-react'
import { NavLink, useNavigate } from 'react-router-dom'
import useLogout from '../features/auth/useSignout'
import Spinner from './Spinner'
import { AcmeLogo } from './AcmeLogo'
import { Tooltip } from '@nextui-org/react'

function Sidebar({ className }) {
  const { mutate: logout, isLoading } = useLogout()
  const navigate = useNavigate()

  function handleNavigate(path) {
    navigate(path)
  }

  if (isLoading) return <Spinner />

  return (
    <div
      className={`lg:w-[7rem] z-10 lg:h-[97%] fixed bottom-0 w-full h-[5rem] bg-gray2 p-4 flex items-center justify-evenly rounded-t-[1.5rem] md:h-[5.5rem] lg:rounded-[1rem] lg:m-[1rem] lg:flex-col`}
    >
      <ul className='mt-9 flex mb-10 lg:flex-col gap-[5rem]'>
        <li className='bg-white mb-24 rounded-full hidden lg:flex'>
          <NavLink to='/dashboard'>
            <AcmeLogo />
          </NavLink>
        </li>
        <div className='flex lg:flex-col w-[46vh] lg:w-auto justify-evenly items-center lg:h-[40vh]'>
          <li>
            <NavLink
              to='/dashboard'
              onTouchStart={() => handleNavigate('/dashboard')}
              onClick={() => handleNavigate('/dashboard')}
            >
              <SquaresFour size={24} color='#f4ecf4' />
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/schedule'
              onTouchStart={() => handleNavigate('/schedule')}
              onClick={() => handleNavigate('/schedule')}
            >
              <Files size={24} color='#f4ecf4' />
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/timer'
              onClick={() => handleNavigate('/timer')}
              onTouchStart={() => handleNavigate('/timer')}
            >
              <Timer size={24} color='#f4ecf4' />
            </NavLink>
          </li>
        </div>
        <div className='text-white mt-[3rem] hidden gap-4 lg:flex flex-col justify-end'>
          <li>
            <UserGear
              onClick={() => handleNavigate('/profile')}
              size={24}
              color='#f4ecf4'
            />
          </li>
          <li onClick={() => logout()}>
            <Tooltip content='logout'>
              <SignOut size={24} color='#f4ecf4' />
            </Tooltip>
          </li>
        </div>
      </ul>
    </div>
  )
}

export default Sidebar
