import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PaymentsPage = () => {
  const navigate = useNavigate();
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
          <div className="font-poppins">
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <AccordionItem
                    value={payment.id}
                    key={payment.id}
                  >
                    <AccordionTrigger className="no-underline hover:no-underline">
                      <div className="flex items-center space-x-10">
                        <div className={`flex items-center space-x-3 justify-evenly ${payment.status === "PENDING" ? "text-active" : payment.status === "COMPLETED" ? "text-success" : ""}`}>
                          <FontAwesomeIcon
                            icon={faCreditCard}
                            className="text-sm items-center"
                          />
                          <div className="text-sm font-semibold">{payment.status.slice(0, 1).toUpperCase() + payment.status.slice(1).toLowerCase()}</div>
                        </div>
                        <div className="text-xs justify-end">{formatDistanceToNow(new Date(payment.createdAt), { addSuffix: true })}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      {payment.status === "PENDING" && <div className="text-xs">Anda belum menyelesaikan pembelian :</div>}

                      {payment.status === "COMPLETED" && <div className="text-xs">Anda baru saja membeli</div>}
                      <div className="flex gap-3">
                        <img
                          src={payment.Course.image}
                          className="w-32 rounded-sm"
                        />
                        <div className=" space-y-2 grid items-center">
                          <div>
                            <div className="font-semibold text-primary">{payment.Course.title}</div>
                            <div className="text-xs">#{payment.Course.category}</div>
                            {payment.status === "PENDING" && (
                              <div className="grid">
                                <Link
                                  to={`/payment/${payment.id}`}
                                  onClick={() => navigate(`payment/${payment.id}`)}
                                >
                                  <Button className="h-6 text-xs mt-2 w-fit bg-active">Bayar</Button>
                                </Link>
                              </div>
                            )}{" "}
                          </div>

                          {payment.status === "COMPLETED" && (
                            <Link
                              to={`/course/${payment.courseId}`}
                              onClick={() => navigate(`course/${payment.courseId}`)}
                            >
                              <Button className="bg-success h-6 w-fit">Akses</Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <div className="text-sm pt-5">Saat ini Anda belum memiliki riwayat pembayaran.</div>
              )}
            </Accordion>
          </div>
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
