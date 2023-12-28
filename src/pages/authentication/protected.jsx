import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function UserProtected({ children }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to='/User/Login' />
  return children
}

UserProtected.propTypes = {
  children: PropTypes.element.isRequired,
}

export default UserProtected
