import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../services/authApi'
// import { getCurrentUser } from "../../services/authApi";
// import { getCurrentUser } from "../../services/authApi";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['users'],
    queryFn: getCurrentUser,
  })
  return { isLoading, user, isAuthenticated: user?.role === 'authenticated' }
}
