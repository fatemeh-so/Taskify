import {
  Files,
  SquaresFour,
  Timer,
  CalendarBlank,
  SignOut,
} from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import useLogout from '../features/auth/useSignout'
import Spinner from './Spinner'
import { AcmeLogo } from './AcmeLogo'
import { Tooltip } from '@nextui-org/react'

function Sidebar({ className }) {
  const { mutate: logout, isLoading } = useLogout()
  if (isLoading) return <Spinner />
  return (
    <>
      <div
        className={` lg:w-[7rem] z-50  lg:h-[97%]  fixed bottom-[0rem]   w-full h-[5rem] bg-gray2 p-4 flex items-center justify-evenly rounded-t-[1.5rem] md:h-[5.5rem]  lg:rounded-[1rem] lg:m-[1rem]   lg:flex-col`}
      >
        <ul className=' mt-9  flex mb-10 lg:flex-col  gap-[5rem]'>
          <li className='bg-white mb-24 rounded-full hidden lg:flex'>
            <NavLink to='/dashboard'>
              <AcmeLogo />
            </NavLink>
          </li>
          <div className='flex lg:flex-col w-[55vh] lg:w-auto justify-evenly items-center lg:h-[40vh]'>
            <li>
              <NavLink to='/dashboard'>
                <SquaresFour size={24} color='#f4ecf4' />
              </NavLink>
            </li>
            <li>
              <NavLink to='/schedule'>
                <Files size={24} color='#f4ecf4' />
              </NavLink>
            </li>{' '}
            {/* <li>
            <NavLink to='/calender'>
              <CalendarBlank size={24} color='#f4ecf4' />{' '}
            </NavLink>
          </li>{' '} */}
            <li>
              <NavLink to='/timer'>
                <Timer size={24} color='#f4ecf4' />
              </NavLink>
            </li>
          </div>

          <li
            onClick={() => logout()}
            className='text-white hidden mt-24 lg:flex flex justify-end'
          >
            <Tooltip content='logout'>
              <SignOut size={28} color='#f4ecf4' />
            </Tooltip>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
