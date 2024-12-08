import { useQuery } from '@tanstack/react-query'
import { getUser } from '../../services/authApi'

export default function useGetUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })
  return { data, isLoading, error }
}
