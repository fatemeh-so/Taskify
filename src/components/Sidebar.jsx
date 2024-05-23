import { Files, SquaresFour, Timer, CalendarBlank } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

function Sidebar({ className }) {
  return (
    <>
      <div
        className={`${className} bg-gray2 p-4 flex h-[5rem] items-center justify-evenly rounded-t-[1.5rem] md:h-[5.5rem]  lg:rounded-[1rem] lg:m-[1rem] lg:h-auto   lg:flex-col`}
      >
        <ul className='flex  lg:flex-col  gap-[5rem]'>
          <li>
            <NavLink to='/dashboard'>
              <SquaresFour size={24} color='#f4ecf4' />
            </NavLink>
          </li>
          <li>
            <NavLink to="/schedule">
              <Files size={24} color='#f4ecf4' />
            </NavLink>
          </li>{' '}
          <li>
            <NavLink to="/calender">
              <CalendarBlank size={24} color='#f4ecf4' />{' '}
            </NavLink>
          </li>{' '}
          <li>
            <NavLink to="/timer">
              <Timer size={24} color='#f4ecf4' />
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
