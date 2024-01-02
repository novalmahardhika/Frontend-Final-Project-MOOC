import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

function UserProtected({ children }) {
  const { token } = useContext(AuthContext);
  if (!token) return <Navigate to="/admin/login" />;
  return children;
}

UserProtected.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserProtected;
