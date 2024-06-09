import { ArrowLeft } from 'phosphor-react'
import { useLocation, useNavigate } from 'react-router-dom'

function HeaderTitle() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  //   console.log(pathname)
  let path
  if (pathname === '/dashboard') {
    path = 'Dashboard'
  }
  if (pathname === '/schedule') {
    path = 'Schedule'
  }
  if (pathname === '/calender') {
    path = 'Calender'
  }
  if (pathname === '/timer') {
    path = 'Timer'
  }
  if (pathname === '/profile') {
    // path = 'Profile'
    return (
      <p onClick={() => navigate('/')} className='px-4 pt-2'>
        <ArrowLeft  size={20} />
      </p>
    )
  }
  return (
    <>
      <h1 className='lg:text-[2rem] lg:ml-0  md:mt-0  mt-2 ml-4 md:text-[2rem]  text-[1rem] font-bold'>
        {path}
      </h1>
    </>
  )
}

export default HeaderTitle
