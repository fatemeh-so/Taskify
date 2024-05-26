import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AddTask } from '../../services/TaskApi'
import toast from 'react-hot-toast'

export default function useAddTask() {
  const queryClient = useQueryClient()

  const{mutate,isLoading}= useMutation({
   mutationFn: AddTask,
    onSuccess: () => {
      toast.success('New task successfully created')
      queryClient.invalidateQueries({ queryKey: ['task'] })
    },
    onError: (err) => toast.error(err.message),
  })
  return{mutate,isLoading}
}
