import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const Module = ({ onSelectModule }) => {
  const { id } = useParams()
  const [courseDetail, setCourseDetail] = useState(null)
  const [modulePaid, setModulePaid] = useState(null)
  const [progress, setProgress] = useState(0)

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const res = await axios.get(
          `https://idea-academy.up.railway.app/api/v1/courses/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const data = res.data.data
        setCourseDetail(data)
        let done = 0
        data['chapters'].forEach((item) => {
          item['modules'].forEach((module) => {
            if (module.done) done++
          })
        })
        const percentage = Math.floor((done / data.totalModule) * 100)
        console.log(percentage)
        setProgress(percentage)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCourseDetail()
  }, [id, token])

  useEffect(() => {
    const fetchPaid = async () => {
      try {
        const res = await axios.get(
          `https://idea-academy.up.railway.app/api/v1/orders`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const courseIdFromParam = id
        const foundOrder = res.data.data.find(
          (order) =>
            order.courseId === courseIdFromParam && order.status === 'COMPLETED'
        )
        setModulePaid(foundOrder)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPaid()
  }, [id, token])

  const handleModuleClick = async (module) => {
    onSelectModule(module)
  }

  const onPayment = async () => {
    try {
      if (!courseDetail) {
        console.error('Course detail is not available')
        return
      }

      const response = await axios.post(
        `https://idea-academy.up.railway.app/api/v1/orders/${courseDetail.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data && response.data.data && response.data.data.id) {
        const orderId = response.data.data.id

        navigate(`/payment/${orderId}`)
      } else {
        console.error('Invalid response structure')
      }
    } catch (error) {
      console.error('Error posting order:', error)
    }
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!courseDetail) {
    return <div>Loading...</div>
  }

  return (
    <>
      {isMobile ? (
        <>
          <div className='px-4 md:relative md:w-[450px] md:-top-20 w-screen z-1 font-poppins '>
            <div className='p-3'>
              <div>
                <div className='text-lg font-bold'>Materi Belajar</div>
                <div className='w-full bg-gray-200 rounded-full dark:bg-gray-700'>
                  <div
                    className='bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full my-5'
                    style={{ width: progress + '%' }}
                  >
                    {' '}
                    {progress + '%'}
                  </div>
                </div>
              </div>
              <div className='space-y-5 '>
                {courseDetail.chapters.map((chapter, chapterIndex) => (
                  <div key={chapter.id} className='space-y-3'>
                    <div className='flex justify-between text-sm font-semibold'>
                      <div>{`Chapter ${chapter.chapterNumber} - ${chapter.title}`}</div>
                      <div>{`${chapter.duration} Menit`}</div>
                    </div>
                    <div className='space-y-3'>
                      {chapter.modules.map((module, index) => (
                        <div
                          key={module.id}
                          onClick={() =>
                            handleModuleClick(module, chapterIndex)
                          }
                          className='flex items-center justify-between rounded-sm shadow-sm cursor-pointer bg-secondary hover:scale-105 hover:transition-transform'
                        >
                          {chapterIndex === 0 || modulePaid ? (
                            <div className='flex items-center justify-between w-full'>
                              <div className='flex items-center text-sm'>
                                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-secondary'>
                                  {index + 1}
                                </div>
                                <div>{module.title}</div>
                              </div>

                              <div
                                className={`rounded-full w-6 h-6 flex justify-center items-center me-3 ${
                                  module.done ? 'bg-success' : 'bg-primary'
                                }`}
                              >
                                <FontAwesomeIcon
                                  icon={faPlay}
                                  className='text-xs text-white'
                                />
                              </div>
                            </div>
                          ) : (
                            <Dialog className='font-poppins'>
                              <DialogTrigger className='w-full'>
                                <div className='flex items-center justify-between w-full'>
                                  <div className='flex items-center text-sm'>
                                    <div className='flex items-center justify-center w-10 h-10 rounded-full bg-secondary'>
                                      {index + 1}
                                    </div>
                                    <div>{module.title}</div>
                                  </div>
                                  <div className='flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full me-3'>
                                    <FontAwesomeIcon
                                      icon={faLock} // Use faLock for the second module
                                      className='text-xs text-white'
                                    />
                                  </div>
                                </div>
                              </DialogTrigger>

                              <DialogContent className='sm:max-w-[500px] font-poppins'>
                                <DialogHeader>
                                  <DialogTitle className='text-sm font-normal text-center'>
                                    Selangkah Lagi Menuju
                                  </DialogTitle>
                                  <DialogDescription className='text-2xl font-medium text-center text-active '>
                                    Kelas {courseDetail.type}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className='flex flex-col '>
                                  <div className='mx-auto space-y-3 cursor-pointer'>
                                    <Card className=''>
                                      <div>
                                        <img
                                          src={courseDetail.image}
                                          alt='UI/UX Design'
                                          className='object-cover h-56 rounded-sm w-96'
                                        />
                                      </div>
                                    </Card>
                                    <div className='font-bold text-center '>
                                      {courseDetail.title}
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter className='flex'>
                                  <Button
                                    type='button'
                                    onClick={() => onPayment()}
                                    className='flex mx-auto hover:bg-active w-60'
                                  >
                                    Beli Sekarang
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='md:relative md:w-[450px] md:-top-20 w-screen z-1 font-poppins '>
            <Card className='p-3'>
              <CardHeader>
                <CardTitle className='text-lg font-bold'>
                  Materi Belajar
                </CardTitle>
                <div className='w-full bg-gray-200 rounded-full dark:bg-gray-700'>
                  <div
                    className='bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'
                    style={{ width: progress + '%' }}
                  >
                    {' '}
                    {progress + '%'}
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-10 '>
                {courseDetail.chapters.map((chapter, chapterIndex) => (
                  <div key={chapter.id} className='space-y-5'>
                    <div className='flex justify-between text-sm font-semibold'>
                      <div>{`Chapter ${chapter.chapterNumber} - ${chapter.title}`}</div>
                      <div>{`${chapter.duration} Menit`}</div>
                    </div>
                    <div className='space-y-3'>
                      {chapter.modules.map((module, index) => (
                        <div
                          key={module.id}
                          onClick={() =>
                            handleModuleClick(module, chapterIndex)
                          }
                          className='flex items-center justify-between rounded-sm shadow-sm cursor-pointer bg-secondary hover:scale-105 hover:transition-transform'
                        >
                          {chapterIndex === 0 || modulePaid ? (
                            <div className='flex items-center justify-between w-full'>
                              <div className='flex items-center text-sm'>
                                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-secondary'>
                                  {index + 1}
                                </div>
                                <div>{module.title}</div>
                              </div>

                              <div
                                className={`rounded-full w-6 h-6 flex justify-center items-center me-3 ${
                                  module.done ? 'bg-success' : 'bg-primary'
                                }`}
                              >
                                <FontAwesomeIcon
                                  icon={faPlay}
                                  className='text-xs text-white'
                                />
                              </div>
                            </div>
                          ) : (
                            <Dialog className='font-poppins'>
                              <DialogTrigger className='w-full'>
                                <div className='flex items-center justify-between w-full'>
                                  <div className='flex items-center text-sm'>
                                    <div className='flex items-center justify-center w-10 h-10 rounded-full bg-secondary'>
                                      {index + 1}
                                    </div>
                                    <div>{module.title}</div>
                                  </div>
                                  <div className='flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full me-3'>
                                    <FontAwesomeIcon
                                      icon={faLock}
                                      className='text-xs text-white'
                                    />
                                  </div>
                                </div>
                              </DialogTrigger>

                              <DialogContent className='sm:max-w-[500px] font-poppins'>
                                <DialogHeader>
                                  <DialogTitle className='text-sm font-normal text-center'>
                                    Selangkah Lagi Menuju
                                  </DialogTitle>
                                  <DialogDescription className='text-2xl font-medium text-center text-active '>
                                    Kelas {courseDetail.type}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className='flex flex-col '>
                                  <div className='mx-auto space-y-3 cursor-pointer'>
                                    <Card className=''>
                                      <div>
                                        <img
                                          src={courseDetail.image}
                                          alt='UI/UX Design'
                                          className='object-cover h-56 rounded-sm w-96'
                                        />
                                      </div>
                                    </Card>
                                    <div className='font-bold text-center '>
                                      {courseDetail.title}
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter className='flex'>
                                  <Button
                                    type='button'
                                    onClick={() => onPayment()}
                                    className='flex mx-auto hover:bg-active w-60'
                                  >
                                    Beli Sekarang
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  )
}

Module.propTypes = {
  onSelectModule: PropTypes.func.isRequired,
}

export default Module
