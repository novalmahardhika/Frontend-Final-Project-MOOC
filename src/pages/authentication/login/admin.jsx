import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useCallback, useContext } from 'react'
import LoginImage from './../login_image'
import { useNavigate } from 'react-router'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'

const AdminLogin = () => {
  const { token, login } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalError, setIsModalError] = useState(false)

  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const validateInput = useCallback(() => {
    // Validasi Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setEmailError('Email Harus diisi')
      setIsEmailValid(false)
    } else if (!emailRegex.test(email)) {
      setEmailError('Format email tidak valid')
      setIsEmailValid(false)
    } else {
      setEmailError('')
      setIsEmailValid(true)
    }

    // Validasi Password
    if (!password) {
      setPasswordError('Password harus diisi')
      setIsPasswordValid(false)
      // } else if (password.length < 8 || password.length > 12) {
      // setPasswordError("Password harus terdiri dari 8-12 karakter");
      // setIsPasswordValid(false);
    } else {
      setPasswordError('')
      setIsPasswordValid(true)
    }
  }, [email, password])

  useEffect(() => {
    if (isFormSubmitted) {
      validateInput()
    }
  }, [isFormSubmitted, validateInput])

  const onSubmit = async () => {
    setIsFormSubmitted(true)

    // Cek apakah semua input valid
    if (isEmailValid && isPasswordValid) {
      try {
        const payload = {
          email,
          password,
        }
        
        await login(payload)
        
        setEmail('')
        setPassword('')
        setIsModalVisible(true)
      } catch (err) {
        if (!email && !password) {
          console.log(err)
        } else {
          setIsModalError(true)

          setTimeout(() => {
            setIsModalError(false)
          }, 3000)
        }
      }
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/admin')
    }
  }, [token, navigate])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className='flex w-screen h-screen font-poppins' onKeyDown={(e) => {if (e.key == "Enter") document.querySelector("button").click();}}>
      <div className='items-center hidden w-screen h-full mx-auto my-auto md:flex md:w-1/2'>
        <LoginImage />
      </div>
      <div className='flex items-center w-4/5 mx-auto my-auto md:w-1/2'>
        <div className='items-center w-4/5 mx-auto md:w-1/2'>
          <div className='max-w-md p-8 mx-auto space-y-6'>
            <h2 className='text-2xl font-semibold text-center'>Masuk Admin</h2>
            <form className='space-y-7'>
              {/* Email */}
              <div className='relative space-y-1'>
                <div className='block text-sm font-medium text-gray-800'>
                  Email
                </div>
                <Input
                  placeholder='Contoh: johndee@gmail.com'
                  className={`h-11 ${
                    !isEmailValid && isFormSubmitted && 'border-red-500'
                  }`}
                  id='email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setIsEmailValid(false) // Setel ke false saat ada perubahan
                  }}
                  onBlur={() => setIsFormSubmitted(true)}
                />
                {/* Pesan Kesalahan Email */}
                <div
                  className={`text-red-500 text-xs absolute top-full ${
                    !isEmailValid && isFormSubmitted
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {!isEmailValid && emailError}
                </div>
              </div>

              {/* Password */}
              <div className='relative mb-10 space-y-1'>
                <div className='block text-sm font-medium text-gray-800'>
                  Password
                </div>
                <div className='relative flex items-center space-x-4'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    placeholder='Buat Password'
                    maxLength={12}
                    className={`h-11 relative ${
                      !isPasswordValid && isFormSubmitted && 'border-red-500'
                    }`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setIsPasswordValid(false) // Setel ke false saat ada perubahan
                    }}
                    onBlur={() => setIsFormSubmitted(true)}
                  />
                  {/* Toggle Password */}
                  <div
                    className='absolute transform -translate-y-1/2 cursor-pointer text-primary right-4 top-1/2'
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className=''
                    />
                  </div>
                </div>
                {/* Pesan Kesalahan Password */}
                <div
                  className={`text-red-500 text-xs absolute top-full ${
                    !isPasswordValid && isFormSubmitted
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {!isPasswordValid && passwordError}
                </div>
              </div>

              {/* Tombol Submit */}
              <div className='pt-3'>
                <Button
                  type='button'
                  className='w-full h-11 hover:bg-active'
                  onClick={onSubmit}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center h-20'>
          <div className='p-4 text-white rounded-md shadow-md bg-success'>
            Login berhasil! Mengalihkan ke halaman Beranda...
          </div>
        </div>
      )}
      {isModalError && (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center h-20'>
          <div className='p-4 text-white rounded-md shadow-md bg-destructive'>
            Login gagal silahkan coba kembali...
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLogin
