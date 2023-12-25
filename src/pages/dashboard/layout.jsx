// src/components/Layout.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import {  } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Navbar from "../../components/navbar";
import Logo from "./../../assets/logo.png";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from "react";

const Layout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const summary = [
    { id: 1, total: 450, title: "Active Users", color: "text-success" },
    { id: 2, total: 25, title: "Active Class" },
    { id: 3, total: 20, title: "Premium Class" },
  ];

  const menu = [
    { id: 1, path: "/Admin", label: "Dashboard" },
    { id: 2, path: "/AdminKelolaKelas", label: "Kelola Kelas" },
    { id: 3, path: "/Keluar", label: "Keluar", onClick: logout },
  ];
  return (
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
            <div
              key={item.id}
              className="block"
            >
              <div className={location.pathname === item.path ? "bg-active py-4 ps-10" : "py-4 ps-10"}>{item.onClick ? <button onClick={item.onClick}>{item.label}</button> : <Link to={item.path}>{item.label}</Link>}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className=" items-center flex justify-between space-x-14 my-8 px-16">
          {summary.map((item) => (
            <Card
              key={item.id}
              className="flex flex-1 w-1/3 items-center my-auto h-24 bg-secondary shadow-none"
            >
              <CardHeader className="text-4xl text-primary p-3 ms-6 rounded-sm">
                <FontAwesomeIcon icon={faUserGroup} />
              </CardHeader>
              <CardContent className="py-10 ">
                <CardTitle className="text-2xl text-primary font-semibold">{item.total}</CardTitle>
                <CardDescription className="text-primary">{item.title}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="p-4 overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
