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
      if (test === true) dispatch(testadd(false))
    },
    [test, dispatch]
  )
  const { close } = useSelector((store) => store.header)

  let cache = {}
  cache[4] = 20
  cache[64] = 206
  cache[74] = 209
  console.log(cache[64])

  return (
    <div className='h-full bg-white2 flex lg:w-[100%] flex-col-reverse lg:flex-row'>
      <div className='flex xl:h-[100vh] flex-col-reverse h-[13vh] '>
        <Sidebar />
      </div>

      <div className='flex-grow w-[100%] h-[87vh] lg:w-[18vh]'>
        <Header />
        {close ? (
          <SearchInputReasult />
        ) : (
          <div className='max-h-full'>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  )
}

export default AppLayout
