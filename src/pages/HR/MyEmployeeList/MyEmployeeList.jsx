import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import Title from '../../../components/Title/Title';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../../utils/alert';

const MyEmployeeList = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, refetch } = useQuery({
    queryKey: ['my-team', user?.email, currentPage, itemsPerPage],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/my-team/${user?.email}?page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  const employees = data?.employees;
  const count = data?.count;

  const totalPages = Math.ceil(count / itemsPerPage);
  let pages;
  if (!isPending) {
    pages = [...Array(totalPages).keys()].map((page) => page + 1);
  }

  const { mutateAsync } = useMutation({
    mutationFn: async (removeData) => {
      const empEmail = removeData.employee_info.email;
      const hrEmail = removeData.hr_info.email;

      const { data } = await axiosSecure.delete(
        `/team/${removeData?._id}?empEmail=${empEmail}&hrEmail=${hrEmail}`
      );
      return data;
    },
    onSuccess: (data) => {
      refetch();
      if (data.deletedCount > 0) {
        successAlert('Member has been removed successfully!');
      }
    },
    onError: (error) => {
      errorAlert(error.message);
    },
  });

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handlePrevButton = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextButton = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };

  if (isPending || loading) return <LoadingSpinner h={'90vh'} />;

  return (
    <div className="container mx-auto mb-24 pt-36 px-4 md:px-8">
      <Title title="AssetAura | Employee Directory" />
      <section className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Team Members
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  Photo
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  Role
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
              {employees?.map(({ _id, employee_info }) => (
                <tr
                  key={_id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <img
                      src={employee_info?.image}
                      alt={employee_info.name}
                      className="h-12 w-12 rounded-full object-cover mx-auto"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 capitalize">
                    {employee_info.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-indigo-700 text-sm font-medium capitalize dark:bg-indigo-900 dark:text-indigo-300">
                      {employee_info.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => mutateAsync(employee_info)}
                      className="inline-block rounded bg-red-600 px-4 py-1 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
                      aria-label={`Remove ${employee_info.name} from team`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {!employees?.length && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-10 text-center text-gray-500 dark:text-gray-400"
                  >
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav
          className="mt-6 flex justify-end"
          aria-label="Pagination navigation"
        >
          <ul className="inline-flex items-center space-x-1 text-sm">
            <li>
              <button
                onClick={handlePrevButton}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-l-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                aria-label="Previous Page"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </li>

            {pages?.map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePagination(page)}
                  className={`h-8 w-8 rounded border px-2 text-center font-medium transition-colors ${
                    currentPage === page
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                  aria-current={currentPage === page ? 'page' : undefined}
                  aria-label={`Go to page ${page}`}
                >
                  {page}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={handleNextButton}
                disabled={currentPage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-r-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                aria-label="Next Page"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default MyEmployeeList;
