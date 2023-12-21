import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComments, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
const Notification = () => {
  const dummyNotifications = [
    { id: 1, type: "Message", text: "New message from John Doe", timestamp: "2 minutes ago" },
    { id: 2, type: "Reminder", text: "You have a meeting at 3 PM", timestamp: "1 hour ago" },
    { id: 3, type: "Information", text: "Payment received from Jane Doe", timestamp: "3 hours ago" },
  ];

  return (
    <div className="relative -top-16 z-1 flex gap-10 justify-between font-poppins">
      <Card className=" w-2/5 p-5 h-full">
        <div className="space-y-4 font-medium">
          <div className="space-y-5">
            {dummyNotifications.map((notification) => (
              <div
                key={notification.id}
                className="cursor-pointer hover:bg-secondary rounded-sm p-2"
              >
                <Link to="#">
                  <div className="flex space-x-3 items-start">
                    {notification.type === "Message" ? <FontAwesomeIcon icon={faComments} /> : notification.type === "Reminder" ? <FontAwesomeIcon icon={faBell} /> : <FontAwesomeIcon icon={faCircleExclamation} />}
                    <div className="space-y-1 ">
                      <div className=" text-xs font-thin">{notification.type}</div>
                      <div className="text-xs">{notification.text}</div>
                      <div className="text-xs">{notification.timestamp}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card className="w-full"></Card>
    </div>
  );
};
export default Notification;
