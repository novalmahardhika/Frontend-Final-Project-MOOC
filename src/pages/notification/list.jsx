import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/notifications`, { headers: { Authorization: `Bearer ${token}` } });
        const sortedNotifications = res.data.data.notifications ? res.data.data.notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
        setNotifications(sortedNotifications);
        console.log(sortedNotifications);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotifications();
  }, [token]);

  return (
    <div className="relative -top-16 font-poppins">
      <Card className="h-[450px] p-5">
        <div className="space-y-4 font-medium">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="cursor-pointer hover:bg-secondary rounded-sm p-2"
              >
                <Link to="#">
                  <div className="space-x-3 items-start">
                    <div className="flex space-x-3 items-center">
                      <FontAwesomeIcon
                        icon={faBell}
                        className="text-sm items-center"
                      />
                      <div className=" text-sm text-success font-thin">{notification.title}</div>
                    </div>
                    <div className="ps-3 space-y-1">
                      <div className="text-xs">{notification.message}</div>
                      <div className="text-xs">{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
export default NotificationPage;
