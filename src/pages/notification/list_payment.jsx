import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faGem, faClock, faMedal, faBook } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

const PaymentsPage = () => {
  // const navigate = useNavigate();
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
          <div className="font-poppins mt-5 mb-20 h-full">
            <div className="font-poppins flex flex-wrap gap-5 md:gap-10 md:mb-20 w-full justify-center md:justify-start">
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <Card
                    key={payment.id}
                    className="md:w-[420px] w-[300px] h-[250px] md:h-full "
                  >
                    <div className="hover:opacity-50 cursor-pointer hover:transition-transform">
                      <div className="text-xs  z-10 absolute bg-white px-3 py-1 rounded-tl-sm rounded-br-sm">{formatDistanceToNow(new Date(payment.createdAt), { addSuffix: true })}</div>
                      <img
                        className="object-cover w-full h-24 md:h-48 rounded-t-sm"
                        src={payment.Course.image}
                        alt={payment.Course.title}
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="text-xs font-semibold text-active ">{payment.Course.category}</div>
                        <div className="flex space-x-2">
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-active text-sm ms:text-lg"
                          />
                          <div className="text-xs md:text-sm">{payment.Course.rating}</div>
                        </div>
                      </div>
                      <Link to={`/Course/${payment.Course.id}`}>
                        <div className="text-sm text-primary font-semibold">{payment.Course.title}</div>
                      </Link>
                      <div className="text-xs">by {payment.Course.creator}</div>
                      <div className="flex flex-wrap gap-3 justify-between items-center pt-2 pb-3">
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon
                            icon={faMedal}
                            className="text-success"
                          />
                          <div className="text-xs">{payment.Course.level === "beginner" ? "Beginner" : payment.Course.level === "intermediate" ? "Intermediate" : "Advance"}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon
                            icon={faBook}
                            className="text-success"
                          />
                          <div className="text-xs">{payment.Course.totalModule} Modules</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="text-success"
                          />
                          <div className="text-xs">{payment.Course.totalDuration} Menit</div>
                        </div>
                      </div>
                      <div>
                        {payment.status === "PENDING" ? (
                          <Link to={`/payment/${payment.id}`}>
                            <Button className="h-6 md:h-7 text-xs flex gap-3 bg-active text-white">
                              <FontAwesomeIcon icon={faClock} /> Waiting for Payment{" "}
                            </Button>
                          </Link>
                        ) : (
                          <Link to={`/Course/${payment.Course.id}`}>
                            <Button className="h-6 md:h-7 text-xs bg-success flex gap-3">
                              <FontAwesomeIcon icon={faGem} /> Paid{" "}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-sm pt-5">Saat ini Anda belum memiliki riwayat pembayaran.</div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative -top-16 font-poppins w-screen">
            <div className="flex flex-wrap gap-10">
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <Card
                    key={payment.id}
                    className="md:w-[420px] w-[300px] h-[250px] md:h-full "
                  >
                    <div className="hover:opacity-50 cursor-pointer hover:transition-transform">
                      <div className="text-xs z-10 absolute bg-white px-3 py-1 rounded-tl-sm rounded-br-sm">{formatDistanceToNow(new Date(payment.createdAt), { addSuffix: true })}</div>
                      <img
                        className="object-cover w-full h-24 md:h-48 rounded-t-sm"
                        src={payment.Course.image}
                        alt={payment.Course.title}
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="text-xs font-semibold text-active ">{payment.Course.category}</div>
                        <div className="flex space-x-2">
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-active text-sm ms:text-lg"
                          />
                          <div className="text-xs md:text-sm">{payment.Course.rating}</div>
                        </div>
                      </div>
                      <Link to={`/Course/${payment.Course.id}`}>
                        <div className="text-sm text-primary font-semibold">{payment.Course.title}</div>
                      </Link>
                      <div className="text-xs">by {payment.Course.creator}</div>
                      <div className="flex flex-wrap gap-3 justify-between items-center pt-2 pb-3">
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon
                            icon={faMedal}
                            className="text-success"
                          />
                          <div className="text-xs">{payment.Course.level === "beginner" ? "Beginner" : payment.Course.level === "intermediate" ? "Intermediate" : "Advance"}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon
                            icon={faBook}
                            className="text-success"
                          />
                          <div className="text-xs">{payment.Course.totalModule} Modules</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="text-success"
                          />
                          <div className="text-xs">{payment.Course.totalDuration} Menit</div>
                        </div>
                      </div>
                      <div>
                        {payment.status === "PENDING" ? (
                          <Link to={`/payment/${payment.id}`}>
                            <Button className="h-6 md:h-7 text-xs flex gap-3 bg-active text-white">
                              <FontAwesomeIcon icon={faClock} /> Waiting for Payment{" "}
                            </Button>
                          </Link>
                        ) : (
                          <Link to={`/Course/${payment.Course.id}`}>
                            <Button className="h-6 md:h-7 text-xs bg-success flex gap-3">
                              <FontAwesomeIcon icon={faGem} /> Paid{" "}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-sm pt-5">Saat ini Anda belum memiliki riwayat pembayaran.</div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default PaymentsPage;
