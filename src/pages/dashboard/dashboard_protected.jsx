import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function DashboardProtected({ children }) {
  const token = localStorage.getItem('tokenAdmin')
  if (!token) return <Navigate to='/admin/login' />
  return children
}

DashboardProtected.propTypes = {
  children: PropTypes.element.isRequired,
}

export default DashboardProtected
