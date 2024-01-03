import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import Loading from './loading'
import imageProfile from '../../assets/profile.png'

const items = [
  {
    title: 'Nama',
    id: 'name',
  },
  {
    title: 'Email',
    id: 'email',
  },
  {
    title: 'Nomor Hp',
    id: 'phoneNumber',
  },
  {
    title: 'Alamat',
    id: 'address',
  },
]

const UserProfile = () => {
  const hiddenFileInput = useRef(null)
  const [isLoadingFetch, setIsLoadingFetch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSelected, setIsSelected] = useState()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isMessage, setIsMessage] = useState('')
  const [preview, setPreview] = useState()
  const [isData, setIsData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  })

  const token = localStorage.getItem('token')

  async function fetchAPI() {
    try {
      setIsLoadingFetch(true)
      const res = await axios.get(
        `https://idea-academy.up.railway.app/api/v1/current-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = res.data.data

      setIsData({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber || '',
        address: data.address || '',
        image: data.image,
      })

      setIsLoadingFetch(false)
    } catch (error) {
      setIsMessage(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  useEffect(() => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }

    if (!isSelected) {
      setPreview(null)
      return
    }

    const objUrl = URL.createObjectURL(isSelected)
    setPreview(objUrl)
  }, [isSelected])

  const imageHandler = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setIsSelected(null)
      return
    }
    setIsSelected(e.target.files[0])
  }

  const changeHandler =
    (id) =>
    ({ target: { value } }) =>
      setIsData((prev) => ({ ...prev, [id]: value }))

  const clickHandler = async () => {
    const phoneRegex = /^\+62\d{1,}$/
    if (!phoneRegex.test(isData.phoneNumber)) {
      setIsMessage('Phone Number should be +62 and use Number')
      return
    }
    const formData = new FormData()
    formData.append('image', isSelected || isData.image)
    formData.append('name', isData.name)
    formData.append('email', isData.email)
    formData.append('phoneNumber', isData.phoneNumber)
    formData.append('address', isData.address)
    try {
      setIsLoading(true)
      await axios.put(
        `https://idea-academy.up.railway.app/api/v1/users`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setIsSuccess(true)
      setIsLoading(false)
      setIsMessage('')

      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    } catch (error) {
      setIsLoading(false)
      setIsMessage(error.response.data.message)

      setTimeout(() => {
        setIsMessage('')
      }, 3000)
    }
  }

  const refHandler = () => {
    hiddenFileInput.current.click()
  }

  return (
    <div className='flex flex-col '>
      <button
        onClick={refHandler}
        className='w-[80px] h-[80px] rounded-full relative mx-auto  border-2 hover:border-active duration-300 border-primary flex justify-center items-center'
      >
        {isLoadingFetch ? (
          <img src={imageProfile} className='rounded-full' />
        ) : (
          <img
            src={preview ? preview : isData.image}
            className='w-[75px] h-[75px] rounded-full object-cover'
          />
        )}
      </button>
      <input
        type='file'
        onChange={imageHandler}
        className='hidden'
        ref={hiddenFileInput}
      />

      {isLoadingFetch ? (
        <Loading />
      ) : (
        items.map((data, index) => (
          <div
            key={`input-${data.title}-${index}`}
            className='flex flex-col space-y-3'
          >
            <label htmlFor={data.id} className='mt-3 text-sm font-medium'>
              {data.title}
            </label>
            <Input
              id={data.id}
              className='w-full'
              defaultValue={isData?.[data.id]}
              onChange={changeHandler(data.id)}
            />
          </div>
        ))
      )}

      {isLoading && <Loading />}

      {isSuccess && (
        <h1 className='flex items-center justify-center p-2 my-3 text-sm font-medium text-center text-green-500 bg-green-200 rounded-md'>
          Update Profile Success
        </h1>
      )}

      {isMessage && (
        <h1 className='flex items-center justify-center p-2 my-3 text-sm font-medium text-center text-red-600 bg-red-300 rounded-md'>
          {isMessage}
        </h1>
      )}
      <Button className='my-3 hover:bg-active' onClick={clickHandler}>
        Perbarui Profil
      </Button>
    </div>
  )
}

export default UserProfile
