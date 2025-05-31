import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import PrintAssetPdf from '../../../components/Pdf/PrintAssetPdf';
import Title from '../../../components/Title/Title';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../../utils/alert';
import { dateFormat } from '../../../utils/date';
//TODO: Search, filter implement latter
//TODO: style pdf page
const MyRequestedAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [assetInfo, setAssetInfo] = useState(null);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, refetch } = useQuery({
    queryKey: [
      'my-requested-assets',
      user?.email,
      search,
      filter,
      currentPage,
      itemsPerPage,
    ],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/assets/requested-assets/${user?.email}?search=${search}&filter=${filter}&page=${currentPage}&size=${itemsPerPage}`,
      );
      return data;
    },
  });

  const myAssets = data?.myAssets;
  const count = data?.count;

  const totalPages = Math.ceil(count / itemsPerPage);
  let pages;
  if (!isPending) {
    pages = [...Array(totalPages).keys()].map((page) => page + 1);
  }

  // update status to cancel
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/asset/update-status/${id}`, {
        status: 'cancel',
      });
      return data;
    },
    onSuccess: () => {
      refetch();
      successAlert('Request has been canceled!');
    },
  });

  // handle return button
  const handleCancelRequest = async (id) => {
    try {
      await mutateAsync(id);
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }

  };

  const handleReturn = async (ids) => {
    try {
      await axiosSecure.patch(`/asset/request/return`, {
        ...ids,
      });
      refetch();
      successAlert('Return successfully!');
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  // handle print modal
  const handlePrintModal = async (asset) => {
    setPdfData(asset);
    // console.log(id);
    try {
      const { data } = await axiosSecure(`/asset/${asset?.requestedAssetId}`);
      // console.log(data);
      setAssetInfo(data);
    } catch (error) {
      console.log(error);
    }

    setShowModal(true);
  };

  // hanle search here

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter('');
    setSearch(e.target.search.value);
    e.target.reset();
  };

  // hanel file here
  const handleFilter = (e) => {
    setSearch('');
    setFilter(e.target.value);
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

  if (isPending) return <LoadingSpinner h={'50vh'} />;
  return (
    <>
      <Title title={'AssetAura | My Requested Assets'} />
      <section className="container mb-24 pt-40">
        <div className="flex flex-wrap items-center justify-between gap-y-4">
          <div>
            <form onSubmit={handleSearch} className="mx-auto max-w-md">
              <div>
                <div className="flex h-[44px] items-center justify-between rounded-e rounded-s shadow">
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
          <div>
            <select
              onChange={handleFilter}
              defaultValue={'empty'}
              className="dark:text-gray-300l block h-11 w-[130px] appearance-none rounded bg-emerald-500 text-center text-sm text-white shadow-md outline-none disabled:pointer-events-none disabled:text-white"
            >
              <option disabled value="empty">
                Filter
              </option>
              <option value="">All</option>
              <option value="pending">Pending </option>
              <option value="approve">Approve</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Nor-returnable</option>
            </select>
          </div>
        </div>
        {/* table */}
        <div className="mt-6 flex flex-col">
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
                        <span className="whitespace-nowrap">Asset Name </span>
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Asset Type</span>
                      </th>

                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">
                          Request Status
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Request Date</span>
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Approval Date</span>
                      </th>

                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {myAssets?.map((asset) => (
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
                        <td className="whitespace-nowrap px-2 text-center text-sm font-medium text-gray-700">
                          <div
                            className={`inline-flex w-24 items-center justify-center gap-x-2 rounded-full py-1 dark:bg-gray-800 ${asset?.status === 'pending' && 'bg-amber-100/60'} ${asset?.status === 'approve' && 'bg-emerald-100/60'} ${asset?.status === 'reject' && 'bg-rose-100/60'} ${asset?.status === 'return' && 'bg-purple-100/60'} ${asset?.status === 'cancel' && 'bg-rose-100/60'}`}
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
                        <td className="whitespace-nowrap text-center px-2 text-sm font-medium text-gray-700">
                          <span className="capitalize dark:text-gray-300">
                            {dateFormat(asset?.requested_date)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap py-4 px-2 text-center text-sm font-medium text-gray-700">
                          {asset?.approve_date && (
                            <span className="capitalize dark:text-gray-300">
                              {dateFormat(asset?.approve_date)}
                            </span>
                          )}
                        </td>

                        <td className="whitespace-nowrap py-4 text-center text-sm px-2">
                          <div className="flex items-center justify-center">
                            {asset?.status === 'pending' ||
                            asset?.status === 'cancel' ? (
                              <button
                                disabled={asset?.status === 'cancel'}
                                onClick={() => handleCancelRequest(asset._id)}
                                className={`w-20 rounded py-1 text-sm tracking-wide text-white shadow-tableBtn transition-all duration-200 ${asset?.status === 'cancel' || asset?.status === 'return' ? 'cursor-not-allowed bg-rose-900' : 'bg-rose-500 hover:bg-rose-700'}`}
                              >
                                Cancel
                              </button>
                            ) : null}
                            {asset?.status === 'approve' &&
                              asset?.product_type !== 'Returnable' && (
                                <button
                                  onClick={() => handlePrintModal(asset)}
                                  className={`w-20 rounded bg-blue-500 py-1 text-sm tracking-wide text-white shadow-tableBtn transition-all duration-200 hover:bg-blue-700`}
                                >
                                  Print
                                </button>
                              )}
                            {(asset?.status === 'approve' ||
                              asset?.status === 'return') &&
                            asset?.product_type === 'Returnable' ? (
                              <button
                                onClick={() =>
                                  handleReturn({
                                    reqId: asset?._id,
                                    assetId: asset?.requestedAssetId,
                                  })
                                }
                                disabled={asset?.status === 'return'}
                                className={`w-20 rounded py-1 text-sm tracking-wide text-white shadow-tableBtn transition-all duration-200 ${asset?.status === 'return' ? 'cursor-not-allowed bg-purple-900' : 'bg-purple-500 hover:bg-purple-700'}`}
                              >
                                Return
                              </button>
                            ) : null}
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
        {/* pagination here */}
        <div>
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
        </div>
      </section>
      {/* <YourComponent /> */}
      <PrintAssetPdf
        pdfData={pdfData}
        assetInfo={assetInfo}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default MyRequestedAsset;
