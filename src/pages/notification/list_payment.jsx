import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
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

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/orders`, { headers: { Authorization: `Bearer ${token}` } });
        const sortedPayments = res.data.data ? res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
        setPayments(sortedPayments);
        console.log(sortedPayments);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPayments();
  }, [token]);

  return (
    <>
      {isMobile ? (
        <>
          <Accordion
            type="single"
            collapsible
            className="w-full font-poppins"
          >
            {payments.length > 0 ? (
              payments.map((payment) => (
                <AccordionItem
                  value={payment.id}
                  key={payment.id}
                >
                  <AccordionTrigger className="no-underline hover:no-underline">
                    <div className="flex space-x-3 items-center">
                      <FontAwesomeIcon
                        icon={faBell}
                        className="text-sm items-center"
                      />
                      <div className="text-sm  font-thin">{payment.status}</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>{payment.curseId}</AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="text-sm pt-5">Saat ini Anda belum memiliki riwayat pembayaran.</div>
            )}
          </Accordion>
        </>
      ) : (
        <>
          <div className="relative -top-16 font-poppins">
            <Card className="h-[450px] p-5">
              <div className="space-y-4 font-medium">
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="cursor-pointer hover:bg-secondary rounded-sm p-2"
                    >
                      <Link to="#">
                        <div className="space-x-3 items-start">
                          <div className="flex space-x-3 items-center">
                            <FontAwesomeIcon
                              icon={faBell}
                              className="text-sm items-center"
                            />
                            <div className=" text-sm text-success font-thin">{payment.status}</div>
                          </div>
                          <div className="ps-3 space-y-1">
                            <div className="text-xs">{payment.courseID}</div>
                            <div className="text-xs">{formatDistanceToNow(new Date(payment.createdAt), { addSuffix: true })}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
};
export default PaymentsPage;
