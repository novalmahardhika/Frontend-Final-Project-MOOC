// Course.jsx
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faClock, faBook, faStar, faGem, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const LoadingSkeletonCard = () => (
  <Card className="md:w-[420px] w-[280px] h-[280px] md:h-full pb-5">
    <div className="hover:opacity-50 cursor-pointer hover:transition-transform space-y-4">
      <Skeleton className=" object-cover w-full h-32 md:h-48 rounded-t-sm rounded-b-none" />
      <div className="space-y-3 p-3">
        <div className="flex justify-between">
          <Skeleton className=" w-32 md:w-52 h-2" />
          <Skeleton className="w-10 h-2" />
        </div>
        <Skeleton className=" w-20 md:w-32 h-2" />
        <div className="flex flex-wrap justify-between gap-5">
          <Skeleton className=" w-16 md:w-20 h-2" />
          <Skeleton className=" w-16 md:w-20 h-2" />
          <Skeleton className=" w-16 md:w-20 h-2" />
        </div>
      </div>
    </div>
  </Card>
);

const Course = ({ activeTab }) => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/courses`, { headers: { Authorization: `Bearer ${token}` } });
        setCourseList(res.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchCourseDetail();
  }, [token]);

  const filteredCourses = courseList.filter((course) => {
    if (activeTab === "All") {
      return course.rating > 4;
    }

    return course.category === activeTab && course.rating >= 4;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => b.rating - a.rating);

  const displayedCourses = sortedCourses.slice(0, 6);

  if (loading) {
    return (
      <div className="container mt-3">
        <div className="flex gap-6">
          {[...Array(3)].map((_, index) => (
            <LoadingSkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (displayedCourses.length === 0) {
    return <div className="container mt-5 text-lg font-semibold h-[200px] flex justify-center items-center">No courses available for the selected tab.</div>;
  }

  return (
    <div className="container mt-5 ">
      <div className="flex md:flex-wrap gap-6 md:justify-between pb-10 overflow-x-scroll md:overflow-hidden ">
        {displayedCourses.map((item) => (
          <div
            className="space-y-3 cursor-pointer"
            key={item.title}
          >
            <Card className="md:w-[420px] w-[250px] h-[280px] md:h-full">
              <div className="hover:opacity-50 cursor-pointer hover:transition-transform">
                <img
                  className="object-cover w-full h-32 md:h-48 rounded-t-sm"
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <div className="p-4 space-y-1">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-semibold text-active ">{item.category}</div>
                  <div className="flex space-x-2">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-active text-sm ms:text-lg"
                    />
                    <div className="text-xs md:text-sm">{item.rating}</div>
                  </div>
                </div>
                <Link to={`/Course/${item.id}`}>
                  <div className="text-sm text-primary font-semibold">{item.title}</div>
                </Link>
                <div className="text-xs">by {item.creator}</div>
                <div className="flex flex-wrap gap-3 justify-between items-center pt-2 pb-3">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faMedal}
                      className="text-success"
                    />
                    <div className="text-xs">{item.level === "beginner" ? "Beginner" : item.level === "intermediate" ? "Intermediate" : "Advance"}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faBook}
                      className="text-success"
                    />
                    <div className="text-xs">{item.totalModule} Modules</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-success"
                    />
                    <div className="text-xs">{item.totalDuration} Menit</div>
                  </div>
                </div>
                <div>
                  <Link to={`/Course/${item.id}`}>
                    {item.type === "premium" ? (
                      <Button className="h-7 text-xs flex gap-3 bg-active text-white">
                        <FontAwesomeIcon icon={faGem} /> Premium{" "}
                      </Button>
                    ) : (
                      <Button className="h-7 text-xs bg-primary flex gap-3">
                        <FontAwesomeIcon icon={faCirclePlay} /> Mulai Kelas{" "}
                      </Button>
                    )}
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

Course.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default Course;
