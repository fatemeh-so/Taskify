import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../../services/TaskApi'
import toast from 'react-hot-toast'

export default function useDeleteTask() {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success('successfully deleted')
      queryClient.invalidateQueries({ queryKey: ['task'] })
    },
    onError: () => {
      toast.error('there is an error in deleting')
    },
  })
  return { mutate, isLoading }
}
