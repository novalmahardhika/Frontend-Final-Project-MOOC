import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faGem,
  faClock,
  faMedal,
  faBook,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'

const PaymentsPage = () => {
  // const navigate = useNavigate();
  const [payments, setPayments] = useState([])
  const token = localStorage.getItem('token')

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(
          `https://idea-academy.up.railway.app/api/v1/orders`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const sortedPayments = res.data.data
          ? res.data.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          : []
        setPayments(sortedPayments)
      } catch (err) {
        console.log(err)
      }
    }

    fetchPayments()
  }, [token])

  return (
    <>
      {isMobile ? (
        <>
          <div className='h-full mt-5 mb-20 font-poppins'>
            <div className='flex flex-wrap justify-center w-full gap-5 font-poppins md:gap-10 md:mb-20 md:justify-start'>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <Card
                    key={payment.id}
                    className='md:w-[420px] w-[300px] h-[250px] md:h-full '
                  >
                    <div className='cursor-pointer hover:opacity-50 hover:transition-transform'>
                      <div className='absolute px-3 py-1 text-xs bg-white rounded-tl-sm rounded-br-sm z-1'>
                        {formatDistanceToNow(new Date(payment.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                      <img
                        className='object-cover w-full h-24 rounded-t-sm md:h-48'
                        src={payment.Course.image}
                        alt={payment.Course.title}
                      />
                    </div>
                    <div className='p-4 space-y-1'>
                      <div className='flex items-center justify-between'>
                        <div className='text-xs font-semibold text-active '>
                          {payment.Course.category}
                        </div>
                        <div className='flex space-x-2'>
                          <FontAwesomeIcon
                            icon={faStar}
                            className='text-sm text-active ms:text-lg'
                          />
                          <div className='text-xs md:text-sm'>
                            {payment.Course.rating}
                          </div>
                        </div>
                      </div>
                      <div className='text-sm font-semibold text-primary'>
                        {payment.Course.title}
                      </div>
                      <div className='text-xs'>by {payment.Course.creator}</div>

                      <div className='flex items-center pt-2'>
                        <FontAwesomeIcon
                          icon={faMedal}
                          className='text-success'
                        />
                        <div className='text-xs'>
                          {payment.Course.level === 'beginner'
                            ? 'Beginner'
                            : payment.Course.level === 'intermediate'
                            ? 'Intermediate'
                            : 'Advance'}
                        </div>
                      </div>

                      <div className='pt-2'>
                        {payment.status === 'PENDING' ? (
                          <Link to={`/payment/${payment.id}`}>
                            <Button className='flex h-6 gap-3 text-xs text-white md:h-7 bg-active'>
                              <FontAwesomeIcon icon={faClock} /> Waiting for
                              Payment{' '}
                            </Button>
                          </Link>
                        ) : payment.status === 'CANCELED' ? (
                          <Link to={`/payment/${payment.id}`}>
                            <Button className='flex h-6 gap-3 text-xs text-white md:h-7 bg-active'>
                              <FontAwesomeIcon icon={faClock} /> Waiting for
                              Payment{' '}
                            </Button>
                          </Link>
                        ) : (
                          <Link to={`/Course/${payment.courseId}`}>
                            <Button className='flex h-6 gap-3 text-xs md:h-7 bg-success'>
                              <FontAwesomeIcon icon={faGem} /> Paid{' '}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className='pt-5 text-sm'>
                  Saat ini Anda belum memiliki riwayat pembayaran.
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='relative w-screen overflow-y-scroll -top-16 font-poppins'>
            <div className='flex flex-wrap gap-10'>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <Card
                    key={payment.id}
                    className='md:w-[420px] w-[300px] h-[250px] md:h-full '
                  >
                    <div className='cursor-pointer hover:opacity-50 hover:transition-transform'>
                      <div className='absolute px-3 py-1 text-xs bg-white rounded-tl-sm rounded-br-sm z-1'>
                        {formatDistanceToNow(new Date(payment.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                      <img
                        className='object-cover w-full h-24 rounded-t-sm md:h-48'
                        src={payment.Course.image}
                        alt={payment.Course.title}
                      />
                    </div>
                    <div className='p-4 space-y-1'>
                      <div className='flex items-center justify-between'>
                        <div className='text-xs font-semibold text-active '>
                          {payment.Course.category}
                        </div>
                        <div className='flex space-x-2'>
                          <FontAwesomeIcon
                            icon={faStar}
                            className='text-sm text-active ms:text-lg'
                          />
                          <div className='text-xs md:text-sm'>
                            {payment.Course.rating}
                          </div>
                        </div>
                      </div>
                      <div className='text-sm font-semibold text-primary'>
                        {payment.Course.title}
                      </div>
                      <div className='text-xs'>by {payment.Course.creator}</div>
                      <div className='flex flex-wrap items-center justify-between gap-3 pt-2 pb-3'>
                        <div className='flex items-center space-x-2'>
                          <FontAwesomeIcon
                            icon={faMedal}
                            className='text-success'
                          />
                          <div className='text-xs'>
                            {payment.Course.level === 'beginner'
                              ? 'Beginner'
                              : payment.Course.level === 'intermediate'
                              ? 'Intermediate'
                              : 'Advance'}
                          </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <FontAwesomeIcon
                            icon={faBook}
                            className='text-success'
                          />
                          <div className='text-xs'>
                            {payment.Course.totalModule} Modules
                          </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <FontAwesomeIcon
                            icon={faClock}
                            className='text-success'
                          />
                          <div className='text-xs'>
                            {payment.Course.totalDuration} Menit
                          </div>
                        </div>
                      </div>
                      <div>
                        {payment.status === 'PENDING' ? (
                          <Link to={`/payment/${payment.id}`}>
                            <Button className='flex h-6 gap-3 text-xs text-white md:h-7 bg-active'>
                              <FontAwesomeIcon icon={faClock} /> Waiting for
                              Payment{' '}
                            </Button>
                          </Link>
                        ) : (
                          <Link to={`/Course/${payment.courseId}`}>
                            <Button className='flex h-6 gap-3 text-xs md:h-7 bg-success'>
                              <FontAwesomeIcon icon={faGem} /> Paid{' '}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className='pt-5 text-sm'>
                  Saat ini Anda belum memiliki riwayat pembayaran.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default PaymentsPage
