import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Navbar from "../../components/navbar_admin";
import Logo from "./../../assets/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

const Layout = ({ children }) => {
  const location = useLocation();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPremium, setTotalPremium] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/users`, { headers: { Authorization: `Bearer ${token}` } });
        const totalRows = res.data.data.length;
        setTotalUsers(totalRows);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [token]);

  useEffect(() => {
    const fetchPaidCourse = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/orders/list`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.data.data) {
          const uniqueCourses = Array.from(new Set(res.data.data.map((order) => order.courseId)));
          const count = uniqueCourses.length;
          setTotalPayment(count);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPaidCourse();
  }, [token]);

  useEffect(() => {
    const fetchPremiumCourse = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/courses`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.data.data) {
          const premiumCourses = res.data.data.filter((course) => course.type === "premium");
          const countTotalPremium = premiumCourses.length;
          setTotalPremium(countTotalPremium);
        }
      } catch (err) {
        console.log(err);
        // setLoading(false);
      }
    };
    fetchPremiumCourse();
  }, [token]);

  const handleLogout = () => {
    // Hapus tokenAdmin dari localStorage
    localStorage.removeItem("tokenAdmin");
    localStorage.removeItem("token");

    // Arahkan pengguna ke halaman /admin/login
    // Gantilah sesuai dengan rute yang seharusnya digunakan
    window.location.href = "/admin/login";
  };

  const menu = [
    { id: 1, path: "/Admin", label: "Dashboard" },
    { id: 2, path: "/Admin/Courses", label: "Kelola Kelas" },
    { id: 3, path: "/Keluar", label: "Keluar", onClick: handleLogout },
  ];

  const currentUrl = location.pathname;

  const isCourseDetailPage = currentUrl.startsWith("/Admin/course/");

  return (
    <>
      <div className="flex h-screen font-poppins">
        {/* Sidebar */}
        <div className="bg-primary text-secondary font-poppins w-72 h-screen space-y-6 items-center ">
          <img
            src={Logo}
            alt="Logo"
            className="mx-auto w-44 my-8"
          />

          <div className="space-y-2 row items-center">
            {menu.map((item) => (
              <Link
                key={item.id}
                className="block cursor-pointer"
                to={item.path}
                onClick={item.onClick ? item.onClick : ""}
              >
                <div className={currentUrl === item.path ? "bg-active py-4 ps-10" : isCourseDetailPage === "Admin/Course/" ? "bg-active py-4 ps-10" : "py-4 ps-10"}>{item.label}</div>{" "}
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <Navbar />
          {!isCourseDetailPage && (
            <div className=" items-center flex justify-between space-x-14 my-8 px-16">
              {/* Active Users */}
              <Card className="flex flex-1 w-1/3 items-center my-auto h-24 bg-secondary shadow-none">
                <CardHeader className="text-4xl text-primary p-3 ms-6 rounded-sm">
                  <FontAwesomeIcon icon={faUserGroup} />
                </CardHeader>
                <CardContent className="py-10 ">
                  <CardTitle className="text-2xl text-primary font-semibold">{totalUsers}</CardTitle>
                  <CardDescription className="text-primary">Active Users</CardDescription>
                </CardContent>
              </Card>

              {/* Active Class */}
              <Card className="flex flex-1 w-1/3 items-center my-auto h-24 bg-secondary shadow-none">
                <CardHeader className="text-4xl text-primary p-3 ms-6 rounded-sm">
                  <FontAwesomeIcon icon={faUserGroup} />
                </CardHeader>
                <CardContent className="py-10 ">
                  <CardTitle className="text-2xl text-primary font-semibold">{totalPayment}</CardTitle>
                  <CardDescription className="text-primary">Active Class</CardDescription>
                </CardContent>
              </Card>

              {/* Premium Class */}
              <Card className="flex flex-1 w-1/3 items-center my-auto h-24 bg-secondary shadow-none">
                <CardHeader className="text-4xl text-primary p-3 ms-6 rounded-sm">
                  <FontAwesomeIcon icon={faUserGroup} />
                </CardHeader>
                <CardContent className="py-10 ">
                  <CardTitle className="text-2xl text-primary font-semibold">{totalPremium}</CardTitle>
                  <CardDescription className="text-primary">Premium Class</CardDescription>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="overflow-y-scroll pb-12">{children}</div>
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
