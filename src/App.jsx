import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Dashboard from './pages/Dashboard'
import { NextUIProvider } from '@nextui-org/react'
import Schedule from './pages/Schedule'
import Calender from './pages/Calender'
import Timer from './pages/Timer'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import EditTaskModal from './features/schedule/EditTaskModal'
import ProtectedRoute from './components/ProtectedRoute'
import MyProfile from './components/Myprofile'
import PageNotFound from './pages/PageNotFound'

export default function App() {
  return (
    <>
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to='dashboard' />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='schedule' element={<Schedule />}>
                <Route path=':scheduleId' element={<EditTaskModal />} />
              </Route>
              <Route path='calender' element={<Calender />} />
              <Route path='timer' element={<Timer />} />
              <Route path='profile' element={<MyProfile />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'white',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </>
  )
}
