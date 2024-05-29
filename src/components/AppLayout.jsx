import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function AppLayout() {
  return (
    <div className=' h-[100%]  bg-white2 flex w-[100%] flex-col-reverse lg:flex-row min-h-screen overflow-y-hidden '>
      <div className=' flex  xl:h-[100%] flex-col-reverse h-[13vh] lg:w-[12vh]  '>
        <Sidebar />
      </div>

      <div className='flex-grow w-[100%] lg:w-[18vh]  '>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
// import { Outlet } from 'react-router-dom'
// import Sidebar from './Sidebar'
// import Header from './Header'

// function AppLayout() {
//   return (
//     <div className=' relative h-[100%]  bg-white2 flex w-[100%] flex-col-reverse lg:flex-row min-h-screen overflow-y-hidden '>
//       <div className='relative lg:w-[18vh]'>
//         {' '}
//         <Sidebar className='w-full lg:w-[7rem] ' />
//       </div>

//       <div className='flex-grow w-[100%]  '>
//         <Header />
//         <Outlet />
//       </div>
//     </div>
//   )
// }

// export default AppLayout
