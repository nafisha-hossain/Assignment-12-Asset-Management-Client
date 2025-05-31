import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import Title from '../../../components/Title/Title';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { errorAlert, successAlert, warningAlert } from '../../../utils/alert';

const AddAnEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const [loggedInUser, isPending, refetch] = useLoggedInUser();
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isPending: loading, refetch: refetchEmployees } = useQuery({
    queryKey: ['not-affiliated-employee', currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/employees/not-affiliated?page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  const employees = data?.employees ?? [];
  const count = data?.count ?? 0;
  const totalPages = Math.ceil(count / itemsPerPage);
  const pages = !loading ? Array.from({ length: totalPages }, (_, i) => i + 1) : [];

  const mutation = useMutation({
    mutationFn: (teamMemberData) => axiosSecure.post('/teams/single', teamMemberData).then(res => res.data),
    onSuccess: (resData) => {
      if (resData.insertedId) {
        refetch();
        refetchEmployees();
        successAlert('Team member added successfully');
      }
    },
  });

  const handleAddToTeam = async (employee) => {
    if (loggedInUser?.employee_count >= loggedInUser?.member_limit) {
      return warningAlert('Please increase your member limit');
    }

    const teamMemberData = createTeamMemberData(employee);
    try {
      await mutation.mutateAsync(teamMemberData);
    } catch (error) {
      console.error(error);
      errorAlert(error.message);
    }
  };

  const handleCheckbox = (e, employee) => {
    const isChecked = e.target.checked;
    setTeamMembers((prev) => {
      if (isChecked) {
        // Avoid duplicates
        if (!prev.find((tm) => tm._id === employee._id)) {
          return [...prev, employee];
        }
        return prev;
      } else {
        return prev.filter((tm) => tm._id !== employee._id);
      }
    });
  };

  const handleAddMultipleTeamMember = async () => {
    if (loggedInUser?.employee_count >= loggedInUser?.member_limit) {
      return warningAlert('Please increase your member limit');
    }

    if (teamMembers.length === 0) return;

    const teamsData = teamMembers.map(createTeamMemberData);
    try {
      const { data: resData } = await axiosSecure.post('/teams/multiple', teamsData);
      if (resData.acknowledged) {
        setTeamMembers([]);
        refetchEmployees();
        refetch();
        successAlert('Selected members added successfully');
      }
    } catch (error) {
      console.error(error);
      errorAlert(error.message);
    }
  };

  const createTeamMemberData = (employee) => ({
    employeeId: employee._id,
    teamId: loggedInUser._id,
    join_date: new Date(),
    employee_info: {
      name: employee.name,
      email: employee.email,
      image: employee.image,
      date_of_birth: employee.date_of_birth,
      role: employee.role,
    },
    hr_info: {
      name: loggedInUser.name,
      email: loggedInUser.email,
      company_name: loggedInUser.company_name,
      company_logo: loggedInUser.company_logo,
    },
  });

  const handlePagination = (page) => setCurrentPage(page);

  const handlePrevButton = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextButton = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading || isPending) return <LoadingSpinner h="50vh" />;

  return (
    <div className="container mb-24 pt-40">
      <Title title="AssetAura | Add an Employee" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <StatsCard
          title="Total Member"
          value={loggedInUser?.employee_count ?? '0'}
          bgColor="bg-emerald-500"
        />
        <StatsCard
          title="Member Limit"
          value={loggedInUser?.member_limit}
          bgColor="bg-[green]"
        />
      </div>

      <Link to="/payment" className="mt-8 flex items-center justify-center">
        <button className="rounded border border-blue-500 px-8 py-3 text-sm font-bold uppercase text-blue-500 shadow-md transition-colors duration-200 hover:bg-blue-500 hover:text-white dark:text-white">
          increase limit
        </button>
      </Link>

      <section className="mt-24">
        <EmployeeTable
          employees={employees}
          handleCheckbox={handleCheckbox}
          handleAddToTeam={handleAddToTeam}
        />

        <div className="mt-6 flex items-center justify-between">
          <button
            disabled={teamMembers.length < 1}
            onClick={handleAddMultipleTeamMember}
            className={`mt-5 rounded border border-emerald-500 px-6 py-2.5 text-sm font-semibold capitalize text-emerald-500 shadow-tableBtn dark:text-white ${
              teamMembers.length < 1 ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            Add selected member
          </button>

          <Pagination
            pages={pages}
            currentPage={currentPage}
            onPageChange={handlePagination}
            onPrev={handlePrevButton}
            onNext={handleNextButton}
          />
        </div>
      </section>
    </div>
  );
};

const StatsCard = ({ title, value, bgColor }) => (
  <div className={`flex h-[100px] flex-col items-center justify-center  rounded-md ${bgColor} shadow-md`}>
    <h1 className="text-[30px] font-bold text-white">{title}</h1>
    <h3 className="text-[25px] font-extrabold text-white">{value}</h3>
  </div>
);

const EmployeeTable = ({ employees, handleCheckbox, handleAddToTeam }) => (
  <div className="flex flex-col">
    <div className="overflow-x-auto shadow-md">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Select Member', 'Member Image', 'Member Name', 'Member Type', 'Action'].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-2 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              {employees.map(({ _id, image, name, role }) => (
                <tr
                  key={_id}
                  className="transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="whitespace-nowrap px-2 py-4 pl-4 text-sm font-medium text-gray-700">
                    <div className="pl-6">
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheckbox(e, { _id, image, name, role })}
                        className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-4 text-sm font-medium text-gray-700">
                    <img
                      className="mx-auto size-14 rounded-full object-cover"
                      src={image}
                      alt={`${name}'s avatar`}
                    />
                  </td>
                  <td className="whitespace-nowrap px-2 py-4 text-center text-sm font-medium text-gray-700">
                    <span className="capitalize dark:text-gray-300">{name}</span>
                  </td>
                  <td className="px-2">
                    <p className="mx-auto w-24 rounded-full bg-purple-100/60 py-1.5 text-center text-sm capitalize text-purple-500 dark:bg-gray-800">
                      {role}
                    </p>
                  </td>
                  <td className="px-2">
                    <button
                      onClick={() => handleAddToTeam({ _id, image, name, role })}
                      className="mx-auto block w-20 rounded bg-emerald-500 px-4 py-2 text-center text-xs font-semibold text-white shadow-md transition duration-150 hover:bg-emerald-600"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const Pagination = ({ pages, currentPage, onPageChange, onPrev, onNext }) => (
  <div className="flex items-center gap-1">
    <button
      onClick={onPrev}
      disabled={currentPage === 1}
      className="rounded border px-2 py-1 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
    >
      Prev
    </button>
    {pages.map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`rounded border px-2 py-1 ${
          currentPage === page
            ? 'bg-emerald-500 text-white'
            : 'hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        {page}
      </button>
    ))}
    <button
      onClick={onNext}
      disabled={currentPage === pages.length}
      className="rounded border px-2 py-1 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
    >
      Next
    </button>
  </div>
);

export default AddAnEmployee;
