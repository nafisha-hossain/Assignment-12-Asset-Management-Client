import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosSearch } from 'react-icons/io';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import AssetRequestModal from '../../../components/Modal/AssetRequestModal';
import Title from '../../../components/Title/Title';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { errorAlert, successAlert, warningAlert } from '../../../utils/alert';
import useAlert from '../../../hooks/useAlert';

const RequestForAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [reqAsset, setReqAsset] = useState(null);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isJoin] = useAlert();

  const { data, isPending, refetch } = useQuery({
    queryKey: ['request-assets', search, filter, currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/assets?search=${search}&filter=${filter}&page=${currentPage}&size=${itemsPerPage}`,
      );
      return data;
    },
  });

  const assets = data?.assets;
  const count = data?.count;

  const totalPages = Math.ceil(count / itemsPerPage);
  let pages;
  if (!isPending) {
    pages = [...Array(totalPages).keys()].map((page) => page + 1);
  }

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: {
      notes: '',
    },
  });

  const handleRequest = async (data) => {
  if(isJoin === false) return warningAlert('Please contact with your HR!')
    const assetData = {
      product_name: reqAsset?.product_name,
      product_type: reqAsset?.product_type,
      added_date: reqAsset?.added_date,
      additional_notes: data.notes,
      requested_date: new Date(),
      status: 'pending',

      requester_info: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
      provider_info: {
        name: reqAsset?.provider_info?.name,
        email: reqAsset?.provider_info?.email,
        image: reqAsset?.provider_info?.photo,
      },
      requestedAssetId: reqAsset?._id,
    };

    // console.log(assetData);

    try {
      const { data } = await axiosSecure.post('/asset/request', assetData);
      console.log(data);

      if (data.insertedId) {
        successAlert('Your request have been sent!');
      } else {
        warningAlert('You have already request this asset please wait!');
      }

      reset();
      setShowModal(false);
      refetch();
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter('');
    setSearch(e.target.search.value);
    e.target.reset();
  };

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
    <section className="container mx-auto mb-24 pt-40">
      <Title title={'AssetAura | Request for an Asset'} />
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
            <option value="Available">Available</option>
            <option value="Out of stock">Out of stock</option>
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
                      <span>Name</span>
                    </th>

                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Asset Type</span>
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
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {assets?.map((asset) => {
                    return (
                      <tr
                        className="transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        key={asset?._id}
                      >
                        <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700 dark:text-gray-200">
                          <span className="capitalize">
                            {asset?.product_name}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-2 py-4 text-center text-sm text-gray-500 dark:text-gray-300">
                          <span className="capitalize">
                            {asset?.product_type}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700">
                          <p
                            className={`inline-flex items-center rounded-full ${asset?.availability === 'Out of stock' ? 'bg-red-100/60' : 'bg-emerald-100/60'} w-28 justify-center py-1 dark:bg-gray-800`}
                          >
                            <span
                              className={`text-sm font-normal ${asset?.availability === 'Out of stock' ? 'text-red-500' : 'text-emerald-500'}`}
                            >
                              {asset?.availability}
                            </span>
                          </p>
                        </td>

                        <td className="whitespace-nowrap px-2 py-4 text-center text-sm">
                          <button
                            onClick={() => {
                              handleOpenModal();
                              setReqAsset(asset);
                            }}
                            disabled={asset?.availability === 'Out of stock'}
                            className={`rounded px-3 py-1 tracking-wide text-white transition-colors duration-200 focus:outline-none ${asset?.availability === 'Out of stock' ? 'cursor-not-allowed bg-blue-900' : 'bg-primary hover:bg-blue-700'}`}
                          >
                            Request
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* pagination */}
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
      <AssetRequestModal
        showModal={showModal}
        isDirty={isDirty}
        setShowModal={setShowModal}
        register={register}
        handleSubmit={handleSubmit}
        handleRequest={handleRequest}
      />
    </section>
  );
};

export default RequestForAsset;
