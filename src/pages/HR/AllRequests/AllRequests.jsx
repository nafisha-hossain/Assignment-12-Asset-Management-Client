import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import Title from '../../../components/Title/Title';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../../utils/alert';
import { dateFormat } from '../../../utils/date';

const AllRequests = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, refetch } = useQuery({
    queryKey: ['req-assets', user?.email, search, currentPage, itemsPerPage],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/assets/all-requests/${user?.email}?search=${search}&page=${currentPage}&size=${itemsPerPage}`,
      );
      return data;
    },
  });

  const reqAssets = data?.reqAssets;
  const count = data?.count;

  const totalPages = Math.ceil(count / itemsPerPage);
  let pages;
  if (!isPending) {
    pages = [...Array(totalPages).keys()].map((page) => page + 1);
  }

  // handle approve button
  const handleApprove = async (id) => {
    const updatedAssetData = {
      status: 'approve',
      approve_date: new Date(),
      ...id,
    };

    try {
      await axiosSecure.patch(`/asset/request/approve`, updatedAssetData);
      refetch();
      successAlert('Request have been approved');
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      //
      await axiosSecure.patch(`/asset/update-status/${id}`, {
        status: 'reject',
      });

      successAlert('Request have been rejected!');
      refetch();
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    e.target.reset();
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handlePrevButton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextButton = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isPending) return <LoadingSpinner h={'90vh'} />;

  return (
    <section className="container mb-24 pt-40">
      <Title title={'AssetAura | All Requests'} />
      <div>
        <div>
          <form onSubmit={handleSearch}>
            <label
              htmlFor="search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search
            </label>
            <div>
              <div className="flex h-[44px] w-max items-center rounded-e rounded-s shadow">
                <input
                  type="text"
                  name="search"
                  className="h-full rounded-s border border-r-0 border-blue-300 pl-4 outline-none"
                  placeholder="Search..."
                />
                <button
                  type="submit"
                  className="inline-flex h-full w-14 items-center justify-center rounded-e border border-l-0 border-blue-500 bg-blue-500"
                >
                  <IoIosSearch className="text-2xl text-white" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-5 flex flex-col">
        <div className="overflow-x-auto shadow-md">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Asset Name</span>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Asset Type</span>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Requester Name</span>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Requester Email</span>
                    </th>

                    <th
                      scope="col"
                      className="px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Notes</span>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Request Date</span>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Status</span>
                    </th>

                    <th
                      scope="col"
                      className="px-2 py-3.5 text-center text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {reqAssets?.map((asset) => (
                    <tr
                      className="transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      key={asset?._id}
                    >
                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {asset?.product_name}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {asset?.product_type}
                        </span>
                      </td>
                      <td className="whitespace-nowrap p-4 text-center text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {asset?.requester_info?.name}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {asset?.requester_info?.email}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {asset?.additional_notes}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {dateFormat(asset?.requested_date)}
                        </span>
                      </td>

                      <td className="whitespace-nowrap text-center text-sm font-medium text-gray-700 px-2">
                        <div
                          className={`inline-flex items-center gap-x-2 rounded-full px-3 py-1 dark:bg-gray-800 ${asset?.status === 'pending' && 'bg-amber-100/60'} ${asset?.status === 'approve' && 'bg-emerald-100/60'} ${asset?.status === 'reject' && 'bg-rose-100/60'} ${asset?.status === 'return' && 'bg-purple-100/60'} ${asset?.status === 'cancel' && 'bg-rose-100/60'}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${asset?.status === 'pending' && 'bg-amber-500'} ${asset?.status === 'approve' && 'bg-emerald-500'} ${asset?.status === 'reject' && 'bg-rose-500'} ${asset?.status === 'return' && 'bg-purple-500'} ${asset?.status === 'cancel' && 'bg-rose-500'}`}
                          />
                          <span
                            className={`text-sm font-normal capitalize ${asset?.status === 'pending' && 'text-amber-500'} ${asset?.status === 'approve' && 'text-emerald-500'} ${asset?.status === 'reject' && 'text-rose-500'} ${asset?.status === 'return' && 'text-purple-500'} ${asset?.status === 'cancel' && 'text-rose-500'}`}
                          >
                            {asset?.status}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap py-4 text-sm px-2">
                        <div className="flex items-center justify-center gap-x-6">
                          <button
                            onClick={() => {
                              handleReject(asset?._id);
                            }}
                            disabled={asset?.status !== 'pending'}
                            className={`rounded px-4 py-1 text-sm tracking-wide text-white shadow-tableBtn transition-all duration-200 ${asset?.status !== 'pending' ? 'cursor-not-allowed bg-rose-900' : 'bg-rose-500 hover:bg-rose-700'}`}
                          >
                            Reject
                          </button>
                          <button
                            disabled={asset?.status !== 'pending'}
                            onClick={() =>
                              handleApprove({
                                assetId: asset?.requestedAssetId,
                                reqId: asset?._id,
                              })
                            }
                            className={`rounded px-4 py-1 text-sm tracking-wide text-white shadow-tableBtn transition-all duration-200 ${asset?.status !== 'pending' ? 'cursor-not-allowed bg-blue-900' : 'bg-primary hover:bg-blue-700'}`}
                          >
                            Approve
                          </button>
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
      {/* Pagination */}
      <div className="mt-6 flex justify-end">
        <nav aria-label="Page navigation example">
          <ul className="flex h-8 items-center -space-x-px text-sm">
            <li>
              <button
                onClick={handlePrevButton}
                className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-2.5 w-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>

            {pages?.map((page) => {
              return (
                <li key={page}>
                  <button
                    onClick={() => handlePagination(page)}
                    className={`flex h-8 items-center justify-center border px-3 leading-tight ${currentPage === page ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                  >
                    {page}
                  </button>
                </li>
              );
            })}

            <li>
              <button
                onClick={handleNextButton}
                className={`flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-2.5 w-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default AllRequests;
