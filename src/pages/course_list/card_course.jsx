// Card_Course.js
import { Card, CardTitle } from "@/components/ui/card";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import LevelBars from "@/pages/course_list/level_bars";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocation } from "react-router-dom";
import Footer from "../beranda/Footer";
import FilterCourse from "@/components/filter_course";

const Card_Course = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category");
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let url = "https://idea-academy.up.railway.app/api/v1/courses";

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
    <div className=" font-poppins">
      <div className="container mt-10 mb-8">
        <div className="text-3xl font-semibold text-primary">Cari Kelas</div>
        <div className="text-3xl font-semibold text-primary">Sesuai Karir Kamu</div>
      </div>
      <div className="container flex justify-between gap-16">
        <div className="w-1/3">
          <FilterCourse />
        </div>
        <div className="font-poppins flex flex-wrap gap-10 mb-20 w-full">
          {courseList.map((course) => (
            <Card
              key={course.id}
              className="md:w-[400px] h-[360px]"
            >
              <div className=" hover:opacity-50 cursor-pointer hover:transition-transform">
                <img
                  className="object-cover w-full h-48 rounded-t-sm"
                  src={course.image}
                  alt={course.title}
                />
              </div>

              <div className="mx-5 space-y-5">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Link to={`/Course/${course.id}`}>
                      <CardTitle className="text-[18px] font-semibold pt-2">{course.title}</CardTitle>
                    </Link>
                    <div className="text-xs">#{course.category}</div>
                  </div>
                </div>

                <div>
                  <div>{formatCurrency(course.price)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <StarRating rating={course.rating} />
                    <span className="text-xs">({course.rating})</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="text-xs text-primary">{course.level === "beginner" ? <LevelBars count={1} /> : course.level === "intermediate" ? <LevelBars count={2} /> : <LevelBars count={3} />}</div>
                      </TooltipTrigger>
                      <TooltipContent className=" bg-white shadow-md text-primary"> {course.level === "beginner" ? "Beginner" : course.level === "intermediate" ? "Intermediate" : "Advance"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Card_Course;
