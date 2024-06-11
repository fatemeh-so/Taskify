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
      queryClient.setQueryData(['users'], data.user,["user"])
      queryClient.invalidateQueries({ queryKey: ['users'] })

      navigate('/dashboard', { replace: true })

      toast.success(
        "Account successfully created!"
      ),
        console.log(data)
    },
  })
  return { mutate, isLoading }
}
