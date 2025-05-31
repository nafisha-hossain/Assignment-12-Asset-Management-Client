import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <span className="text-center text-3xl font-bold">Loading...</span>;
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to={'/login'} replace></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
