import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAlert = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: joinedStatus = false, isLoading } = useQuery({
    queryKey: ['isJoin', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/employee/${user.email}`);
      return data.isJoin;
    },
  });

  return [joinedStatus, isLoading];
};

export default useAlert;
