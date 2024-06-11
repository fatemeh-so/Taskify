import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { useEffect } from 'react'
import { useUser } from '../features/auth/useUser'
import { useSelector } from 'react-redux'

function ProtectedRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useUser()
  const navigate = useNavigate()
  const { test } = useSelector(
    (store) => store.task
  )
// console.log(user);
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate('/login')
      }
    },
    [isAuthenticated, isLoading,navigate]
  )
  useEffect(
    function () {
      if (test&& !isLoading) {
        navigate('/dashboard')
        console.log(test)
      }
    },
    [test, isLoading,navigate]
  )

  if (isLoading) return <Spinner />

  if (isAuthenticated) return children
//   if (isAuthenticated) {
//     navigate("/dashboard")
//   }

}

export default ProtectedRoute
