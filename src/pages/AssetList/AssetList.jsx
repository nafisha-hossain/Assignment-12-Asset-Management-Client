import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Title from '../../components/Title/Title';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../utils/alert';
import { dateFormat } from '../../utils/date';

const ITEMS_PER_PAGE = 10;

const AssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const queryKey = ['asset-list', filter, currentPage, sort, search, user?.email];
  const queryFn = useCallback(async () => {
    const { data } = await axiosSecure(
      `/assets/hr/${user?.email}?filter=${filter}&sort=${sort}&search=${search}&page=${currentPage}&size=${ITEMS_PER_PAGE}`,
    );
    return data;
  }, [axiosSecure, user?.email, filter, sort, search, currentPage]);

  const { data, isPending, refetch } = useQuery({
    queryKey,
    queryFn,
  });

  const { assets = [], count = 0 } = data || {};

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
  const pages = useMemo(() => {
    return [...Array(totalPages).keys()].map((page) => page + 1);
  }, [totalPages]);

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/asset/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      successAlert('Asset has been deleted!');
    },
  });

  const handleDeleteAsset = useCallback(
    async (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#f43f5e',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteMutation.mutateAsync(id);
          } catch (error) {
            errorAlert(error.message);
          }
        }
      });
    },
    [deleteMutation],
  );

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setFilter('');
    setSort('');
    setSearch(e.target.search.value);
    setCurrentPage(1);
    e.target.reset();
  }, []);

  const handleFilter = useCallback((e) => {
    setSearch('');
    setSort('');
    setFilter(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((e) => {
    setSearch('');
    setFilter('');
    setSort(e.target.value);
    setCurrentPage(1);
  }, []);

  const handlePagination = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePrevButton = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNextButton = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  if (isPending) return <LoadingSpinner h={'50vh'} />;

  return (
    <section className="container mb-24 pt-40">
      <Title title={'AssetAura | Asset List'} />
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <div>
          <select
            onChange={handleFilter}
            defaultValue={'empty'}
            className="dark:text-gray-300l block w-[130px] appearance-none rounded bg-emerald-500 py-3 text-center text-sm text-white shadow-md outline-none disabled:pointer-events-none disabled:text-white"
          >
            <option disabled value="empty">
              Filter
            </option>
            <option value="">All</option>
            <option value="Available">Available</option>
            <option value="Out of stock">Out of stock</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>
        
        <div>
          <form onSubmit={handleSearch} className="mx-auto max-w-md">
            <label htmlFor="search" className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Search
            </label>
            <div className="flex h-[44px] items-center justify-between rounded-e rounded-s shadow">
              <input
                type="text"
                name="search"
                className="h-full w-full rounded-s border border-r-0 border-blue-300 pl-4 outline-none"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="inline-flex h-full w-14 items-center justify-center rounded-e border border-l-0 border-blue-500 bg-blue-500"
              >
                <IoIosSearch className="text-2xl text-white" />
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <select
            onChange={handleSort}
            defaultValue={''}
            className="dark:text-gray-300l block w-[130px] appearance-none rounded bg-purple-500 py-3 text-center text-sm text-white shadow-md outline-none disabled:pointer-events-none disabled:text-white"
          >
            <option disabled value="">
              Sort
            </option>
            <option value="quantity-asc">Ascending</option>
            <option value="quantity-dsc">Descending</option>
          </select>
        </div>
      </div>
      
      {/* Table */}
      <div className="mt-6 flex flex-col">
        <div className="overflow-x-auto shadow-md">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right">
                      Asset name
                    </th>
                    <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right">
                      Asset type
                    </th>
                    <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Asset quantity
                    </th>
                    <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right">
                      Added date
                    </th>
                    <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {assets.map((asset) => (
                    <tr
                      className="transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      key={asset._id}
                    >
                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                        {asset.product_name}
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm text-gray-500 dark:text-gray-300">
                        {asset.product_type}
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700">
                        <p className="mx-auto w-16 rounded-full bg-purple-100/60 px-4 py-1.5 text-sm text-purple-500 dark:bg-gray-800">
                          {asset.product_quantity < 10
                            ? String(asset.product_quantity).padStart(2, '0')
                            : asset.product_quantity}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                        {dateFormat(asset.added_date)}
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-center text-sm">
                        <div className="flex items-center justify-center gap-x-6">
                          <button
                            onClick={() => handleDeleteAsset(asset._id)}
                            className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none dark:text-gray-300 dark:hover:text-red-500"
                            aria-label="Delete asset"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                          <Link to={`/asset-list/update/${asset._id}`} aria-label="Edit asset">
                            <button className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none dark:text-gray-300 dark:hover:text-yellow-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </button>
                          </Link>
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
      {totalPages > 1 && (
        <div className="mt-6 flex justify-end">
          <nav aria-label="Page navigation">
            <ul className="flex h-8 items-center -space-x-px text-sm">
              <li>
                <button
                  onClick={handlePrevButton}
                  disabled={currentPage === 1}
                  className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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

              {pages.map((page) => (
                <li key={page}>
                  <button
                    onClick={() => handlePagination(page)}
                    className={`flex h-8 items-center justify-center border px-3 leading-tight ${
                      currentPage === page
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={handleNextButton}
                  disabled={currentPage === totalPages}
                  className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
      )}
    </section>
  );
};

export default AssetList;