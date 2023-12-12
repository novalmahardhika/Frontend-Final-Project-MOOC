import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMedal, faClock, faComments, faBook, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

const CourseHeader = () => {
  const { id } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/course/${id}`, { Headers: { Authorization: `Bearer ${token}` } });
        setCourseDetail(res.data.data);
        console.log(setCourseDetail);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourseDetail();
  }, [id, token]);

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

  const totalDuration = courseDetail.chapters.reduce((acc, chapter) => acc + chapter.duration, 0);
  const totalModules = courseDetail.chapters.reduce((acc, chapter) => acc + chapter.modules.length, 0);

  return (
    <div className="font-poppin bg-secondary h-60">
      <div className="container">
        <div className="cursor-pointer hover:text-active w-1/6 pt-6">
          <Link
            to="/course"
            className="flex space-x-3 items-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <p className="w-fit font-medium">Kelas Lainnya</p>
          </Link>
        </div>
        <div className="ms-6 mt-6 space-y-3">
          <div className="w-1/2">
            <div className="flex justify-between items-center">
              <div className="font-bold text-2xl text-primary mb-2">{courseDetail.title}</div>
              <div className="flex space-x-2">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-active"
                />
                <div className="text-sm">5 stars</div>
              </div>
            </div>

            <div className="font-semibold">Intro to Basic of User Interaction Design</div>
          </div>

          <div className="flex space-x-20 items-center text-sm">
            <div className="flex items-center space-x-3 ">
              <FontAwesomeIcon
                icon={faMedal}
                className="text-success"
              />
              <p>{courseDetail.level === "beginner" ? "Beginner" : courseDetail.level === "intermediate" ? "Intermediate" : "Advance"}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faBook}
                className="text-success"
              />
              <p>{`${totalModules} Modul`}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faClock}
                className="text-success"
              />
              <p>{`${totalDuration} Menit`}</p>
            </div>
          </div>
          <div className="pt-2">
            <Link
              to={courseDetail.telegram}
              target="blank"
            >
              <Button className="text-xs h-8 bg-success space-x-2">
                <p>Join Grup Telegram</p>
                <FontAwesomeIcon icon={faComments} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
