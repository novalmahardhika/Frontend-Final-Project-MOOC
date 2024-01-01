import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBell, faPlayCircle, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "./../assets/logo.png";
import Menu from "./menu";
import { Button } from "./ui/button";
import AvatarProfile from "./avatar";
import { Link } from "react-router-dom";
import Notification from "@/pages/notification/notif";
import { useState, useEffect } from "react";
import Search from "./search";

const Navbar_User = () => {
  const token = localStorage.getItem("token");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <nav
            id="bottom-navigation"
            className="fixed inset-x-0 bottom-0 z-10 block bg-white shadow font-poppins"
          >
            <div
              id="tabs"
              className="flex justify-between"
            >
              <Link
                to="/"
                className="justify-center inline-block w-full pt-2 pb-1 text-center text-gray-600 focus:outline-none hover:text-active"
              >
                <FontAwesomeIcon
                  icon={faHouse}
                  className="inline-block mb-1"
                />
                <span className="block text-xs tab tab-back">Beranda</span>
              </Link>
              <Link
                to="/notification"
                className="justify-center inline-block w-full pt-2 pb-1 text-center text-gray-600 focus:outline-none hover:text-active"
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="inline-block mb-1"
                />
                <span className="block text-xs tab tab-profile">Notifikasi</span>
              </Link>
              <Link
                to="/courses"
                className="justify-center inline-block w-full pt-2 pb-1 text-center text-gray-600 focus:outline-none hover:text-active"
              >
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  className="inline-block mb-1"
                />
                <span className="block text-xs tab tab-change-password">Kelas</span>
              </Link>
              <Link
                to="/myCourses"
                className="justify-center inline-block w-full pt-2 pb-1 text-center text-gray-600 focus:outline-none hover:text-active"
              >
                <FontAwesomeIcon
                  icon={faList}
                  className="inline-block mb-1"
                />
                <span className="block text-xs tab tab-payment-history">Kursus</span>
              </Link>
              <Link
                to="/user/profile"
                className="justify-center inline-block w-full pt-2 pb-1 text-center text-gray-600 focus:outline-none hover:text-active"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="inline-block mb-1"
                />
                <span className="block text-xs tab tab-logout">Profile</span>
              </Link>
            </div>
          </nav>
          {/* <div className="bg-primary opacity-80"> */}

          <div className="flex items-center justify-between w-screen h-16 bg-primary">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="my-auto ms-3 w-28"
              />
            </Link>
            <div className="relative top-0 right-0 z-10 block p-4">
              <Search />
            </div>
          </div>
          {/* </div> */}
        </>
      ) : (
        <>
          <nav className="sticky top-0 right-0 z-10 w-full p-4 font-medium bg-primary font-poppins">
            <div className="container flex items-center justify-between h-12 mx-auto ">
              <div>
                <Link to="/">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="mx-auto my-auto w-36"
                  />
                </Link>
              </div>
              <div>
                <Menu />
              </div>

              <div className="flex items-center justify-between space-x-4">
                <div>
                  <Search />
                </div>
                {token ? (
                  <div className="flex items-center space-x-4">
                    <div>
                      <Notification />
                    </div>

                    <div>
                      <AvatarProfile />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-5">
                    <Link to="/user/Register">
                      <Button className="text-white cursor-pointer bg-active hover:bg-secondary hover:text-black">Daftar</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar_User;
