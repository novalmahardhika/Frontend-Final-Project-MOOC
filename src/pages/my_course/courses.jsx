// MyCourse.jsx
import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Courses = ({ activeTab }) => {
  const token = localStorage.getItem("token");
  const [myCourseList, setMyCourseList] = useState([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/my-courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const courses = res.data.data?.Courses || [];

        setMyCourseList(courses);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMyCourses();
  }, [token]);

  const filteredCourses = myCourseList.filter((course) => {
    if (activeTab === "All Course") {
      return true;
    }

    return course.level.toLowerCase() === activeTab;
  });

  return (
    <div className="font-poppins container flex justify-between gap-16">
      <div className="font-poppins flex flex-wrap gap-10 mb-20">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="md:w-[250px] pb-5"
          >
            <div className="hover:opacity-50 cursor-pointer hover:transition-transform">
              <img
                className="object-cover w-full h-48 rounded-t-sm"
                src={course.image}
                alt={course.title}
              />
            </div>

            <div className="mx-5 space-y-5">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Link to={`/Course/${course.id}`}>
                    <CardTitle className="text-[18px] font-semibold pt-2">{course.title}</CardTitle>
                  </Link>
                  <div className="text-xs">#{course.category}</div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-secondary rounded-full w-6 h-6 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-success"
                      />
                    </div>
                    <div className="text-sm">Akses Selamanya</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

Courses.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default Courses;
