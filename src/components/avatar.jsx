import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const AvatarProfile = () => {
  const navigate = useNavigate();
  const [performLogout, setPerformLogout] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://idea-academy.up.railway.app/api/v1/current-user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (performLogout) {
      localStorage.removeItem("token");
      navigate("/user/login");
    }
  }, [performLogout, navigate]);

  const handleLogout = () => {
    setPerformLogout(true);
  };

  return (
    <div className="font-poppins">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={userData.image}
              alt={userData.name}
              className="w-12 h-12 cursor-pointer"
              title={userData.name}
            />
            <AvatarFallback>{userData.username ? userData.username[0].toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-44 mt-2 me-20 p-3 font-poppins ">
          <DropdownMenuGroup className="space-y-4 font-medium">
            <DropdownMenuItem className="cursor-pointer">
              <Link to="/myCourses">Kelas Saya</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link to="/payment-history">Payment</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link to="#">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleLogout}
            >
              <Link to="#">Keluar</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default AvatarProfile;
