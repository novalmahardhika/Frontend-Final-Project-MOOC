import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "./../assets/logo.png";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
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
          <nav className="bg-primary font-poppins font-medium p-4 top-0 right-0 z-10 mb-3 w-screen">
            <div className="flex items-center justify-between h-10 pe-5 ">
              <Link to="/">
                <img
                  src={Logo}
                  alt="Logo"
                  className="ms-3 my-auto w-28"
                />
              </Link>
              <div className="text-white text-lg font-semibold">Hi, {userInfo}! </div>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="bg-secondary font-poppins font-medium p-4 top-0 right-0 w-full z-10">
            <div className="container mx-auto">
              <div className="flex items-center justify-end h-14 pe-5 ">
                <div className="text-primary text-2xl font-bold">Hi, {userInfo}! </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar;
