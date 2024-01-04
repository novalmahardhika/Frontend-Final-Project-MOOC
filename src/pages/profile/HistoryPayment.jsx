import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
// import Loading from "./loading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faGem, faClock, faMedal } from "@fortawesome/free-solid-svg-icons";

import { formatDistanceToNow } from "date-fns";

const HistoryPayment = () => {
  const [payments, setPayments] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isMessage, setIsMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/orders`, { headers: { Authorization: `Bearer ${token}` } });
        const sortedPayments = res.data.data ? res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
        setPayments(sortedPayments);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPayments();
  }, [token]);

  return (
    <div className="flex flex-col space-y-3 md:max-h-[500px] overflow-hidden rounded-md mb-5">
      <h2 className="mx-auto text-lg font-medium font-poppins">History Payment</h2>
      {/* {isLoading && <Loading />}
      <div className="overflow-y-auto no-scrollbar rounded-t-md">
        {isMessage && <h2 className="flex items-center justify-center h-10 font-medium text-red-600 bg-red-300">{isMessage}</h2>} */}
      {/* {data?.map((data, index) => (
          <Card key={index} className='flex flex-col mb-5'>
            <img
              src={data.Course.image}
              className='h-[150px] w-full rounded-t-md'
            />
            <div className='flex flex-col p-3'>
              <b className='text-xs text-active'>{data.Course.category}</b>
              <b className='text-sm'>{data.Course.title}</b>
              <div className='flex items-center mt-3 space-x-3'>
                <Button
                  className={`${data.status === 'PENDING' && 'bg-active'}`}
                  disabled={data.status === 'COMPLETED'}
                >
                  <Link to={`/payment/${data.courseId}`}>{data.status}</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))} */}
      <div className="font-poppins mt-5 mb-20 h-full">
        <div className="font-poppins flex flex-wrap gap-5 md:gap-10 md:mb-20 w-full justify-center md:justify-start">
          {payments.length > 0 ? (
            payments.map((payment) => (
              <Card
                key={payment.id}
                className="md:w-[420px] w-[300px] h-[250px] md:h-full "
              >
                <div className="hover:opacity-50 cursor-pointer hover:transition-transform">
                  <div className="text-xs  z-1 absolute bg-white px-3 py-1 rounded-tl-sm rounded-br-sm">{formatDistanceToNow(new Date(payment.createdAt), { addSuffix: true })}</div>
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
                  <div className="text-sm text-primary font-semibold">{payment.Course.title}</div>
                  <div className="text-xs">by {payment.Course.creator}</div>

                  <div className="flex items-center pt-2">
                    <FontAwesomeIcon
                      icon={faMedal}
                      className="text-success"
                    />
                    <div className="text-xs">{payment.Course.level === "beginner" ? "Beginner" : payment.Course.level === "intermediate" ? "Intermediate" : "Advance"}</div>
                  </div>

                  <div className="pt-2">
                    {payment.status === "PENDING" ? (
                      <Link to={`/payment/${payment.id}`}>
                        <Button className="h-6 md:h-7 text-xs flex gap-3 bg-active text-white">
                          <FontAwesomeIcon icon={faClock} /> Waiting for Payment{" "}
                        </Button>
                      </Link>
                    ) : payment.status === "CANCELED" ? (
                      <Link to={`/payment/${payment.id}`}>
                        <Button className="h-6 md:h-7 text-xs flex gap-3 bg-active text-white">
                          <FontAwesomeIcon icon={faClock} /> Waiting for Payment{" "}
                        </Button>
                      </Link>
                    ) : (
                      <Link to={`/Course/${payment.courseId}`}>
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
    </div>
    // </div>
  );
};

export default HistoryPayment;
