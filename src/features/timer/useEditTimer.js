import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { editTimer } from '../../services/TimerApi'

export default function useEditTask() {
  const queryClient = useQueryClient()

  const{mutate,isLoading}= useMutation({
   mutationFn: editTimer,
    onSuccess: () => {
      toast.success('Timer successfully edited')
      queryClient.invalidateQueries({ queryKey: ['timer'] })
    },
    onError: (err) => toast.error(err.message),
  })
  return{mutate,isLoading}
}
