import { Input } from '@/components/ui/input'
import LoginImage from './../login_image'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isMessage, setIsMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    if (email.length === 0) {
      setIsMessage('Please Input your Email Address !')

      setTimeout(() => {
        setIsMessage('')
      }, 3000)
      return
    }

    try {
      setIsLoading(true)
      await axios.post(
        `https://idea-academy.up.railway.app/api/v1/forgot-password`,
        { email }
      )

      setIsSubmit(true)
      setIsLoading(false)
      setIsSuccess(true)

      setTimeout(() => {
        navigate('/user/forgot-password/verified')
      }, 3000)
    } catch (error) {
      setIsLoading(true)
      setIsMessage(error.response.data.message)
      setIsLoading(false)

      setTimeout(() => {
        setIsMessage('')
      }, 3000)
    }
  }

  useEffect(() => {
    if (isSubmit) {
      localStorage.setItem('email-forgot', email)
    }
  }, [isSubmit])

  const changeHandler = (e) => {
    const { value } = e.target
    setEmail(value)
  }

  return (
    <div className='flex w-screen h-screen font-poppins'>
      <div className='flex items-center w-screen mx-auto my-auto md:w-1/2'>
        <div className='items-center w-4/5 mx-auto md:w-1/2'>
          <div className='max-w-md p-8 mx-auto space-y-6'>
            <h2 className='text-2xl font-semibold'>Forgot Password</h2>
            <form className='flex flex-col space-y-3' onSubmit={submitHandler}>
              <label htmlFor='email'>Email</label>
              <Input
                id='email'
                type='email'
                placeholder='Contoh: johndee@gmail.com'
                onChange={changeHandler}
              />
              <Button type='submit' className='w-full hover:bg-active'>
                {isLoading ? 'Loading...' : 'Masuk'}
              </Button>
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
            Mengalihkan ke halaman OTP...
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

export default ForgotPassword
