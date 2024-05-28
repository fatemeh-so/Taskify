import { useQuery } from '@tanstack/react-query'
import { getTimer } from '../../services/TimerApi'

export default function useGetTimer() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['timer'],
    queryFn: getTimer,
  })
  return { data, isLoading, error }
}
