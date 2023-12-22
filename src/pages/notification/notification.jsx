import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComments } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/notifications`, { headers: { Authorization: `Bearer ${token}` } });
        setNotifications(res.data.data.notification || []); // Handle undefined case
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotifications();
  }, [token]); // Add token as dependency

  return (
    <div className="font-poppins">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="rounded-full bg-white w-11 h-11 flex justify-center items-center text-xl cursor-pointer hover:bg-muted-foreground">
            <FontAwesomeIcon
              icon={faBell}
              title="notification"
              className="text-primary"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-3/4 mt-2 me-28 p-3 font-poppins">
          <DropdownMenuGroup className="space-y-4 font-medium">
            <div className="space-y-2">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="cursor-pointer"
                >
                  <Link to="#">
                    <div className="flex space-x-3 items-start">
                      <FontAwesomeIcon icon={faComments} />
                      <div className="space-y-1">
                        <div className="text-xs font-thin">{notification.title}</div>
                        <div className="text-xs">{notification.message}</div>
                        <div className="text-xs">{notification.createdAt}</div>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="flex justify-center my-1">
                <Link to="/notification">See All</Link>
              </DropdownMenuItem>
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notification;
