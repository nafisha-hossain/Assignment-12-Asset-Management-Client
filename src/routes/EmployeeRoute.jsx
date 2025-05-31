import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import useRoll from '../hooks/useRoll';

const EmployeeRoute = ({ children }) => {
  const location = useLocation();
  const [role, isPending] = useRoll();
  if (isPending) return <LoadingSpinner h={'60vh'} />;
  if (role === 'employee') return children;

  return <Navigate to={location.pathname} />;
};

EmployeeRoute.propTypes = {
  children: PropTypes.element,
};

export default EmployeeRoute;
