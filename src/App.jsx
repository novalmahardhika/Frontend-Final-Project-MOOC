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

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/Profile"
          element={
            <Layout>
              <Banner_Profile/>
              <Profile_User />
              <Footer/>
            </Layout>
          }
        />
        <Route
          path="/Profile/Ubahpassword"
          element={
            <Layout>
              <Banner_Profile/>
              <Ubah_Password />
              <Footer/>
            </Layout>
          }
        />
        <Route
          path="/Profile/Riwayat_Pembayaran"
          element={
            <Layout>
              <Banner_Profile/>
              <Riwayat_Pembayaran/>
              <Footer/>
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

export default App;
