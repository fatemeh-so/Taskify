import { useQuery } from '@tanstack/react-query'
import { getTask } from '../../services/TaskApi'

export default function useGetTask() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['task'],
    queryFn: getTask,
  })
  return { data, isLoading, error }
}
