import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { signup } from "../../services/apiUser";
import toast from 'react-hot-toast'
import { signUp } from '../../services/authApi'
import { useNavigate } from 'react-router-dom'

export default function useSignup() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: signUp,
    mutationKey: ['user'],
    onSuccess: (data) => {
      queryClient.setQueryData(['users'], data.user)
      navigate('/login', { replace: true })

      toast.success('Account successfully created! Please login.', {
        duration: 7000,
        position: 'top-center',
      })
    },
    onError: (error) => {
      toast.error(error?.message || 'Something went wrong', {
        duration: 7000,
        position: 'top-center',
        backgroundColor: 'white',
      })
    },
  })
  return { mutate, isLoading }
}
