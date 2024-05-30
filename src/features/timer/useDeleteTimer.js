import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTimer } from '../../services/TimerApi'
import toast from 'react-hot-toast'

export default function useDelete() {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteTimer,
    onSuccess: () => {
      toast.success('deleted')
      queryClient.invalidateQueries({ queryKey: ['timer'] })
    },
    onError: (err) => toast.error(err.message),
  })
  return { mutate, isLoading }
}
