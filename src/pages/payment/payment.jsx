import { useCallback, useEffect, useState } from 'react'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FormItem } from '@/components/ui/form'

const Payment = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [paymentDetail, setPaymentDetail] = useState(null)
  const [image, setImage] = useState(null)
  const [ppn, setPPN] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(null)

  const [createdOrderId, setCreatedOrderId] = useState(null)
  const [courseType, setCourseType] = useState(null)

  const [paymentSubmitted, setPaymentSubmitted] = useState(false)
  const [paymentDone, setPaymentDone] = useState({
    paymentMethod: '',
    cardNumber: '',
    cardHolderName: '',
    cvv: '',
    expiryDate: '',
  })

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [activeTab, setActiveTab] = useState('')
  const [errorFetchingCourse, setErrorFetchingCourse] = useState('')

  const [errors, setErrors] = useState({
    cardNumber: '',
    cardHolderName: '',
    cvv: '',
    expiryDate: '',
  })

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const responsePost = await axios.get(
          `https://idea-academy.up.railway.app/api/v1/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(responsePost.data.data.Course)

        const courseData = responsePost.data.data.Course
        const serverExpirationTime = new Date(
          responsePost.data.data.expiredDateAt
        ).getTime()
        const currentTime = new Date().getTime()

        if (serverExpirationTime > currentTime) {
          setActiveTab('Bank Transfer')
          const id = setInterval(() => {
            const now = new Date().getTime()
            const difference = serverExpirationTime - now

            if (difference > 0) {
              const totalSeconds = Math.floor(difference / 1000)
              const hours = Math.floor(totalSeconds / 3600)
              const minutes = Math.floor((totalSeconds % 3600) / 60)
              const seconds = totalSeconds % 60

              setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
            } else {
              clearInterval(id)
              setTimeRemaining('Expired')
            }
          }, 1000)

          setPaymentDetail(courseData.price)
          setImage(courseData.image)
          setPPN(courseData.price * 0.11)
          setCreatedOrderId(responsePost.data.data.id)
          setCourseType(responsePost.data.data.Course.type)
          setPaymentSubmitted(true)
        } else {
          setTimeRemaining('Expired')
        }
      } catch (err) {
        console.error('Error Payment Detail:', err)
        if (err.response) {
          const backendErrorMessage = err.response.data.message
          console.log('Backend Error Message:', backendErrorMessage)
          setErrorFetchingCourse(
            `Failed To Load Payment Detail: ${backendErrorMessage}`
          )
        } else {
          setErrorFetchingCourse('Error Payment Detail: Please try again.')
        }
      }
    }

    fetchOrderDetail()
  }, [id, token, paymentSubmitted])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const validateCreditCardInfo = useCallback(() => {
    let valid = true

    // Validate card number
    const cardNumberWithoutSpaces = paymentDone.cardNumber.replace(/\s/g, '')
    if (!/^\d{16}$/.test(cardNumberWithoutSpaces)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardNumber: 'Please enter a valid 16-digit card number.',
      }))
      valid = false
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, cardNumber: '' }))
    }

    // Validate card holder name
    if (!/^[a-zA-Z ]+$/.test(paymentDone.cardHolderName)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardHolderName: 'Please enter a valid card holder name.',
      }))
      valid = false
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, cardHolderName: '' }))
    }

    // Validate CVV
    if (!/^\d{3,4}$/.test(paymentDone.cvv)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cvv: 'Please enter a valid CVV.',
      }))
      valid = false
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, cvv: '' }))
    }

    // Validate expiry date
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDone.expiryDate)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expiryDate: 'Please enter a valid expiry date (MM/YY).',
      }))
      valid = false
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, expiryDate: '' }))
      const [month, year] = paymentDone.expiryDate.split('/')
      const currentYear = new Date().getFullYear() % 100
      if (
        parseInt(year, 10) < currentYear ||
        (parseInt(year, 10) === currentYear && parseInt(month, 10) < 1)
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          expiryDate: 'The card has expired.',
        }))
        valid = false
      }
    }

    return valid
  }, [
    paymentDone.cardNumber,
    paymentDone.cardHolderName,
    paymentDone.cvv,
    paymentDone.expiryDate,
  ])

  const handlePayment = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }

      let payload = {
        paymentMethod: paymentDone.paymentMethod
          ? 'Credit Card'
          : 'Bank Transfer',
      }

      if (paymentDone.paymentMethod === 'Credit Card') {
        payload = {
          ...payload,
          cardNumber: paymentDone.cardNumber,
          cardHolderName: paymentDone.cardHolderName,
          cvv: paymentDone.cvv,
          expiryDate: paymentDone.expiryDate,
        }
      }

      if (
        paymentDone.paymentMethod === 'Credit Card' &&
        !validateCreditCardInfo()
      ) {
        return
      }

      const responsePut = await axios.put(
        `https://idea-academy.up.railway.app/api/v1/orders/${createdOrderId}`,
        payload,
        { headers }
      )
      console.log('PUT Response:', responsePut)

      const courseId = responsePut.data.data.courseId
      const roleType = responsePut.data.data.course.type

      setIsSuccessModalVisible(true)
      setSuccessMessage('Tunggu sebentar, kami sedang memproses pembayaran...')

      setTimeout(() => {
        setSuccessMessage('Anda berhasil membayar!')
        setTimeout(() => {
          if (roleType === 'free') {
            navigate(`/course/${courseId}`)
          } else {
            navigate(`/payment-success/${courseId}`)
          }
        }, 2000)
      }, 5000)
    } catch (err) {
      console.error(err)

      if (err.response) {
        const backendErrorMessage = err.response.data.message
        console.log('Backend Error Message:', backendErrorMessage)

        setIsErrorModalVisible(true)
        setErrorMessage(`Payment Details: ${backendErrorMessage}`)
      } else {
        setIsErrorModalVisible(true)
        setErrorMessage('Error making payment. Please try again.')
      }

      setTimeout(() => {
        setIsErrorModalVisible(false)
        setErrorMessage('')
      }, 5000)
    }
  }

  return (
    <div className='mt-5 mb-16 font-poppins'>
      {isSuccessModalVisible && (
        <div className='fixed top-0 left-0 right-0 flex items-center justify-center bottom-80 '>
          <div className='p-4 text-white rounded-md shadow-md bg-success'>
            {successMessage}
          </div>
        </div>
      )}

      {isErrorModalVisible && (
        <div className='fixed top-0 left-0 right-0 flex items-center justify-center bottom-80'>
          <div className='p-4 text-white rounded-md shadow-md bg-destructive'>
            {errorMessage}
          </div>
        </div>
      )}
      {errorFetchingCourse && (
        <div className='py-2 mb-4 text-center text-white bg-red-500 rounded-lg '>
          <div className='mt-1 rounded-l-lg rounded-r-lg '>
            {errorFetchingCourse}
          </div>
        </div>
      )}

      {!errorFetchingCourse && (
        <div className='py-2 mb-4 text-center text-white bg-red-500 rounded-lg '>
          <div className='px-3 mt-1 rounded-l-lg rounded-r-lg'>
            Selesaikan Pembayaran Sebelum Waktu Habis : {timeRemaining}
          </div>
        </div>
      )}

      <div className='grid justify-between grid-cols-1 gap-10 md:grid-cols-3'>
        {/* tab */}
        <div className='md:col-span-2'>
          <Tabs defaultValue='Bank Transfer' className='w-full '>
            <TabsList className='flex space-x-4 '>
              <TabsTrigger
                value='Bank Transfer'
                active={activeTab === 'Bank Transfer'}
                className={`w-full ${
                  activeTab !== 'Bank Transfer' &&
                  paymentDone.paymentMethod !== 'Credit Card' &&
                  'bg-gray-200'
                }`}
                onClick={() => {
                  if (courseType !== 'free') {
                    setPaymentDone({ ...paymentDone, paymentMethod: '' })
                    setActiveTab('Bank Transfer')
                  }
                }}
                disabled={courseType === 'free'}
              >
                Bank Transfer
              </TabsTrigger>
              <TabsTrigger
                value='Credit Card'
                active={activeTab === 'Credit Card'}
                className={`w-full ${
                  activeTab !== 'Credit Card' &&
                  paymentDone.paymentMethod === 'Credit Card' &&
                  'bg-gray-200'
                }`}
                onClick={() => {
                  if (courseType !== 'free') {
                    setPaymentDone({
                      ...paymentDone,
                      paymentMethod: 'Credit Card',
                    })
                    setActiveTab('Credit Card')
                  }
                }}
                disabled={courseType === 'free'}
              >
                Credit Card
              </TabsTrigger>
            </TabsList>

            <TabsContent value='Bank Transfer'>
              {activeTab === 'Bank Transfer' && (
                <Card title={'Bank Transfer'}>
                  <div className='mb-6'>
                    <p className='pt-10 mb-2 ml-4 text-lg font-semibold ps-6'>
                      Informasi Transfer Bank
                    </p>
                    <div className='p-6 mx-10 space-y-5 rounded-md shadow-lg bg-gradient-to-r from-primary to-sky-600'>
                      <p className='mb-2 text-white'>
                        Transfer ke bank berikut:
                      </p>
                      <div className='grid md:grid-cols-2 md:gap-5'>
                        <div>
                          <p className='text-sm font-semibold text-white'>
                            Nama Bank
                          </p>
                          <p className='text-white'>Bank Central Asia</p>
                        </div>
                        <div>
                          <p className='text-sm font-semibold text-white'>
                            Nomor Rekening
                          </p>
                          <p className='text-white'>063-456-7901</p>
                        </div>
                        <div>
                          <p className='text-sm font-semibold text-white'>
                            Atas Nama
                          </p>
                          <p className='text-white'>Idea Academy</p>
                        </div>
                        <div>
                          <p className='text-sm font-semibold text-white'>
                            Jumlah
                          </p>
                          <p className='text-lg text-white'>
                            {formatCurrency(paymentDetail + ppn)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value='Credit Card'>
              {activeTab === 'Credit Card' && (
                <Card
                  title='Credit Card'
                  className='p-8 mt-4 bg-white rounded-md shadow-md'
                >
                  <div className='flex flex-col mb-8 space-y-3 md:items-center md:justify-center md:flex-row'>
                    {/* Replace these URLs with the actual URLs for the logos of MasterCard, Visa, American Express, and Paypal */}
                    <img
                      src='https://res.cloudinary.com/djsjnrfv0/image/upload/v1703607198/BINAR/MasterCard_Logo.svg_rjeryg.png'
                      alt='MasterCard'
                      className='w-auto mx-2 md:h-6'
                    />
                    <img
                      src='https://res.cloudinary.com/djsjnrfv0/image/upload/v1703607288/BINAR/Visa_Logo_wq87yx.png'
                      alt='Visa'
                      className='w-auto h-12 mx-2 md:h-6'
                    />
                    <img
                      src='https://res.cloudinary.com/djsjnrfv0/image/upload/v1703607822/BINAR/654-6543054_logo-american-express-icon-png-transparent-png-1-removebg-preview_iszzf2.png'
                      alt='American Express'
                      className='w-auto h-12 mx-2 md:h-6'
                    />
                    <img
                      src='https://res.cloudinary.com/djsjnrfv0/image/upload/v1703606568/BINAR/PayPal_haabfs.png'
                      alt='PayPal'
                      className='w-auto h-12 mx-2 md:h-6'
                    />
                  </div>
                  <ol style={{ listStyleType: 'none' }} className='space-y-6'>
                    <FormItem
                      label='Card Number'
                      className='text-sm border-b md:text-base'
                    >
                      <p>Card number</p>
                      <input
                        id='cardNumber'
                        placeholder='e.g., 4480 0000 0000 0000'
                        value={paymentDone.cardNumber}
                        onChange={(e) =>
                          setPaymentDone({
                            ...paymentDone,
                            cardNumber: e.target.value,
                          })
                        }
                        className='w-full p-2 border-none focus:outline-none focus:border-b focus:border-primary'
                      />
                      {/* Pesan Kesalahan Card Number */}
                      <div className={`text-red-500 text-xs mt-1`}>
                        {errors?.cardNumber}
                      </div>
                    </FormItem>
                    <FormItem label='Card Holder Name' className='border-b'>
                      <p>Card holder name</p>
                      <input
                        id='cardHolderName'
                        placeholder='e.g., John Doe'
                        value={paymentDone.cardHolderName}
                        onChange={(e) =>
                          setPaymentDone({
                            ...paymentDone,
                            cardHolderName: e.target.value,
                          })
                        }
                        className='w-full p-2 border-none focus:outline-none focus:border-b focus:border-primary'
                      />
                      {/* Pesan Kesalahan Card Holder Name */}
                      <div className={`text-red-500 text-xs mt-1`}>
                        {errors?.cardHolderName}
                      </div>
                    </FormItem>
                    <div className='flex flex-col md:space-x-4 md:flex-row'>
                      <FormItem label='CVV' className='border-b'>
                        <p>CVV</p>
                        <input
                          id='cvv'
                          placeholder='e.g., 000'
                          value={paymentDone.cvv}
                          onChange={(e) =>
                            setPaymentDone({
                              ...paymentDone,
                              cvv: e.target.value,
                            })
                          }
                          className='w-full p-2 border-none focus:outline-none focus:border-b focus:border-primary'
                        />
                        {/* Pesan Kesalahan Card Holder Name */}
                        <div className={`text-red-500 text-xs mt-1`}>
                          {errors?.cvv}
                        </div>
                      </FormItem>
                      <FormItem label='Expiry Date' className='border-b'>
                        <p>Expiry date</p>
                        <input
                          id='expiryDate'
                          placeholder='e.g., 07/24'
                          value={paymentDone.expiryDate}
                          onChange={(e) =>
                            setPaymentDone({
                              ...paymentDone,
                              expiryDate: e.target.value,
                            })
                          }
                          className='w-full p-2 border-none focus:outline-none focus:border-b focus:border-primary'
                        />
                        {/* Pesan Kesalahan Card Holder Name */}
                        <div className={`text-red-500 text-xs mt-1`}>
                          {errors?.expiryDate}
                        </div>
                      </FormItem>
                    </div>
                  </ol>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* detail course */}
        <div className=''>
          <div className='font-poppins'>
            <Card className='w-full p-2'>
              <CardHeader className='font-bold text-center text-primary'>
                Pembayaran Kelas
              </CardHeader>
              <CardContent>
                <div className='flex justify-center mb-5'>
                  <img
                    src={image}
                    alt=''
                    className='object-cover rounded-sm w-72 h-36'
                  />
                </div>
                <div className='flex flex-col justify-between text-sm md:flex-row'>
                  {courseType !== 'free' ? (
                    <>
                      <div>
                        <Label className='font-semibold'>Harga</Label>
                        <div>{formatCurrency(paymentDetail)}</div>
                      </div>
                      <div>
                        <Label className='font-semibold'>PPN 11%</Label>
                        <div>{formatCurrency(ppn)}</div>
                      </div>
                      <div>
                        <Label className='font-semibold'>Total Bayar</Label>
                        <div>{formatCurrency(paymentDetail + ppn)}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label className='font-semibold'>Harga</Label>
                        <div>{formatCurrency(0)}</div>
                      </div>
                      <div>
                        <Label className='font-semibold'>PPN 11%</Label>
                        <div>{formatCurrency(0)}</div>
                      </div>
                      <div>
                        <Label className='font-semibold'>Total Bayar</Label>
                        <div>{formatCurrency(0)}</div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className='flex justify-center text-center'>
                <button
                  onClick={handlePayment}
                  className='w-full p-3 text-sm font-medium text-white duration-300 rounded-full sm:p-0 sm:h-12 bg-success hover:bg-green-700'
                >
                  {courseType === 'free'
                    ? 'Klaim Kelas'
                    : 'Bayar dan Ikuti Kelas Selamanya'}
                </button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
