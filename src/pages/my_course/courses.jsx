// MyCourse.jsx
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
// import { useLocation } from "react-router-dom";
import { faMedal, faClock, faBook, faStar, faGem, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="font-poppins ps-2">
      <div className="font-poppins justify-center md:justify-start flex flex-wrap gap-10 mb-20">
        {filteredCourses.map((course) => (
          // <Card
          <div
            className="space-y-3"
            key={course.title}
          >
            <Card className="md:w-[420px] w-[300px] h-full md:h-full ">
              <Link to={`/Course/${course.id}`}>
                <div className="hover:opacity-50 cursor-pointer hover:transition-transform">
                  <img
                    className="object-cover w-full h-32 md:h-48 rounded-t-sm"
                    src={course.image}
                    alt={course.title}
                  />
                </div>
              </Link>
              <div className="p-4 space-y-1">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-semibold text-active ">{course.category}</div>
                  <div className="flex space-x-2">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-active text-sm ms:text-lg"
                    />
                    <div className="text-xs md:text-sm">{course.rating}</div>
                  </div>
                </div>
                <Link to={`/Course/${course.id}`}>
                  <div className="text-sm text-primary font-semibold">{course.title}</div>
                </Link>
                <div className="text-xs">by {course.creator}</div>
                <div className="flex flex-wrap gap-3 justify-between items-center pt-2 pb-3">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faMedal}
                      className="text-success"
                    />
                    <div className="text-xs">{course.level === "beginner" ? "Beginner" : course.level === "intermediate" ? "Intermediate" : "Advance"}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faBook}
                      className="text-success"
                    />
                    <div className="text-xs">{course.totalModule} Modules</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-success"
                    />
                    <div className="text-xs">{course.totalDuration} Menit</div>
                  </div>
                </div>
                <div>
                  {course.type === "free" ? (
                    <Button className="h-7 text-xs flex gap-3 bg-active text-white">
                      <FontAwesomeIcon icon={faGem} /> Premium{" "}
                    </Button>
                  ) : (
                    <Button className="h-7 text-xs bg-primary flex gap-3 ">
                      <FontAwesomeIcon icon={faCirclePlay} /> Mulai Kelas{" "}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
          //   key={course.id}
          //   className="md:w-[250px] pb-5"
          // >
          //   <div className="hover:opacity-50 cursor-pointer hover:transition-transform">
          //     <img
          //       className="object-cover w-full h-48 rounded-t-sm"
          //       src={course.image}
          //       alt={course.title}
          //     />
          //   </div>

          //   <div className="mx-5 space-y-5">
          //     <div className="space-y-3">
          //       <div className="space-y-2">
          //         <Link to={`/Course/${course.id}`}>
          //           <CardTitle className="text-[18px] font-semibold pt-2">{course.title}</CardTitle>
          //         </Link>
          //         <div className="text-xs">#{course.category}</div>
          //         <div className="flex items-center space-x-2">
          //           <div className="bg-secondary rounded-full w-6 h-6 flex items-center justify-center">
          //             <FontAwesomeIcon
          //               icon={faCheck}
          //               className="text-success"
          //             />
          //           </div>
          //           <div className="text-sm">Akses Selamanya</div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </Card>
        ))}
      </div>
    </div>
  );
};

Courses.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default Courses;
