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

import Payment from "./pages/payment/payment";
import LayoutPayment from "@/pages/payment/layout";

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
          path="/Course/:id/*"
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
