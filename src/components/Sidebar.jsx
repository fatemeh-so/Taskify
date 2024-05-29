import { Files, SquaresFour, Timer, CalendarBlank } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

function Sidebar({className}) {
  return (
    <>
      <div
        className={` lg:w-[7rem] z-50  lg:h-[97%]  fixed bottom-[0rem]  w-full h-[5rem] bg-gray2 p-4 flex items-center justify-evenly rounded-t-[1.5rem] md:h-[5.5rem]  lg:rounded-[1rem] lg:m-[1rem]   lg:flex-col`}
      >
        <ul className=' mt-9  flex mb-10 lg:flex-col  gap-[5rem]'>
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
