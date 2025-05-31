import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCompanyInfo = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: companyData, isLoading } = useQuery({
    queryKey: ['company-info', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/company-info/${user?.email}`);
      return data;
    },
    enabled: !!user?.email, // only fetch if user.email exists
    staleTime: 5 * 60 * 1000, // cache for 5 minutes (optional optimization)
  });

  return [companyData, isLoading];
};

export default useCompanyInfo;
