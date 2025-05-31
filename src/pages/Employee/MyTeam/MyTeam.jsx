import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import Title from '../../../components/Title/Title';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyTeam = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['my-teams-e', user?.email, currentPage, itemsPerPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/my-teams/e/${user.email}?page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
    keepPreviousData: true,
  });

  const myTeams = data?.myTeams ?? [];
  const count = data?.count ?? 0;
  const totalPages = Math.ceil(count / itemsPerPage);

  const pages = !isLoading ? Array.from({ length: totalPages }, (_, i) => i + 1) : [];

  const handlePagination = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrevButton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextButton = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading || isLoading) return <LoadingSpinner h={'50vh'} />;

  return (
    <>
      <Title title={'AssetAura | My Team'} />
      <section className="container mb-24 pt-40">
        <div className="flex flex-col">
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
                        Member Image
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        Member Name
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        Member Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {myTeams.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          No team members found.
                        </td>
                      </tr>
                    ) : (
                      myTeams.map(({ _id, employee_info }) => (
                        <tr
                          key={_id}
                          className="transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <td className="whitespace-nowrap px-2 py-4 text-sm font-medium text-gray-700">
                            <img
                              className="mx-auto h-14 w-14 rounded-full object-cover"
                              src={employee_info?.image}
                              alt={employee_info?.name || 'Member Image'}
                            />
                          </td>
                          <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {employee_info?.name || 'N/A'}
                          </td>
                          <td className="px-2 py-4 text-center">
                            <p className="mx-auto w-max rounded-full bg-purple-100/60 px-4 py-1.5 text-sm capitalize text-purple-500 dark:bg-gray-800">
                              {employee_info?.role || 'N/A'}
                            </p>
                          </td>
                        </tr>
                      ))
                    )}
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
                  disabled={currentPage === 1}
                  className={`ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 px-3 leading-tight ${
                    currentPage === 1
                      ? 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'
                      : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
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
                    aria-current={currentPage === page ? 'page' : undefined}
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
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`flex h-8 items-center justify-center rounded-e-lg border px-3 leading-tight ${
                    currentPage === totalPages || totalPages === 0
                      ? 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'
                      : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
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
    </>
  );
};

export default MyTeam;
