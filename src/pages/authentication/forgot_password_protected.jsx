import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function ForgotPasswordProtected({ children }) {
  const token = localStorage.getItem('email-forgot')
  if (!token) return <Navigate to='/User/forgot-password' />
  return children
}

ForgotPasswordProtected.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ForgotPasswordProtected
