import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function AppLayout() {
  return (
    <div className= ' h-[100%] bg-white2 flex w-[100%] flex-col-reverse lg:flex-row min-h-screen overflow-y-hidden '>
      <Sidebar className='w-full lg:w-[7rem] h-12 md:h-auto' />

      <div className='flex-grow w-[100%] h-[]'>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
