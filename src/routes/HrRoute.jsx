import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import useRoll from '../hooks/useRoll';

const HrRoute = ({ children }) => {
  const location = useLocation();
  //   console.log(location);
  const [role, isLoading] = useRoll();
  if (isLoading) return <LoadingSpinner h={'60vh'} />;
  if (role === 'HR') return children;

  return <Navigate to={location.pathname} />;
};

HrRoute.propTypes = {
  children: PropTypes.element,
};

export default HrRoute;
