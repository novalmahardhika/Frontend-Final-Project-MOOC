import { Button } from '@/components/ui/button'
import LoginImage from '../login_image'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const datas = [
  {
    id: 'password',
    name: 'Password',
  },
  {
    id: 'confirmPassword',
    name: 'Confirm Password',
  },
]

const InputForgotPassword = () => {
  const inputRef = useRef()
  const [activeOtp, setActiveOtp] = useState(0)
  const [isMessage, setIsMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [otp, setOtp] = useState(new Array(6).fill(''))
  const [showPassword, setShowPassword] = useState(new Array(2).fill(false))
  const [isPassword, setIsPassword] = useState({
    password: '',
    confirmPassword: '',
  })
  const navigate = useNavigate()
  const isEmail = localStorage.getItem('email-forgot')

  const encrypEmail = (email) => {
    const emailProvider = email.split('@').pop()
    const encrypted = email.at(0) + '*'.repeat(5) + emailProvider
    return encrypted
  }

  const handleChange = (event, index) => {
    const newOtp = [...otp]
    newOtp[index] = event.target.value

    if (!event.target.value) setActiveOtp(index - 1)
    else setActiveOtp(index + 1)

    setOtp(newOtp)
  }

  const passwordHandler =
    (id) =>
    ({ target: { value } }) =>
      setIsPassword({ ...isPassword, [id]: value })

  useEffect(() => {
    inputRef.current?.focus()

    if (isSuccess) {
      localStorage.removeItem('email-forgot')
    }
  }, [activeOtp, isSuccess])

  const clickHandler = (id) => {
    setShowPassword(showPassword.map((x, index) => (id === index ? !x : x)))
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const payload = {
      email: isEmail,
      otp: otp.join(''),
      password: isPassword.password,
    }

    if (
      isPassword['password'].length < 8 ||
      isPassword['confirmPassword'].length < 8
    ) {
      setIsMessage('Password cannot less than 8 character')

      setTimeout(() => {
        setIsMessage('')
      }, 3000)
      return
    }

    if (isPassword['password'] !== isPassword['confirmPassword']) {
      setIsMessage('Password and confirm Password doesnt match.')

      setTimeout(() => {
        setIsMessage('')
      }, 3000)
      return
    }

    try {
      setIsLoading(true)
      await axios.put(
        `https://idea-academy.up.railway.app/api/v1/forgot-password`,
        payload
      )

      setIsSuccess(true)

      setTimeout(() => {
        setIsLoading(false)
        navigate('/user/login')
        setIsSuccess(false)
        setIsMessage('')
      }, 3000)
    } catch (error) {
      setIsLoading(true)
      setIsMessage(error.response.data.message)

      setTimeout(() => {
        setIsMessage('')
        setIsLoading(false)
      }, 3000)
    }
  }

  return (
    <div className='flex w-screen h-screen font-poppins'>
      <div className='flex items-center w-screen mx-auto my-auto md:w-1/2'>
        <div className='items-center w-4/5 mx-auto md:w-1/2'>
          <div className='max-w-md p-8 mx-auto space-y-6'>
            <h2 className='flex justify-center text-2xl font-semibold text-center '>
              {' '}
              Masukkan New Password
            </h2>
            <form className='space-y-7' onSubmit={submitHandler}>
              <div className='relative space-y-3'>
                <h2 className='text-sm font-medium text-center text-gray-800'>
                  Ketik 6 digit kode yang dikirimkan ke {encrypEmail(isEmail)}
                </h2>
                <div className='flex justify-center mt-3 space-x-3'>
                  {otp.map((x, index) => (
                    <Input
                      key={`otp-${index}`}
                      ref={index === activeOtp ? inputRef : null}
                      className='w-10 text-center'
                      maxLength='1'
                      onChange={(e) => handleChange(e, index)}
                    />
                  ))}
                </div>
              </div>

              <div className='flex flex-col space-y-3'>
                {datas.map((item, index) => (
                  <div
                    key={`input-forgot-password${index}`}
                    className='relative'
                  >
                    <label htmlFor={item.id} className='text-sm'>
                      {item.name}
                    </label>
                    <Input
                      id={item.id}
                      type={showPassword[index] ? 'text' : 'password'}
                      onChange={passwordHandler(item.id)}
                    />
                    <button
                      type='button'
                      className='absolute bottom-2.5 right-2 flex items-center'
                      onClick={() => clickHandler(index)}
                    >
                      <FontAwesomeIcon
                        icon={showPassword[index] ? faEye : faEyeSlash}
                        className=' text-primary'
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className='pt-3'>
                <Button type='submit' className='w-full h-11 hover:bg-active'>
                  {isLoading ? 'Loading...' : 'Button'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='items-center hidden w-1/2 h-full mx-auto my-auto md:flex'>
        <LoginImage />
      </div>

      {isSuccess && (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center h-20'>
          <div className='p-4 text-white rounded-md shadow-md bg-success'>
            Registrasi berhasil! Mengalihkan ke halaman login...
          </div>
        </div>
      )}

      {isMessage && (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center h-20'>
          <div className='p-4 text-white rounded-md shadow-md bg-destructive'>
            {isMessage}
          </div>
        </div>
      )}
    </div>
  )
}

export default InputForgotPassword
