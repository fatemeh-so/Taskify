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
              <Route path='schedule' element={<Schedule />} />
              <Route path='schedule/:scheduleId' element={<EditTaskModal />} />
              <Route path='calender' element={<Calender />} />
              <Route path='timer' element={<Timer />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
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
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </>
  )
}
