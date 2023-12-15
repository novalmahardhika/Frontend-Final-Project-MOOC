import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComments, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Notification = () => {
  const dummyNotifications = [
    { id: 1, type: "Message", text: "New message from John Doe", timestamp: "2 minutes ago" },
    { id: 2, type: "Reminder", text: "You have a meeting at 3 PM", timestamp: "1 hour ago" },
    { id: 3, type: "Information", text: "Payment received from Jane Doe", timestamp: "3 hours ago" },
  ];

  return (
    <div className="font-poppins">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className=" rounded-full bg-white w-11 h-11 flex justify-center items-center text-xl cursor-pointer hover:bg-muted-foreground">
            <FontAwesomeIcon
              icon={faBell}
              title="notification"
              className="text-primary"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-3/4 mt-2 me-28 p-3 font-poppins ">
          <DropdownMenuGroup className="space-y-4 font-medium">
            <div className="space-y-2">
              {dummyNotifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="cursor-pointer"
                >
                  <Link to="#">
                    <div className="flex space-x-3 items-start">
                      {notification.type === "Message" ? <FontAwesomeIcon icon={faComments} /> : notification.type === "Reminder" ? <FontAwesomeIcon icon={faBell} /> : <FontAwesomeIcon icon={faCircleExclamation} />}
                      <div className="space-y-1">
                        <div className=" text-xs font-thin">{notification.type}</div>
                        <div className="text-xs">{notification.text}</div>
                        <div className="text-xs">{notification.timestamp}</div>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="flex justify-center my-1 ">
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
