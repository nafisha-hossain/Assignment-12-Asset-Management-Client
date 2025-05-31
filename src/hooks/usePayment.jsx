import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const usePayment = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: paymentStatus = null, isLoading } = useQuery({
    queryKey: ['payment-status', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/employee/role/${user.email}`);
      return data?.payment_status ?? null;
    },
  });

  return [paymentStatus, isLoading];
};

export default usePayment;
