import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect, useRef } from 'react'

import { useNavigate } from 'react-router-dom'
import LoginImage from '../login_image'
import axios from 'axios'

const Otp = () => {
  const inputRef = useRef()
  const [seconds, setSeconds] = useState(60)
  const [activeOtp, setActiveOtp] = useState(0)
  const [isEmail, setIsEmail] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [otp, setOtp] = useState(new Array(6).fill(''))
  const [errMsg, setErrMsg] = useState({
    err: false,
    message: '',
  })

  const navigate = useNavigate()

  const encrypEmail = (data) => {
    const emailProvider = data.split('@').pop()
    const encrypted = data.at(0) + '*'.repeat(5) + emailProvider
    return encrypted
  }

  useEffect(() => {
    const email = localStorage.getItem('emailOTP')
    setIsEmail(email)

    if (isSubmit) {
      localStorage.removeItem('emailOTP')
    }
  }, [isSubmit])

  const handleChange = (event, index) => {
    const newOtp = [...otp]
    newOtp[index] = event.target.value

    if (!event.target.value) setActiveOtp(index - 1)
    else setActiveOtp(index + 1)

    setOtp(newOtp)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOtp])

  const onSubmit = async () => {
    const payload = {
      email: isEmail,
      otp: otp.join(''),
    }

    try {
      setIsSubmit(true)
      await axios.post(
        'https://idea-academy.up.railway.app/api/v1/account-verify',
        payload
      )
      navigate('/user/login')
    } catch (error) {
      setErrMsg((prev) => ({
        ...prev,
        err: true,
        message: error.response.data.message,
      }))

      setTimeout(() => {
        setErrMsg((prev) => ({
          ...prev,
          err: false,
          message: '',
        }))
      }, 3000)
    }
  }

  useEffect(() => {
    const timeOutOtp = setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
    }, 1000)

    return () => clearTimeout(timeOutOtp)
  }, [seconds])

  console.log(seconds)

  const resendOtp = async () => {
    const payload = {
      email: isEmail,
    }

    try {
      await axios.post(
        `https://idea-academy.up.railway.app/api/v1/resend-otp`,
        payload
      )
    } catch (error) {
      setErrMsg(error.response.data.message)

      setTimeout(() => {
        setErrMsg('')
      }, 3000)
    }
  }

  return (
    <div className='flex w-screen h-screen font-poppins'>
      <div className='flex items-center w-screen mx-auto my-auto md:w-1/2'>
        <div className='items-center w-4/5 mx-auto md:w-1/2'>
          <div className='max-w-md p-8 mx-auto space-y-6'>
            <h2 className='flex justify-center text-2xl font-semibold'>
              {' '}
              Masukkan OTP
            </h2>
            <form className='space-y-7'>
              <div className='relative space-y-3'>
                <div className='text-sm font-medium text-center text-gray-800'>
                  Ketik 6 digit kode yang dikirimkan ke {encrypEmail(isEmail)}
                </div>
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
                <div
                  className={`text-red-500 text-xs absolute right-0 left-0 text-center ${
                    errMsg.err ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {errMsg.message}
                </div>
              </div>

              <div className='flex justify-between space-x-1 text-sm'>
                <p>OTP Belum Terkirim ? </p>
                {seconds === 0 ? (
                  <button
                    className='font-medium text-primary hover:text-active'
                    type='button'
                    onClick={resendOtp}
                  >
                    Kirim Ulang OTP
                  </button>
                ) : (
                  <p className='font-semibold'>{seconds} Detik</p>
                )}
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
            </form>
          </div>
        </div>
      </div>
      <div className='items-center hidden w-1/2 h-full mx-auto my-auto md:flex'>
        <LoginImage />
      </div>
    </div>
  )
}

export default Otp
