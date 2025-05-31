import PropTypes from 'prop-types';
const SectionTitle = ({ title }) => {
  return (
    <h2 className="text-center text-[clamp(24px,4vw,35px)] font-bold text-gray-800 dark:text-white">
      {title}
    </h2>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string,
};

export default SectionTitle;
