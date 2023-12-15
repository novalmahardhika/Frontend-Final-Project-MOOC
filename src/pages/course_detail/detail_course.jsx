import { useEffect, useState } from "react";
import Video from "./course_video";
import Module from "./module";
import { useParams } from "react-router-dom";
import axios from "axios";
import CourseHeader from "./course_header";

const DetailCourse = () => {
  const { id } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  // const { selectedVideoUrl, setVideoUrl } = useVideo();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/course/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setCourseDetail(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourseDetail();
  }, [id, token]);

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

  // const handleSelectModule = (videoUrl) => {
  //   setVideoUrl(videoUrl);
  // };

  return (
    <div>
      <CourseHeader />
      <div className="container mb-10 flex justify-between ">
        <div className="w-2/3">
          <Video />

          <div className="space-y-5 mt-10">
            <div className="font-bold text-2xl">Tentang Kelas</div>
            <div className="text-justify">{courseDetail.description}</div>
          </div>
        </div>
        <div className="w-1/3">
          <Module />
        </div>
      </div>
    </div>
  );
};

export default DetailCourse;
