import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { signup } from "../../services/apiUser";
import toast from 'react-hot-toast'
import { signIn } from '../../services/authApi'
import { useNavigate } from 'react-router-dom'

export default function useSignin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: signIn,
    mutationKey: ['user'],
    onSuccess: (data) => {
      queryClient.setQueryData(['users'], data.user)
      navigate('/dashboard', { replace: true })
    },
    onError: (erroe) => {
      toast.error(erroe.message)
    },
  })
  return { mutate, isLoading }
}

