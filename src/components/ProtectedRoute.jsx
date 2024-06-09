import { useNavigate } from 'react-router-dom'
// import { useUser } from '../features/auth/useUser'
import Spinner from '../components/Spinner'
import { useEffect } from 'react'
import { useUser } from '../features/auth/useUser'
// import { useUser } from '@nextui-org/react'
// import { useUser } from '../features/auth/useUser'

function ProtectedRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useUser()
  const navigate = useNavigate()
// console.log(user);
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate('/login')
      }
    },
    [isAuthenticated, isLoading,navigate]
  )

  if (isLoading) return <Spinner />

  if (isAuthenticated) return children
//   if (isAuthenticated) {
//     navigate("/dashboard")
//   }

}

export default ProtectedRoute
