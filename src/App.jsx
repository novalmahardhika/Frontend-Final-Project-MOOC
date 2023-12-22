import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./pages/dashboard/layout";
import Dashboard from "./pages/dashboard/dashboard";
import KelolaKelas from "./pages/dashboard/kelolaKelas";
import LayoutUser from "./pages/authentication/auth_layout";
import Register from "./pages/authentication/register/register";
import UserLogin from "./pages/authentication/login/user";
import AdminLogin from "./pages/authentication/login/admin";
import Beranda from "./pages/beranda/beranda";
import Card_Course from "./pages/course_list/card_course";
import CourseDetail from "./pages/course_detail/detail_course";
import LayoutBeranda from "./pages/beranda/layout";
import UserProtected from "./pages/authentication/protected";
import LayoutNotification from "@/pages/notification/layout";
import NotificationList from "./pages/notification/notificationPage";
import { DialogDemo } from "./pages/course_detail/modal";
import Payment from "./pages/payment/payment";
import LayoutPayment from "@/pages/payment/layout";
import Layout from "./pages/beranda/layout";
import Banner from "./pages/beranda/banner";
import Banner_Profile from "./pages/Profile/banner_Profile";
import Profile_User from "./pages/Profile/Profile_User";
import Footer from "./pages/beranda/Footer";
import Ubah_Password from "./pages/Profile/Ubah_Password";
import Riwayat_Pembayaran from "./pages/Profile/Riwayat_Pembayaran";
import Banner_KelasSaya from "./pages/myCourse/Banner";
import Filter_Kelas_saya from "./pages/myCourse/Kelas_Saya";
import Pilih_Kelas_premium from "./pages/myCourse/Kelas_premium";
import Banner_Premium from "./pages/myCourse/Banner_Premium";
import Kelas_gratis from "./pages/myCourse/Kelas_Gratis";
import Kelas_Filter from "./pages/myCourse/kelas_filter";
import Otp from "./pages/authentication/register/Otp";
import Reset_password from "./pages/authentication/register/reset_password_baru_Success";
import Reset_password_invalid from "./pages/authentication/register/reset_password_invalid";
import Reset_password_Success from "./pages/authentication/register/reset_password_baru_Success";
import Reset_password_gagal from "./pages/authentication/register/reset_password_baru_gagal";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/user/reset_password_gagal"
          element={
            <LayoutUser>
              <Reset_password_gagal/>
            </LayoutUser>
          }
        />
        <Route
          path="/user/reset_password_success"
          element={
            <LayoutUser>
              <Reset_password_Success/>
            </LayoutUser>
          }
        />
        <Route
          path="/user/reset_password_invalid"
          element={
            <LayoutUser>
              <Reset_password_invalid/>
            </LayoutUser>
          }
        />
        <Route
          path="/user/reset_password"
          element={
            <LayoutUser>
              <Reset_password/>
            </LayoutUser>
          }
        />
        <Route
          path="/user/register/OTP"
          element={
            <LayoutUser>
              <Otp/>
            </LayoutUser>
          }
        />
        <Route
          path="/beranda/filter"
          element={
            <Layout>
              <Banner_Premium />
              <Kelas_Filter />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/beranda/gratis"
          element={
            <Layout>
              <Banner_Premium />
              <Kelas_gratis />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/beranda/premium"
          element={
            <Layout>
              <Banner_Premium />
              <Pilih_Kelas_premium />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/beranda/MyCourse"
          element={
            <Layout>
              <Banner_KelasSaya />
              <Filter_Kelas_saya />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/Profile"
          element={
            <Layout>
              <Banner_Profile />
              <Profile_User />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/Profile/Ubahpassword"
          element={
            <Layout>
              <Banner_Profile />
              <Ubah_Password />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/Profile/Riwayat_Pembayaran"
          element={
            <Layout>
              <Banner_Profile />
              <Riwayat_Pembayaran />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/Admin"
          element={
            <LayoutAdmin>
              <Dashboard />
            </LayoutAdmin>
          }
        />
        <Route
          path="/AdminKelolaKelas"
          element={
            <LayoutAdmin>
              <KelolaKelas />
            </LayoutAdmin>
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
          path="/User/Login"
          element={
            <LayoutUser>
              <UserLogin />
            </LayoutUser>
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
          path="/Beranda"
          element={
            <LayoutBeranda>
              <Beranda />
            </LayoutBeranda>
          }
        />

        <Route
          path="/Course"
          element={
            <UserProtected>
              <LayoutBeranda>
                <Card_Course />
              </LayoutBeranda>
            </UserProtected>
          }
        />
        <Route
          path="/CourseDetail/:id"
          element={
            <UserProtected>
              <LayoutBeranda>
                <CourseDetail />
              </LayoutBeranda>
            </UserProtected>
          }
        />

        <Route
          path="/notification"
          element={
            <LayoutBeranda>
              <LayoutNotification>
                <NotificationList />
              </LayoutNotification>
            </LayoutBeranda>
          }
        />

        <Route
          path="/dialogdemo"
          element={
            <LayoutBeranda>
              <DialogDemo />
            </LayoutBeranda>
          }
        />
        <Route
          path="/payment"
          element={
            <LayoutBeranda>
              <LayoutPayment>
                <Payment />
              </LayoutPayment>
            </LayoutBeranda>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;;
