import EmployeeMessage from '../../../components/EmployeeMessage/EmployeeMessage';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAlert from '../../../hooks/useAlert';

const notices = [
  {
    title: 'Important Update: Office Closure',
    date: 'June 10, 2024',
    description:
      'Due to unforeseen circumstances, the office will be closed on June 10th. Please work from home and stay safe.',
  },
  {
    title: 'New Policy: Remote Work Guidelines',
    date: 'June 15, 2024',
    description:
      "We're introducing new guidelines for remote work to enhance flexibility and productivity. Stay tuned for more details.",
  },
  {
    title: 'Employee Survey: Feedback Needed',
    date: 'June 20, 2024',
    description:
      'Your feedback is invaluable to us! Please take a moment to complete the employee survey by June 20th.',
  },
];

const NoticeSection = () => {
  const [isJoin] = useAlert();

  return (
    <section className="container py-6">
      <SectionTitle title="Important Notices" />
      {isJoin === false ? (
        <EmployeeMessage />
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notices.map((notice, idx) => (
            <article
              key={idx}
              className="cursor-pointer rounded-lg bg-white p-5 shadow-md transition-shadow duration-300 hover:shadow-xl dark:bg-gray-900"
              role="region"
              aria-labelledby={`notice-title-${idx}`}
            >
              <h3
                id={`notice-title-${idx}`}
                className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100"
              >
                {notice.title}
              </h3>
              <time
                dateTime={new Date(notice.date).toISOString()}
                className="mb-2 block text-sm text-gray-600 dark:text-gray-300"
              >
                {notice.date}
              </time>
              <p className="text-sm text-gray-700 dark:text-gray-300">{notice.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default NoticeSection;
