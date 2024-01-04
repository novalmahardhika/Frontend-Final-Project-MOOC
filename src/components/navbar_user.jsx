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
import axios from "axios";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
const Navbar_User = () => {
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState("");
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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/current-user`, { headers: { Authorization: `Bearer ${token}` } });
        const firstName = res.data.data.name.split(" ")[0];
        setUserInfo(firstName);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrentUser();
  }, [token]);

  return (
    <>
      {isMobile ? (
        <>
          <nav
            id="bottom-navigation"
            className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow font-poppins"
          >
            <div
              id="tabs"
              className="flex justify-between"
            >
              <Link
                to="/"
                className="w-full focus:outline-none text-gray-600 hover:text-active justify-center inline-block text-center pt-2 pb-1"
              >
                <FontAwesomeIcon
                  icon={faHouse}
                  className="inline-block mb-1"
                />
                <span className="tab tab-back block text-xs">Beranda</span>
              </Link>
              {token ? (
                <Link
                  to="/notification"
                  className="w-full focus:outline-none text-gray-600 hover:text-active justify-center inline-block text-center pt-2 pb-1"
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className="inline-block mb-1"
                  />
                  <span className="tab tab-profile block text-xs">Notifikasi</span>
                </Link>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="w-full focus:outline-none text-gray-600 hover:text-active justify-center inline-block text-center pt-2 pb-1">
                      <FontAwesomeIcon
                        icon={faBell}
                        className="inline-block mb-1"
                      />
                      <span className="tab tab-profile block text-xs">Notifikasi</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-[300px] rounded-sm font-poppins">
                    <DialogHeader>
                      <DialogTitle className="text">Perhatian!</DialogTitle>
                      <DialogDescription>Untuk mengakses halaman Notifikasi anda harus login terlebih dahulu</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Link to="/user/login">
                        <DialogClose className="w-full">
                          <Button className="w-full">Login</Button>
                        </DialogClose>
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              <Link
                to="/courses"
                className="w-full focus:outline-none text-gray-600 hover:text-active justify-center inline-block text-center pt-2 pb-1"
              >
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  className="inline-block mb-1"
                />
                <span className="tab tab-change-password block text-xs">Kelas</span>
              </Link>
              {token ? (
                <Link
                  to="/myCourses"
                  className="w-full focus:outline-none text-gray-600 hover:text-active justify-center inline-block text-center pt-2 pb-1"
                >
                  <FontAwesomeIcon
                    icon={faList}
                    className="inline-block mb-1"
                  />
                  <span className="tab tab-payment-history block text-xs">Kursus</span>
                </Link>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="w-full focus:outline-none text-gray-600 hover:text-active justify-center inline-block text-center pt-2 pb-1">
                      <FontAwesomeIcon
                        icon={faList}
                        className="inline-block mb-1"
                      />
                      <span className="tab tab-logout block text-xs">Profile</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-[300px] rounded-sm font-poppins">
                    <DialogHeader>
                      <DialogTitle className="text">Perhatian!</DialogTitle>
                      <DialogDescription>Untuk mengakses halaman Kelas Saya anda harus login terlebih dahulu</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Link to="/user/login">
                        <DialogClose className="w-full">
                          <Button className="w-full">Login</Button>
                        </DialogClose>
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              {token ? (
                <Link
                  to="/user/profile"
                  className="w-full focus:outline-none text-gray-600 hover:text-active justify-center inline-block text-center pt-2 pb-1"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="inline-block mb-1"
                  />
                  <span className="tab tab-logout block text-xs">Profile</span>
                </Link>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="w-full focus:outline-none text-gray-600 hover:text-active justify-center inline-block text-center pt-2 pb-1">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="inline-block mb-1"
                      />
                      <span className="tab tab-logout block text-xs">Profile</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-[300px] rounded-sm font-poppins">
                    <DialogHeader>
                      <DialogTitle className="text">Perhatian!</DialogTitle>
                      <DialogDescription>Untuk mengakses halaman Profile anda harus login terlebih dahulu</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Link to="/user/login">
                        <DialogClose className="w-full">
                          <Button className="w-full">Login</Button>
                        </DialogClose>
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </nav>
          {/* <div className="bg-primary opacity-80"> */}

          <div className="flex bg-primary h-16  w-screen items-center justify-between">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="ms-3 my-auto w-28"
              />
            </Link>
            <div className="block relative top-0 right-0 z-10 p-4">
              <Search />
            </div>
          </div>
          {/* </div> */}
        </>
      ) : (
        <>
          <nav className="bg-primary font-poppins font-medium p-4 top-0 right-0 w-full z-10 sticky">
            <div className=" container mx-auto flex items-center justify-between h-12 ">
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

              <div className="flex justify-between items-center space-x-4">
                {token ? <div className="text-white">Hi, {userInfo}!</div> : ""}
                <div>
                  <Search />
                </div>

                {token ? (
                  <div className="flex space-x-4 items-center">
                    <div>
                      <Notification />
                    </div>

                    <div>
                      <AvatarProfile />
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-5 items-center">
                    <Link to="/user/Register">
                      <Button className="cursor-pointer bg-active text-white hover:bg-secondary hover:text-black">Daftar</Button>
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
