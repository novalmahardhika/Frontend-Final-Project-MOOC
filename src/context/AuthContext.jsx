import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export default function AuthContextProvider(props) {
  const [isAuth, setIsAuth] = useState(false)
  const [token, setToken] = useState('')
  const tokenName = "tokenAdmin"

  useEffect(() => {
    const _token = localStorage.getItem(tokenName)
    if (_token) {
      setIsAuth(true)
      setToken(_token)
    }
  }, [])

  async function login(payload) {
    try {
      const res = await axios.post('https://idea-academy.up.railway.app/api/v1/login', payload)
      const data = res.data.data;
      
      if (!["root", "admin"].includes(data.role.toLowerCase()))
        throw new Error("Gunakan akun admin");
      
      const token = data.token
      localStorage.setItem(tokenName, token)
      setToken(token)
      setIsAuth(true)
    } catch (err) {
      console.error(err.message)
      setIsAuth(false)
      throw err
    }
  }

  async function logout() {
    localStorage.removeItem(tokenName)
    setIsAuth(false)
    setToken('')
  }

  return (
    <AuthContext.Provider value={{ isAuth, token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
