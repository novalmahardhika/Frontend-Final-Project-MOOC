
import Notification from "./list_notif";
import Payments from "./list_payment";
import { useState, useEffect } from "react";
import TabComponent from "./tab";
import { useLocation } from "react-router-dom";


const NotificationDetail = () => {
  const location = useLocation();
  const isPaymentHistoryPage = location.pathname === "/payment-history";

  const [activeTab, setActiveTab] = useState("notification");
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
        <div className="relative z-1 font-poppins">
          <div className="bg-secondary">
            <div className="container pt-8 pb-3">
              <TabComponent
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          </div>
          <div className="container">
            {activeTab === "notification" && (
              <div className="w-full">
                <Notification />
              </div>
            )}
            {activeTab === "payment" && (
              <div className="w-full">
                <Payments />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative z-1 font-poppins">
          <div className="bg-secondary">
            <div className="container pt-12 pb-20">
              <div className="text-3xl font-semibold text-primary">{isPaymentHistoryPage ? "Payments History" : "Notification"}</div>
            </div>
          </div>
          <div className="container flex gap-10 justify-center">
            <div className="w-full">{isPaymentHistoryPage ? <Payments /> : <Notification />}</div>
            {/* {isPaymentHistoryPage ? (
              ""
            ) : (
              <div className="w-[900px]">
                <Detail />
              </div>
            )} */}
          </div>
        </div>
      )}
    </>
  );
};
export default NotificationDetail;

