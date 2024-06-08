import { useMutation } from '@tanstack/react-query'
// import { signup } from "../../services/apiUser";
import toast from 'react-hot-toast'
import { signUp } from '../../services/authApi'
import { useNavigate } from 'react-router-dom'

export default function useSignup() {
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation({
    mutationFn: signUp,
    mutationKey: ['user'],
    onSuccess: (data) => {
      navigate('/dashboard')

      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      ),
        console.log(data)
    },
  })
  return { mutate, isLoading }
}
