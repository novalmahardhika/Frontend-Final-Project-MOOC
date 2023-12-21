import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

const PaidCourse = () => {
  const { id } = useParams();
  const [paymentDetail, setPaymentDetail] = useState();
  const [image, setImage] = useState();
  const [ppn, setPPN] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/courses/${id}`, { Headers: { Authorization: `Bearer ${token}` } });
        setPaymentDetail(res.data.data.price);
        setImage(res.data.data.image);
        setPPN(res.data.data.price * 0.11);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourseDetail();
  }, [id, token]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="font-poppins">
      <Card className="w-full p-2">
        <CardHeader className="font-bold text-primary text-center">Pembayaran Kelas</CardHeader>
        <CardContent>
          <div className="mb-5 flex justify-center">
            <img
              src={image}
              alt=""
              className=" object-cover w-72 h-36 rounded-sm "
            />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <Label className="font-semibold">Harga</Label>
              <div>{formatCurrency(paymentDetail)}</div>
            </div>
            <div>
              <Label className="font-semibold">PPN 11%</Label>
              <div>{formatCurrency(ppn)}</div>
            </div>
            <div>
              <Label className="font-semibold">Total Bayar</Label>
              <div>{formatCurrency(paymentDetail + ppn)}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="bg-success  w-full h-12 rounded-full hover:bg-active">Bayar dan Ikuti Kelas Selamanya</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default PaidCourse;
