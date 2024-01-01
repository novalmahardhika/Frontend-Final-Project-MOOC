import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useCallback } from 'react'
import LoginImage from './../login_image'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalError, setIsModalError] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')

  const [passwordError, setPasswordError] = useState('')

  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const token = localStorage.getItem('token')
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
    } else if (password.length < 8 || password.length > 12) {
      setPasswordError('Password harus terdiri dari 8-12 karakter')
      setIsPasswordValid(false)
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
        const res = await axios.post(
          'https://idea-academy.up.railway.app/api/v1/login',
          payload
        )

        setIsModalVisible(true)

        setTimeout(() => {
          setIsModalVisible(false)
          setEmail('')
          setPassword('')
          localStorage.setItem('token', res.data.data.token)
          navigate('/beranda')
        }, 3000)
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (token) {
      navigate('/beranda')
    }
  }, [token, navigate])

  return (
    <div className='flex w-screen h-screen font-poppins'>
      <div className='flex items-center w-screen mx-auto my-auto md:w-1/2'>
        <div className='items-center w-4/5 mx-auto md:w-1/2'>
          <div className='max-w-md p-8 mx-auto space-y-6'>
            <h2 className='text-2xl font-semibold'>Masuk</h2>
            <form className='space-y-6'>
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

                <Link
                  to={'/user/forgot-password'}
                  className='flex justify-end text-sm font-medium text-gray-900 text-end hover:text-active'
                >
                  Lupa Password ?
                </Link>
              </div>

              {/* Tombol Submit */}
              <div className='pt-3 '>
                <Button
                  type='button'
                  className='w-full h-11 hover:bg-active'
                  onClick={onSubmit}
                >
                  Submit
                </Button>
              </div>

              <div className='flex items-center justify-center pt-2 space-x-2 text-sm'>
                <div>Belum Punya Akun?</div>
                <Link
                  to='/User/Register'
                  className='font-semibold text-active hover:text-primary'
                >
                  Daftar di sini
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='items-center hidden w-1/2 h-full mx-auto my-auto md:flex'>
        <LoginImage />
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

export default UserLogin
