import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const AvatarProfile = () => {
  const navigate = useNavigate();
  const [performLogout, setPerformLogout] = useState(false);

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
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="w-12 h-12 cursor-pointer"
              title="Avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-44 mt-2 me-20 p-3 font-poppins ">
          <DropdownMenuGroup className="space-y-4 font-medium">
            <DropdownMenuItem className="cursor-pointer">
              {/* <User className="mr-2 h-4 w-4" /> */}
              <Link to="#">Kelas Saya</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              {/* <User className="mr-2 h-4 w-4" /> */}
              <Link to="#">Payment</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              {/* <Settings className="mr-2 h-4 w-4" /> */}
              <Link to="#">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleLogout}
            >
              {/* <Keyboard className="mr-2 h-4 w-4" /> */}
              <Link to="#">Keluar</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default AvatarProfile;