import { useMutation, useQueryClient } from '@tanstack/react-query'
// import EditTaskModal from './EditTaskModal'
import toast from 'react-hot-toast'
import { editTask } from '../../services/TaskApi'

export default function useEditTask() {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      toast.success('successfully edited')
      queryClient.invalidateQueries({ queryKey: ['task'] })
    },
    onError: () => {
      toast.error('there is an error in editing')
    },
  })
  return { mutate, isLoading }
}
