import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import usePayment from '../hooks/usePayment';

import PropTypes from 'prop-types';

const PaymentRoute = ({ children }) => {
  const [paymentStatus, isPending] = usePayment();
  if (isPending) return <LoadingSpinner h={'60vh'} />;
  if (paymentStatus === 'success') return children;

  return <Navigate to={'/payment'} />;
};

PaymentRoute.propTypes = {
  children: PropTypes.element,
};

export default PaymentRoute;
