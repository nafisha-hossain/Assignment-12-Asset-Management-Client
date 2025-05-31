import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { dateFormat } from '../../../utils/date';
const LimitedStockItem = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isPending } = useQuery({
    queryKey: ['limited-stock-hr', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`assets/limited-stock/${user?.email}`);
      return data;
    },
  });

  if (isPending || loading) return <LoadingSpinner h={'50vh'} />;

  return (
    <section className="container">
      <SectionTitle title={'Limited Stock Items'} />
      <div className="mt-10 flex flex-col">
        <div className="overflow-x-auto shadow-md">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Asset name</span>
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Asset type</span>
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Availability</span>
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Added date</span>
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Asset quantity</span>
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
                        <span className="capitalize">{item?.product_type}</span>
                      </td>

                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700">
                        <p
                          className={`inline-flex items-center rounded-full ${item?.availability === 'Out of stock' ? 'bg-red-100/60' : 'bg-emerald-100/60'} w-28 justify-center py-1 dark:bg-gray-800`}
                        >
                          <span
                            className={`text-sm font-normal ${item?.availability === 'Out of stock' ? 'text-red-500' : 'text-emerald-500'}`}
                          >
                            {item?.availability}
                          </span>
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700 dark:text-gray-200">
                        <span className="capitalize">
                          {dateFormat(item?.added_date)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700">
                        <p className="mx-auto w-16 rounded-full bg-purple-100/60 px-4 py-1.5 text-sm text-purple-500 dark:bg-gray-800">
                          {item?.product_quantity < 10
                            ? String(item?.product_quantity).padStart(2, '0')
                            : item?.product_quantity}
                        </p>
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

export default LimitedStockItem;
