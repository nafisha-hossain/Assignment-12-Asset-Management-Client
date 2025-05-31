import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const Title = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

Title.propTypes = {
  title: PropTypes.string,
};

export default Title;
