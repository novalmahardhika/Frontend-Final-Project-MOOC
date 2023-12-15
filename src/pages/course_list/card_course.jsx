// Card_Course.js
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// import { useCategoryContext } from "./categoryContext";
import { useLocation } from "react-router-dom";
import Footer from "../beranda/Footer";

const Card_Course = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category");
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let url = "https://idea-academy.up.railway.app/api/v1/course";

        // Jika parameter 'category' ada, tambahkan ke URL
        if (categoryParam) {
          url += `?category=${encodeURIComponent(categoryParam)}`;
        }
        const res = await axios.get(url);

        setCourseList(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCourses();
  }, [categoryParam]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="">
      <div className="container mt-10 mb-8">
        <div className="text-3xl font-semibold text-primary">Cari Kelas</div>
        <div className="text-3xl font-semibold text-primary">Sesuai Karir Kamu</div>
      </div>
      <div className="container flex flex-wrap gap-10 mb-10">
        {courseList.map((course, index) => (
          <Card
            key={course.id}
            className={`md:w-72 ${index < 2 ? "flex-grow-0" : ""}`} // Apply flex-grow-0 for the first two cards
          >
            <div className="">
              <img
                className="rounded-t-sm"
                src={course.image}
                alt={course.title}
              />
            </div>

            <CardHeader>
              <Link to={`/Course/${course.id}`}>
                <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
              </Link>
              <CardDescription>{course.level === "beginner" ? "Beginner" : course.level === "intermediate" ? "Intermediate" : "Advance"}</CardDescription>
            </CardHeader>

            <CardContent>
              <Link to={`/Course/${course.id}`}>
                <Button className="hover:bg-active">{formatCurrency(course.price)}</Button>
              </Link>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
              <StarRating rating={"5"} />
              <span className="text-sm">({"5"})</span>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Card_Course;
