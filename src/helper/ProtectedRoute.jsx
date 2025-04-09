import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  return isAuth ? element : <Navigate to="/login" replace />;
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
