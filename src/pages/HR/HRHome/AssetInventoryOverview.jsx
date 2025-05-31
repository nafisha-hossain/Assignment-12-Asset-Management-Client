import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import TableHeading from '../../../components/shared/TableHeading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { dateFormat } from '../../../utils/date';

const AssetInventoryOverview = () => {
  const axiosSecure = useAxiosSecure();

  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  const { data: assets = [] } = useQuery({
    queryKey: ['all-assets', filter, sort],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/assets?filter=${filter}&sort=${sort}`,
      );
      return data;
    },
  });

  return (
    <section className="container mx-auto px-4 md:px-0">
      <TableHeading heading={'Asset Inventory Overview'} />
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <div>
          <select
            onChange={(e) => setFilter(e.target.value)}
            id="pricing"
            className="block w-full max-w-[180px] rounded border border-blue-300 bg-blue-500 p-2.5 text-center font-medium tracking-wide text-white outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300"
          >
            <option value="">Filter-by</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-Returnable</option>
            <option value="Available">Available</option>
            <option value="Out of stock">Out of Stock</option>
          </select>
        </div>
        <div>
          <select
            onChange={(e) => setSort(e.target.value)}
            id="pricing"
            className="block w-full max-w-[180px] rounded border border-purple-300 bg-purple-500 p-2.5 text-center font-medium tracking-wide text-white outline-none focus:border-primary focus:ring-1 focus:ring-purple-300 dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-300"
          >
            <option value="">Sort-by</option>
            <option value="date-asc">Date ascending</option>
            <option value="date-dsc">Date descending</option>
            <option value="quantity-asc">Quantity ascending</option>
            <option value="quantity-dsc">Quantity descending</option>
          </select>
        </div>
      </div>
      {/* table */}
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-6 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Product name</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="capitalize">Product quantity</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="capitalize">Product category</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="capitalize">Added date</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-2 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Availability</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {/* table row */}
                  {assets?.map((item) => (
                    <tr key={item._id}>
                      <td className="whitespace-nowrap py-4 pl-6 text-sm font-medium text-gray-700 dark:text-gray-200">
                        <span className="capitalize">{item?.product_name}</span>
                      </td>
                      <td className="whitespace-nowrap pl-6 text-sm font-medium text-gray-700">
                        <p className="capitalize dark:text-gray-300">
                          <span className="w-max rounded-full bg-purple-100/60 px-3 py-1 text-xs tracking-wider text-purple-500 dark:bg-gray-800">
                            {item?.product_quantity}
                          </span>
                        </p>
                      </td>
                      <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                        <span className="capitalize">{item?.product_type}</span>
                      </td>

                      <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                        <span className="capitalize">
                          {dateFormat(item?.added_date)}
                        </span>
                      </td>
                      <td>
                        <p
                          className={`inline-flex items-center rounded-full ${item?.availability === 'Out of stock' ? 'bg-red-100/60' : 'bg-emerald-100/60'} w-24 justify-center py-1 dark:bg-gray-800`}
                        >
                          <span
                            className={`text-sm font-normal ${item?.availability === 'Out of stock' ? 'text-red-500' : 'text-emerald-500'}`}
                          >
                            {item?.availability}
                          </span>
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
      <div className="mt-6 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>previous</span>
        </a>
        <div className="hidden items-center gap-x-3 md:flex">
          <a
            href="#"
            className="rounded-md bg-blue-100/60 px-2 py-1 text-sm text-blue-500 dark:bg-gray-800"
          >
            1
          </a>
          <a
            href="#"
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            2
          </a>
          <a
            href="#"
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            3
          </a>
          <a
            href="#"
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            ...
          </a>
          <a
            href="#"
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            12
          </a>
          <a
            href="#"
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            13
          </a>
          <a
            href="#"
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            14
          </a>
        </div>
        <a
          href="#"
          className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default AssetInventoryOverview;
