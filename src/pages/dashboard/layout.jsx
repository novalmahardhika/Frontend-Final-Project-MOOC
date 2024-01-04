import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import Navbar from '../../components/navbar_admin'
import Logo from './../../assets/logo.png'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Layout = ({ children }) => {
  const location = useLocation()
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPremium, setTotalPremium] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const token = localStorage.getItem('token')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `https://idea-academy.up.railway.app/api/v1/users`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const totalRows = res.data.data.length
        setTotalUsers(totalRows)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUsers()
  }, [token])

  useEffect(() => {
    const fetchPaidCourse = async () => {
      try {
        const res = await axios.get(
          `https://idea-academy.up.railway.app/api/v1/orders/list`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (res.data.data) {
          const uniqueCourses = Array.from(
            new Set(res.data.data.map((order) => order.courseId))
          )
          const count = uniqueCourses.length
          setTotalPayment(count)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchPaidCourse()
  }, [token])

  useEffect(() => {
    const fetchPremiumCourse = async () => {
      try {
        const res = await axios.get(
          `https://idea-academy.up.railway.app/api/v1/courses`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (res.data.data) {
          const premiumCourses = res.data.data.filter(
            (course) => course.type === 'premium'
          )
          const countTotalPremium = premiumCourses.length
          setTotalPremium(countTotalPremium)
        }
      } catch (err) {
        console.log(err)
        // setLoading(false);
      }
    }
    fetchPremiumCourse()
  }, [token])

  const handleLogout = () => {
    console.log('Keluar sekarang juga!')
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const menu = [
    { id: 1, path: '/Admin', label: 'Dashboard' },
    { id: 2, path: '/Admin/Courses', label: 'Kelola Kelas' },
    { id: 3, path: '/Keluar', label: 'Keluar', onClick: handleLogout },
  ]

  const currentUrl = location.pathname

  const isCourseDetailPage = currentUrl.startsWith('/Admin/course/')

  return (
    <>
      {isMobile ? (
        <>
          <div className='flex h-screen font-poppins'>
            {/* Main Content */}
            <div>
              <Navbar />
              {!isCourseDetailPage && (
                <>
                  <div className='container flex flex-col items-center justify-between space-y-3 '>
                    {/* Active Users */}
                    <Card className='w-full shadow-none bg-secondary '>
                      <div className='flex items-center '>
                        <div>
                          <CardHeader className='text-xl text-primary'>
                            <FontAwesomeIcon icon={faUserGroup} />
                          </CardHeader>
                        </div>
                        <div>
                          <div className='flex items-center space-x-3 text-primary'>
                            <div className='text-xl font-semibold'>
                              {totalUsers}
                            </div>
                            <div>Active Users</div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Active Class */}
                    <Card className='w-full shadow-none bg-secondary '>
                      <div className='flex items-center '>
                        <div>
                          <CardHeader className='text-xl text-primary'>
                            <FontAwesomeIcon icon={faUserGroup} />
                          </CardHeader>
                        </div>
                        <div>
                          <div className='flex items-center space-x-3 text-primary'>
                            <div className='text-xl font-semibold'>
                              {totalPayment}
                            </div>
                            <div>Active Class</div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Premium Class */}
                    <Card className='w-full shadow-none bg-secondary '>
                      <div className='flex items-center '>
                        <div>
                          <CardHeader className='text-xl text-primary'>
                            <FontAwesomeIcon icon={faUserGroup} />
                          </CardHeader>
                        </div>
                        <div>
                          <div className='flex items-center space-x-3 text-primary'>
                            <div className='text-xl font-semibold'>
                              {totalPremium}
                            </div>
                            <div>Premium Class</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </>
              )}

              <div className='pb-12 overflow-x-scroll'>{children}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='flex h-screen font-poppins'>
            {/* Sidebar */}
            <div className='items-center h-screen space-y-6 bg-primary text-secondary font-poppins w-72 '>
              <img src={Logo} alt='Logo' className='mx-auto my-8 w-44' />

              <div className='items-center space-y-2 row'>
                {menu.map((item) => (
                  <Link
                    key={item.id}
                    className='block cursor-pointer'
                    to={item.path}
                  >
                    <div
                      className={
                        location.pathname === item.path
                          ? 'bg-active py-4 ps-10'
                          : 'py-4 ps-10'
                      }
                    >
                      {item.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className='flex flex-col flex-1'>
              <Navbar />
              {!isCourseDetailPage && (
                <div className='flex items-center justify-between px-16 my-8  space-x-14'>
                  {/* Active Users */}
                  <Card className='flex items-center flex-1 w-1/3 h-24 my-auto shadow-none bg-secondary'>
                    <CardHeader className='p-3 text-4xl rounded-sm text-primary ms-6'>
                      <FontAwesomeIcon icon={faUserGroup} />
                    </CardHeader>
                    <CardContent className='py-10 '>
                      <CardTitle className='text-2xl font-semibold text-primary'>
                        {totalUsers}
                      </CardTitle>
                      <CardDescription className='text-primary'>
                        Active Users
                      </CardDescription>
                    </CardContent>
                  </Card>

                  {/* Active Class */}
                  <Card className='flex items-center flex-1 w-1/3 h-24 my-auto shadow-none bg-secondary'>
                    <CardHeader className='p-3 text-4xl rounded-sm text-primary ms-6'>
                      <FontAwesomeIcon icon={faUserGroup} />
                    </CardHeader>
                    <CardContent className='py-10 '>
                      <CardTitle className='text-2xl font-semibold text-primary'>
                        {totalPayment}
                      </CardTitle>
                      <CardDescription className='text-primary'>
                        Active Class
                      </CardDescription>
                    </CardContent>
                  </Card>

                  {/* Premium Class */}
                  <Card className='flex items-center flex-1 w-1/3 h-24 my-auto shadow-none bg-secondary'>
                    <CardHeader className='p-3 text-4xl rounded-sm text-primary ms-6'>
                      <FontAwesomeIcon icon={faUserGroup} />
                    </CardHeader>
                    <CardContent className='py-10 '>
                      <CardTitle className='text-2xl font-semibold text-primary'>
                        {totalPremium}
                      </CardTitle>
                      <CardDescription className='text-primary'>
                        Premium Class
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className='pb-12 overflow-y-scroll'>{children}</div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
