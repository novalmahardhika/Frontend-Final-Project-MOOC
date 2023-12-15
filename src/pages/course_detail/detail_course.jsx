import { useEffect, useState } from "react";
// import Video from "./course_video";
import Module from "./module";
import { useParams } from "react-router-dom";
import axios from "axios";
import CourseHeader from "./course_header";
import YouTube from "react-youtube";

const DetailCourse = () => {
  const { id } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  // const { selectedVideoUrl, setVideoUrl } = useVideo();
  const [selectedModule, setSelectedModule] = useState(null);

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

  const handleModuleSelection = (selectedModule) => {
    console.log("Selected Module adalah:", selectedModule);
    setSelectedModule(selectedModule);
  };

  return (
    <div>
      <CourseHeader />
      <div className="container mb-10 flex justify-between ">
        <div className="w-3/5">
          <div className="rounded-lg mt-10 overflow-hidden w-fit">
            <YouTube
              videoId={getYouTubeVideoId(selectedModule)}
              opts={{ width: "860", height: "500", playerVars: { autoplay: 0 } }}
              className=" rounded-full"
            />
          </div>

          <div className="space-y-5 mt-10">
            <div className="font-bold text-2xl">Tentang Kelas</div>
            <div className="text-justify">{courseDetail.description}</div>
          </div>
        </div>
        <div className="w-1/3">
          <Module onSelectModule={handleModuleSelection} />
        </div>
      </div>
    </div>
  );
};

export default DetailCourse;
function getYouTubeVideoId(url) {
  const match = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i.exec(url);
  return match ? match[4] : null;
}
