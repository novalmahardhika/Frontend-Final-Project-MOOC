import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LayoutAdmin from './pages/dashboard/layout'
import Dashboard from './pages/dashboard/dashboard'
import KelolaKelas from './pages/dashboard/kelolaKelas'
import LayoutUser from './pages/authentication/auth_layout'
import Register from './pages/authentication/register/register'
import UserLogin from './pages/authentication/login/user'
import AdminLogin from './pages/authentication/login/admin'
import Beranda from './pages/beranda/beranda'
import Card_Course from './pages/course_list/card_course'
import CourseDetail from './pages/course_detail/detail_course'
import LayoutBeranda from './pages/beranda/layout'
import UserProtected from './pages/authentication/protected'
import LayoutNotification from '@/pages/notification/layout'
import NotificationList from './pages/notification/notificationPage'
import Otp from './pages/authentication/register/Otp'

import Payment from './pages/payment/payment'
import OtpProtected from './pages/authentication/otp_protected'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <LayoutBeranda>
              <Beranda />
            </LayoutBeranda>
          }
        />
        <Route
          path='/beranda'
          element={
            <LayoutBeranda>
              <Beranda />
            </LayoutBeranda>
          }
        />
        <Route
          path='/Admin'
          element={
            <LayoutAdmin>
              <Dashboard />
            </LayoutAdmin>
          }
        />
        <Route
          path='/AdminKelolaKelas'
          element={
            <LayoutAdmin>
              <KelolaKelas />
            </LayoutAdmin>
          }
        />
        <Route
          path='/User/Register'
          element={
            <LayoutUser>
              <Register />
            </LayoutUser>
          }
        />
        <Route
          path='/User/otp'
          element={
            <OtpProtected>
              <LayoutUser>
                <Otp />
              </LayoutUser>
            </OtpProtected>
          }
        />
        <Route
          path='/User/Login'
          element={
            <LayoutUser>
              <UserLogin />
            </LayoutUser>
          }
        />
        <Route
          path='/Admin/Login'
          element={
            <LayoutUser>
              <AdminLogin />
            </LayoutUser>
          }
        />

        <Route
          path='/Course'
          element={
            <LayoutBeranda>
              <Card_Course />
            </LayoutBeranda>
          }
        />
        <Route
          path='/Course/:id/*'
          element={
            <LayoutBeranda>
              <CourseDetail />
            </LayoutBeranda>
          }
        />

        <Route
          path='/notification'
          element={
            <LayoutBeranda>
              <LayoutNotification>
                <NotificationList />
              </LayoutNotification>
            </LayoutBeranda>
          }
        />

        <Route
          path='/payment/:id/*'
          element={
            <LayoutBeranda>
              <UserProtected>
                <Payment />
              </UserProtected>
            </LayoutBeranda>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
