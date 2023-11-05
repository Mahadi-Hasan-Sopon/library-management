import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../utils/LoadingSpinner";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && !user) {
    return <Navigate state={location.pathname} to="/login" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
