import { useLocation } from 'react-router-dom'

function HeaderTitle() {
  const { pathname } = useLocation()
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
  return (
    <>
      <h1 className='lg:text-[2rem] lg:ml-0  md:mt-0  mt-2 ml-4 md:text-[2rem]  text-[1rem] font-bold'>
        {path}
      </h1>
    </>
  )
}

export default HeaderTitle
