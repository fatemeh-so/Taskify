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
      className={`lg:w-[5rem] z-20 lg:h-[97%] fixed bottom-0 w-full h-[5rem] bg-gray2 flex items-center justify-evenly rounded-t-[1.5rem] md:h-[5.5rem] lg:rounded-[1rem] lg:ml-[1rem] lg:my-4 lg:flex-col`}
    >
      <ul className='mt-9 flex mb-10 lg:flex-col gap-[5rem]'>
        <li className='bg-white rounded-full hidden lg:flex'>
          <NavLink to='/dashboard'>
            <AcmeLogo />
          </NavLink>
        </li>
        <div className='flex lg:flex-col w-[46vh] lg:w-auto justify-evenly items-center lg:h-[40vh]'>
          <li>
            <a
              // to='/dashboard'
              onTouchStart={() => handleNavigate('/dashboard')}
              onClick={() => handleNavigate('/dashboard')}
            >
              <SquaresFour size={24} color='#f4ecf4' />
            </a>
          </li>
          <li>
            <a
              // to='/schedule'
              onTouchStart={() => handleNavigate('/schedule')}
              onClick={() => handleNavigate('/schedule')}
            >
              <Files size={24} color='#f4ecf4' />
            </a>
          </li>
          <li>
            <a
              // to='/timer'
              onClick={() => handleNavigate('/timer')}
              onTouchStart={() => handleNavigate('/timer')}
            >
              <Timer size={24} color='#f4ecf4' />
            </a>
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
