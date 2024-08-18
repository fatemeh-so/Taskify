import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import SearchInputReasult from './SearchInputReasult'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { testadd } from '../features/schedule/taskSlice'

function AppLayout() {
  const { test } = useSelector((store) => store.task)
  const dispatch = useDispatch()
  useEffect(
    function () {
      if (test===true) dispatch(testadd(false))
    },
    [test ,dispatch]
  )
  const { close } = useSelector((store) => store.header)
  return (
    <div className='h-[100vh] bg-white2 flex w-[100%] flex-col-reverse lg:flex-row'>
      <div className='flex xl:h-[100vh] flex-col-reverse h-[13vh] lg:w-[15vh]'>
        <Sidebar />
      </div>

      <div className='flex-grow w-[100%] h-[87vh] lg:w-[18vh]'>
        <Header />
        {close ? <SearchInputReasult /> : <Outlet />}
      </div>
    </div>
  )
}

export default AppLayout
