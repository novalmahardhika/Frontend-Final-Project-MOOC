import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useState } from 'react'
import Loading from './loading'

const items = [
  {
    title: 'Current Password',
    id: 'password',
  },
  {
    title: 'New Password',
    id: 'newPassword',
  },
  {
    title: 'Confirm New Password',
    id: 'confirmPassword',
  },
]

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(new Array(3).fill(false))
  const [isMessage, setIsMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPassword, setIsPassword] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  })
  const token = localStorage.getItem('token')
  const clickHandler = (id) => {
    setShowPassword(showPassword.map((x, index) => (id === index ? !x : x)))
  }

  const changeHandler =
    (id) =>
    ({ target: { value } }) =>
      setIsPassword((prev) => ({ ...prev, [id]: value }))

  const submitHandler = async (e) => {
    e.preventDefault()

    for (const data in isPassword) {
      if (isPassword[data] === '') {
        setIsMessage(`Please Input Your ${data} !`)
        return
      }

      if (isPassword[data].length < 8) {
        setIsMessage(`${data} Cannot less than 8 !`)
        return
      }
    }

    if (isPassword['newPassword'] !== isPassword['confirmPassword']) {
      setIsMessage('New Password and Confirm Password doesnt match !')
      return
    }

    if (isPassword['password'] === isPassword['newPassword']) {
      setIsMessage('Password is the same, please change your new Password !')
      return
    }

    try {
      setIsLoading(true)
      setIsMessage('')
      const payload = {
        password: isPassword.password,
        newPassword: isPassword.newPassword,
      }

      await axios.put(
        'https://idea-academy.up.railway.app/api/v1/reset-password',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setIsLoading(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)

      setIsPassword({
        password: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      setIsLoading(true)
      setIsMessage(error.response.data.message)
      setIsLoading(false)

      setTimeout(() => {
        setIsMessage('')
      }, 3000)
    }
  }

  return (
    <div className='flex flex-col'>
      <h2 className='mx-auto text-lg font-medium'>Change Password</h2>
      {isLoading && <Loading />}
      {items?.map((data, index) => (
        <div
          key={`reset-password-${index}`}
          className='relative flex flex-col space-y-3'
        >
          <label htmlFor={data.id} className='mt-3 text-sm font-medium'>
            {data.title}
          </label>
          <Input
            id={data.id}
            type={showPassword[index] ? 'text' : 'password'}
            onChange={changeHandler(data.id)}
            value={isPassword[data.id]}
          />

          <button
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

      {isSuccess && (
        <h1 className='flex items-center justify-center p-2 my-3 text-sm font-medium text-center text-green-500 bg-green-200 rounded-md'>
          Change Password Success
        </h1>
      )}

      {isMessage && (
        <h1 className='flex items-center justify-center p-2 my-3 text-sm font-medium text-center text-red-600 bg-red-300 rounded-md'>
          {isMessage}
        </h1>
      )}

      <Button className='my-3 hover:bg-active' onClick={submitHandler}>
        Change Password
      </Button>
    </div>
  )
}

export default ResetPassword
