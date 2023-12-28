import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import LoginImage from './../login_image'
import axios from 'axios'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isNameValid, setIsNameValid] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalError, setIsModalError] = useState(false)

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      navigate('/beranda')
    }
  }, [token])

  const validateInput = useCallback(() => {
    // Validasi Nama
    if (!name) {
      setNameError('Nama harus diisi')
      setIsNameValid(false)
    } else {
      setNameError('')
      setIsNameValid(true)
    }

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

    // Validasi Nomor Telepon
    const phoneRegex = /^\+62\d{1,}$/
    if (!phoneNumber) {
      setPhoneNumberError('Nomor telepon harus diisi')
      setIsPhoneNumberValid(false)
    } else if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError('Nomor telepon harus diawali dengan +62')
      setIsPhoneNumberValid(false)
    } else {
      setPhoneNumberError('')
      setIsPhoneNumberValid(true)
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
  }, [name, email, phoneNumber, password])

  useEffect(() => {
    if (isFormSubmitted) {
      validateInput()
      localStorage.setItem('emailOTP', email)
    }
  }, [isFormSubmitted, validateInput, email])

  const onSubmit = async () => {
    setIsFormSubmitted(true)

    if (isNameValid && isEmailValid && isPhoneNumberValid && isPasswordValid) {
      try {
        const payload = {
          name,
          email,
          password,
          phoneNumber,
        }

        await axios.post(
          'https://idea-academy.up.railway.app/api/v1/register',
          payload
        )

        setIsModalVisible(true)

        setTimeout(() => {
          setIsModalVisible(false)
          navigate('/User/otp')
        }, 3000)
      } catch (err) {
        if (!email && !name && !phoneNumber && !password) {
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

  return (
    <div className='flex w-screen h-screen font-poppins'>
      <div className='flex items-center w-screen mx-auto my-auto md:w-1/2'>
        <div className='items-center w-4/5 mx-auto md:w-1/2'>
          <div className='max-w-md p-8 mx-auto space-y-6'>
            <h2 className='text-2xl font-semibold'>Daftar</h2>
            <form className='space-y-7'>
              <div className='relative space-y-1'>
                <div className='block text-sm font-medium text-gray-800'>
                  Nama
                </div>
                <Input
                  placeholder='Nama Lengkap'
                  className={`h-11 ${
                    !isNameValid && isFormSubmitted && 'border-red-500'
                  }`}
                  id='name'
                  maxLength={50}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setIsNameValid(false)
                  }}
                  onBlur={() => setIsFormSubmitted(true)}
                />
                <div
                  className={`text-red-500 text-xs absolute top-full ${
                    !isNameValid && isFormSubmitted
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {!isNameValid && nameError}
                </div>
              </div>

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
                    setIsEmailValid(false)
                  }}
                  onBlur={() => setIsFormSubmitted(true)}
                />
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

              <div className='relative mb-10 space-y-1'>
                <div className='block text-sm font-medium text-gray-800'>
                  Nomor Telepon
                </div>
                <Input
                  placeholder='+62 . '
                  className={`h-11 ${
                    !isPhoneNumberValid && isFormSubmitted && 'border-red-500'
                  }`}
                  id='phoneNumber'
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value)
                    setIsPhoneNumberValid(false)
                  }}
                  onBlur={() => setIsFormSubmitted(true)}
                />
                <div
                  className={`text-red-500 text-xs absolute top-full ${
                    !isPhoneNumberValid && isFormSubmitted
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {!isPhoneNumberValid && phoneNumberError}
                </div>
              </div>

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
                      setIsPasswordValid(false)
                    }}
                    onBlur={() => setIsFormSubmitted(true)}
                  />
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

              <div className='pt-3'>
                <Button
                  type='button'
                  className='w-full h-11 hover:bg-active'
                  onClick={onSubmit}
                >
                  Submit
                </Button>
              </div>
              <div className='flex items-center justify-center pt-2 space-x-2 text-sm'>
                <div>Sudah Punya Akun?</div>
                <Link
                  to='/User/Login'
                  className='font-semibold text-active hover:text-primary'
                >
                  Masuk di sini
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
            Registrasi berhasil! Mengalihkan ke halaman OTP...
          </div>
        </div>
      )}

      {isModalError && (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center h-20'>
          <div className='p-4 text-white rounded-md shadow-md bg-destructive'>
            Email sudah digunakan silahkan coba dengan email lain...
          </div>
        </div>
      )}
    </div>
  )
}

export default Register
