import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import SearchInputReasult from './SearchInputReasult'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { testadd } from '../features/schedule/taskSlice'
import { useTranslation } from 'react-i18next'

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
  const { i18n } = useTranslation()

  useEffect(() => {
    if (i18n.language === 'fa') {
      document.body.classList.add('fa')
    } else {
      document.body.classList.remove('fa')
    }
  }, [i18n.language])
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
