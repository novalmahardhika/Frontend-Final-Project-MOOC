// Course.jsx
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faClock, faBook, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

  const displayedCourses = filteredCourses.slice(0, 6);

  if (loading) {
    return <div>Loading...</div>;
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
                <div className="flex justify-between">
                  <Link to={`/Courses/${item.id}`}>
                    <div className="text-sm text-primary font-semibold">{item.title}</div>
                  </Link>
                  <div className="flex space-x-2">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-active text-sm ms:text-lg"
                    />
                    <div className="text-xs md:text-sm">{item.rating}</div>
                  </div>
                </div>
                <div className="text-xs ">#{item.category}</div>
                <div className="flex flex-wrap gap-3 justify-between items-center pt-3">
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
