import { Card } from '@/components/ui/card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Loading from './loading'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const HistoryPayment = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isMessage, setIsMessage] = useState('')

  async function fetchAPI() {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get(
        'https://idea-academy.up.railway.app/api/v1/orders',
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      setData(res.data.data)
      setIsLoading(false)

      if (res.data.data.length === 0) {
        setIsMessage('History Payment is Empty !')
      }
    } catch (error) {
      setIsMessage(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <div className='flex flex-col space-y-3 md:max-h-[500px] overflow-hidden rounded-md'>
      <h2 className='mx-auto text-lg font-medium'>History Payment</h2>
      {isLoading && <Loading />}
      <div className='overflow-y-auto no-scrollbar rounded-t-md'>
        {isMessage && (
          <h2 className='flex items-center justify-center h-10 font-medium text-red-600 bg-red-300'>
            {isMessage}
          </h2>
        )}
        {data?.map((data, index) => (
          <Card key={index} className='flex flex-col mb-5'>
            <img
              src={data.Course.image}
              className='h-[150px] w-full rounded-t-md'
            />
            <div className='flex flex-col p-3'>
              <b className='text-xs text-active'>{data.Course.category}</b>
              <b className='text-sm'>{data.Course.title}</b>
              <div className='flex items-center mt-3 space-x-3'>
                <Button
                  className={`${data.status === 'PENDING' && 'bg-active'}`}
                  disabled={data.status === 'COMPLETED'}
                >
                  <Link to={`/payment/${data.courseId}`}>{data.status}</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default HistoryPayment
