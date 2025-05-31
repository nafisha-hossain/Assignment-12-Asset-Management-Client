import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const PendingRequests = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isPending } = useQuery({
    queryKey: ['pending-request-hr', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `assets/pending-request/${user?.email}`,
      );
      return data;
    },
  });

  if (isPending || loading) return <LoadingSpinner h={'50vh'} />;

  return (
    <section className="container">
      <SectionTitle title={'Pending Request Items'} />
      <div className="mt-10 flex flex-col">
        <div className="overflow-x-auto shadow-md">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-md">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Product name</span>
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Product type</span>
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Requester name</span>
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Requester email</span>
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {/* table row */}
                  {data?.map((item) => (
                    <tr key={item._id}>
                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700 dark:text-gray-200">
                        <span className="capitalize">{item?.product_name}</span>
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700 dark:text-gray-200">
                        <span className="capitalize">
                          {item?.requester_info?.name}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700 dark:text-gray-200">
                        <span className="capitalize">{item?.product_type}</span>
                      </td>

                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700 dark:text-gray-200">
                        <span className="capitalize">
                          {item?.requester_info?.email}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-2 text-center">
                        <div
                          className={`inline-flex items-center gap-x-2 rounded-full px-3 py-1 dark:bg-gray-800 ${item?.status === 'pending' && 'bg-amber-100/60'} ${item?.status === 'approve' && 'bg-emerald-100/60'} ${item?.status === 'reject' && 'bg-rose-100/60'}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${item?.status === 'pending' && 'bg-amber-500'} ${item?.status === 'approve' && 'bg-emerald-500'} ${item?.status === 'reject' && 'bg-rose-500'}`}
                          />
                          <span
                            className={`text-sm font-normal capitalize ${item?.status === 'pending' && 'text-amber-500'} ${item?.status === 'approve' && 'text-emerald-500'} ${item?.status === 'reject' && 'text-rose-500'}`}
                          >
                            {item?.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PendingRequests;
