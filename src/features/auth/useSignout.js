import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { logout } from "../../services/apiUser";
import { useNavigate } from 'react-router-dom'
import { logout } from '../../services/authApi'
// import { logout } from "../../services/authApi";

function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isLoading, mutate } = useMutation({
    mutationFn: logout,
    mutationKey: ['user'],
    onSuccess: () => {
      navigate('/login', { replace: true })
      queryClient.removeQueries()
    },
  })
  return { isLoading, mutate }
}

export default useLogout
