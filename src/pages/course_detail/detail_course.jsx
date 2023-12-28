import { useEffect, useState } from "react";
// import Video from "./course_video";
import Module from "./module";
import { useParams } from "react-router-dom";
import axios from "axios";
import CourseHeader from "./course_header";
import YouTube from "react-youtube";
import { Button } from "@/components/ui/button";

const DetailCourse = () => {
  const { id } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [titleModule, setTitleModule] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/courses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
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

  const handleModuleSelection = async (selectedModule) => {
    try {
      const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/modules/${selectedModule.id}`, { headers: { Authorization: `Bearer ${token}` } });
      setSelectedModule(res.data.data.video);
      setTitleModule(res.data.data.title);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <CourseHeader />
      <div className="container mb-10 md:flex justify-between ">
        <div className="w-3/5">
          <div className="rounded-lg mt-10 overflow-hidden w-fit">
            <YouTube
              videoId={getYouTubeVideoId(selectedModule)}
              opts={{ width: "820", height: "500", playerVars: { autoplay: 0 } }}
              className=" rounded-full"
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="text-xl ps-2 font-bold">{titleModule}</div>
            <Button className=" w-20 h-8">Next</Button>
          </div>

          <div className="space-y-5 mt-10">
            <div className="font-bold text-2xl">Tentang Kelas</div>
            <div className="text-justify">{courseDetail.description}</div>
            {/* <div className="font-bold text-2xl">Target Audience</div>
            {courseDetail.audience.map((item, index) => (
              <div
                key={index}
                className="ps-3"
              >
                {index + 1 + ". "}
                {item}
              </div>
            ))} */}
          </div>
        </div>
        <div className="w-1/3">
          <Module onSelectModule={handleModuleSelection} />
        </div>
      </div>
    </div>
  );
};

function getYouTubeVideoId(url) {
  const match = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i.exec(url);
  return match ? match[4] : null;
}

export default DetailCourse;
