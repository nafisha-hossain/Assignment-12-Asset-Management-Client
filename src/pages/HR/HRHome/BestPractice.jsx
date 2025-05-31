import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import { FiThumbsUp, FiMessageCircle, FiStar } from 'react-icons/fi';

const tips = [
  {
    title: 'Improve Employee Engagement',
    content:
      'Encourage regular feedback, provide growth opportunities, and recognize achievements to keep employees engaged and motivated.',
    icon: FiThumbsUp,
    bgColor: 'bg-gray-50 dark:bg-gray-900',
    iconBg: 'bg-blue-100 dark:bg-blue-900',
  },
  {
    title: 'Effective Communication',
    content:
      'Promote clear and open communication channels within the team to ensure everyone is on the same page and issues are addressed promptly.',
    icon: FiMessageCircle,
    bgColor: 'bg-gray-50 dark:bg-gray-900',
    iconBg: 'bg-green-100 dark:bg-green-900',
  },
  {
    title: 'Foster a Positive Work Culture',
    content:
      'Create a supportive and inclusive environment where employees feel valued and respected, enhancing overall job satisfaction.',
    icon: FiStar,
    bgColor: 'bg-gray-50 dark:bg-gray-900',
    iconBg: 'bg-yellow-100 dark:bg-yellow-900',
  },
];

const BestPractice = () => {
  return (
    <div>
      <SectionTitle title={'HR Tips and Best Practices'} />
      <div className="mx-auto mt-10">
        <ul className="space-y-8">
          {tips.map((tip, index) => (
            <li
              key={index}
              className={`flex min-h-[140px] flex-col space-y-4 rounded-lg p-6 shadow-lg md:flex-row md:items-start md:space-x-6 md:space-y-0 ${tip.bgColor}`}
            >
              {/* Redesigned icon container */}
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full text-5xl shadow-md transition-transform duration-300 hover:scale-110 ${tip.iconBg} text-gray-800 dark:text-gray-100`}
              >
                {tip.icon}
              </div>

              <div className="w-full md:flex-1">
                <h3 className="mb-3 font-semibold text-gray-800 dark:text-gray-100 md:text-2xl">
                  {tip.title}
                </h3>
                <p className="text-base leading-7 text-gray-700 dark:text-gray-300 md:text-lg">
                  {tip.content}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BestPractice;
