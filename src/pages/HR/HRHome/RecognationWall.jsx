import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const RecognitionWall = () => {
  const employees = [
    {
      id: 1,
      name: 'Alice Johnson',
      achievement: 'Employee of the Month',
      img: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      name: 'Bob Lee',
      achievement: 'Outstanding Performance Award',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 3,
      name: 'Emily Smith',
      achievement: 'Innovation Excellence Award',
      img: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      id: 4,
      name: 'David Miller',
      achievement: 'Leadership Excellence Award',
      img: 'https://randomuser.me/api/portraits/men/76.jpg',
    },
  ];

  return (
    <div>
      <SectionTitle title={'Employee Recognition Wall'} />
      <div>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="group cursor-pointer rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-2xl dark:bg-gray-900"
            >
              <div className="flex h-24 items-center justify-center">
                <img
                  className="h-20 w-20 rounded-full object-cover ring-4 ring-indigo-500 transition-transform duration-300 group-hover:scale-110"
                  src={employee.img}
                  alt={employee.name}
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {employee.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {employee.achievement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecognitionWall;
