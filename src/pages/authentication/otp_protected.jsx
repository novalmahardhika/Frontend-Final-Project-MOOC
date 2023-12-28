import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function OtpProtected({ children }) {
  const token = localStorage.getItem('emailOTP')
  if (!token) return <Navigate to='/User/Register' />
  return children
}

OtpProtected.propTypes = {
  children: PropTypes.element.isRequired,
}

export default OtpProtected
