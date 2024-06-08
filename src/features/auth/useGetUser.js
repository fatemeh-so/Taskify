import { useQuery } from '@tanstack/react-query'
import { getTimer } from '../../services/TimerApi'
import { getUser } from '../../services/authApi'

export default function useGetUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })
  console.log(data);
  return { data, isLoading, error }
}
