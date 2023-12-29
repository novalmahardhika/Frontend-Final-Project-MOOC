import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LayoutAdmin from './pages/dashboard/layout'
import Dashboard from './pages/dashboard/dashboard'
import KelolaKelas from './pages/dashboard/kelolaKelas'
import LayoutUser from './pages/authentication/auth_layout'
import Register from './pages/authentication/register/register'
import UserLogin from './pages/authentication/login/user'
import AdminLogin from './pages/authentication/login/admin'
import Beranda from './pages/beranda/beranda'
import Courses from './pages/course_list/courses'
import CourseDetail from './pages/course_detail/detail_course'
import LayoutBeranda from './pages/beranda/layout'
import UserProtected from './pages/authentication/protected'
import NotificationList from './pages/notification/notification_detail'
import MyCourses from './pages/my_course/my_courses'
import Otp from './pages/authentication/register/Otp'
import OtpProtected from './pages/authentication/otp_protected'
import Payment from './pages/payment/payment'
import PaymentSuccess from './pages/payment/payment_success'
import LayoutPayment from './pages/payment/layout'

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
          path='/User/Login'
          element={
            <LayoutUser>
              <UserLogin />
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
          path='/Admin/Login'
          element={
            <LayoutUser>
              <AdminLogin />
            </LayoutUser>
          }
        />

        <Route
          path='/courses'
          element={
            <LayoutBeranda>
              <Courses />
            </LayoutBeranda>
          }
        />
        <Route
          path='/course/:id/*'
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
              <NotificationList />
            </LayoutBeranda>
          }
        />
        <Route
          path='/payment-history'
          element={
            <LayoutBeranda>
              <NotificationList />
            </LayoutBeranda>
          }
        />

        <Route
          path='/payment/:id/*'
          element={
            <LayoutBeranda>
              <UserProtected>
                <LayoutPayment>
                  <Payment />
                </LayoutPayment>
              </UserProtected>
            </LayoutBeranda>
          }
        />
        <Route
          path='/payment-success/:id/*'
          element={
            <LayoutBeranda>
              <UserProtected>
                <PaymentSuccess />
              </UserProtected>
            </LayoutBeranda>
          }
        />
        <Route
          path='/myCourses'
          element={
            <LayoutBeranda>
              <MyCourses />
            </LayoutBeranda>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
