import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, isAuthenticated }) {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  return isAuth ? element : <Navigate to="/login" />;
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedRoute;