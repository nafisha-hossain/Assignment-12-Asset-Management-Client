import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useLoggedInUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: loggedInUser = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['loggedUser', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/employee/${user?.email}`);
      return data;
    },
    enabled: !!user?.email, // fetch only if user email exists
  });

  return [loggedInUser, isLoading, refetch];
};

export default useLoggedInUser;
