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
import { CategoryProvider } from "./pages/course_list/categoryContext";

function App() {
  return (
    <Router>
      <Routes>
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
            <UserProtected>
              <LayoutBeranda>
                <Beranda />
              </LayoutBeranda>
            </UserProtected>
          }
        />
        <Route
          path="/Course"
          element={
            <UserProtected>
              <CategoryProvider>
                <LayoutBeranda>
                  <Card_Course />
                </LayoutBeranda>
              </CategoryProvider>
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
      </Routes>
    </Router>
  );
}

export default App;
