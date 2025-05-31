import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useEffect } from 'react';

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = null,
    refetch,
    isFetching,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['role', user?.email],
    enabled: false, // we will trigger manually
    queryFn: async () => {
      const { data } = await axiosSecure(`/employee/role/${user?.email}`);
      console.log('Fetched Role:', data);
      return data?.role ?? null;
    },
  });

  useEffect(() => {
    if (!loading && user?.email) {
      refetch();
    }
  }, [loading, user?.email, refetch]);

  return [ role,  isLoading ];
};

export default useRole;
