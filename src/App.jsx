import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./pages/dashboard/layout";
import Dashboard from "./pages/dashboard/dashboard";
import KelolaKelas from "./pages/dashboard/course";
import LayoutUser from "./pages/authentication/auth_layout";
import Register from "./pages/authentication/register/register";
import UserLogin from "./pages/authentication/login/user";
import AdminLogin from "./pages/authentication/login/admin";
import Beranda from "./pages/beranda/beranda";
import Courses from "./pages/course_list/courses";
import CourseDetail from "./pages/course_detail/detail_course";
import LayoutBeranda from "./pages/beranda/layout";
import UserProtected from "./pages/authentication/protected";
import NotificationList from "./pages/notification/notification_detail";
import MyCourses from "./pages/my_course/my_courses";
import Otp from "./pages/authentication/register/Otp";
import OtpProtected from "./pages/authentication/otp_protected";
import Payment from "./pages/payment/payment";
import LayoutPayment from "./pages/payment/layout";

import LayoutProfile from "./pages/profile/LayoutProfile";
import UserProfile from "./pages/profile/UserProfile";
import ResetPassword from "./pages/profile/ResetPassword";
import HistoryPayment from "./pages/profile/HistoryPayment";
import ForgotPassword from "./pages/authentication/forgot_password/forgot_password";
import ForgotPasswordProtected from "./pages/authentication/forgot_password_protected";
import InputForgotPassword from "./pages/authentication/forgot_password/input_password";
import PaymentSuccess from "./pages/payment/payment_success";

import AdminProtected from "./pages/authentication/admin_protected";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutBeranda>
              <Beranda />
            </LayoutBeranda>
          }
        />
        <Route
          path="/beranda"
          element={
            <LayoutBeranda>
              <Beranda />
            </LayoutBeranda>
          }
        />
        <Route
          path="/Admin"
          element={
            <AdminProtected>
              <LayoutAdmin>
                <Dashboard />
              </LayoutAdmin>
            </AdminProtected>
          }
        />
        <Route
          path="/Admin/Kelas"
          element={
            <AdminProtected>
              <LayoutAdmin>
                <KelolaKelas />
              </LayoutAdmin>
            </AdminProtected>
          }
        />
        <Route
          path="/User/forgot-password"
          element={
            <LayoutUser>
              <ForgotPassword />
            </LayoutUser>
          }
        />
        <Route
          path="/User/forgot-password/verified"
          element={
            <ForgotPasswordProtected>
              <LayoutUser>
                <InputForgotPassword />
              </LayoutUser>
            </ForgotPasswordProtected>
          }
        />
        <Route
          path="/User/Register"
          element={
            <LayoutUser>
              <Register />
            </LayoutUser>
          }
        />
        <Route
          path="/User/otp"
          element={
            <OtpProtected>
              <LayoutUser>
                <Otp />
              </LayoutUser>
            </OtpProtected>
          }
        />
        <Route
          path="/User/Login"
          element={
            <LayoutUser>
              <UserLogin />
            </LayoutUser>
          }
        />
        <Route
          path="/User/profile"
          element={
            <LayoutBeranda>
              <UserProtected>
                <LayoutProfile>
                  <UserProfile />
                </LayoutProfile>
              </UserProtected>
            </LayoutBeranda>
          }
        />
        <Route
          path="/User/reset-password"
          element={
            <UserProtected>
              <LayoutBeranda>
                <LayoutProfile>
                  <ResetPassword />
                </LayoutProfile>
              </LayoutBeranda>
            </UserProtected>
          }
        />
        <Route
          path="/User/history-payment"
          element={
            <UserProtected>
              <LayoutBeranda>
                <LayoutProfile>
                  <HistoryPayment />
                </LayoutProfile>
              </LayoutBeranda>
            </UserProtected>
          }
        />
        <Route
          path="/Admin/Login"
          element={
            <LayoutUser>
              <AdminLogin />
            </LayoutUser>
          }
        />

        <Route
          path="/courses"
          element={
            <LayoutBeranda>
              <Courses />
            </LayoutBeranda>
          }
        />
        <Route
          path="/course/:id/*"
          element={
            <LayoutBeranda>
              <CourseDetail />
            </LayoutBeranda>
          }
        />

        <Route
          path="/notification"
          element={
            <LayoutBeranda>
              <NotificationList />
            </LayoutBeranda>
          }
        />
        <Route
          path="/payment-history"
          element={
            <LayoutBeranda>
              <NotificationList />
            </LayoutBeranda>
          }
        />

        <Route
          path="/payment/:id/*"
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
          path="/payment-success/:id/*"
          element={
            <LayoutBeranda>
              <UserProtected>
                <LayoutPayment>
                  <PaymentSuccess />
                </LayoutPayment>
              </UserProtected>
            </LayoutBeranda>
          }
        />
        <Route
          path="/myCourses"
          element={
            <LayoutBeranda>
              <MyCourses />
            </LayoutBeranda>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
