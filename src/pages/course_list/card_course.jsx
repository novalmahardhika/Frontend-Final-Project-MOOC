// Card_Course.js
import { Card, CardTitle } from "@/components/ui/card";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import LevelBars from "@/pages/course_list/level_bars";
import PropTypes from "prop-types";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocation } from "react-router-dom";

const Card_Course = ({ selectedFilters }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category");
  const [courseList, setCourseList] = useState([]);
  const { level: selectedLevels, category: selectedCategories, sort: selectedSort } = selectedFilters;

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

  const filterCourses = () => {
    let filteredCourses = courseList.filter((course) => {
      return (selectedLevels.length === 0 || selectedLevels.includes(course.level)) && (selectedCategories.length === 0 || selectedCategories.includes(course.category));
    });

    if (selectedSort === "Terbaru") {
      filteredCourses = filteredCourses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (selectedSort === "Terpopuler") {
      filteredCourses = filteredCourses.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === "Promo") {
      filteredCourses = filteredCourses.filter((course) => course.isOnPromo);
    } else {
      filteredCourses = filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filteredCourses;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  if (filterCourses().length === 0) {
    return <div className="flex text-center mx-auto text-xl font-semibold ">No courses available</div>;
  }

  return (
    <div className=" font-poppins">
      <div className="font-poppins flex flex-wrap gap-10 mb-20 w-full">
        {filterCourses().map((course) => (
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
                  <Link to={`/course/${course.id}`}>
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
  );
};

Card_Course.propTypes = {
  selectedFilters: PropTypes.shape({
    level: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.arrayOf(PropTypes.string),
    sort: PropTypes.string,
  }),
};

export default Card_Course;
