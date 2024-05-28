import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTimer } from '../../services/TimerApi'
import toast from 'react-hot-toast'

export default function useAddTimer() {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: addTimer,
    onSuccess: () => {
      toast.success('New Timer successfully created')
      queryClient.invalidateQueries({ queryKey: ['timer'] })
    },
    onError: (err) => toast.error(err.message),
  })
  return { mutate, isLoading }
}
