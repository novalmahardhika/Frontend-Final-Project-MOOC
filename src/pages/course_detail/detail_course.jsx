import { useEffect, useState } from "react";
import Module from "./module";
import { useParams } from "react-router-dom";
import axios from "axios";
import CourseHeader from "./course_header";
import YouTube from "react-youtube";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Loading from "@/components/loading";

const DetailCourse = () => {
  const { id } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [titleModule, setTitleModule] = useState(null);
  const [activeTab, setActiveTab] = useState("Tentang");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/courses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setCourseDetail(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourseDetail();
  }, [id, token]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!courseDetail) {
    return <Loading />;
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {isMobile ? (
        <>
          <div className="overflow-y-auto mb-20">
            <div className=" w-screen">
              <YouTube
                videoId={getYouTubeVideoId(selectedModule)}
                opts={{
                  height: "200", // Atur tinggi video
                  width: "100%", // Gunakan lebar responsif
                  playerVars: { autoplay: 0 },
                }}
                className="w-full md:w-[640px] lg:w-[800px] xl:w-[960px] mx-auto" // Gunakan kelas Tailwind CSS untuk mengatur lebar responsif
              />
            </div>
            <div className="flex flex-col">
              <div>
                <CourseHeader />
                <div className="flex bg-secondary items-center">
                  <div
                    className={`w-1/2 px-3 py-3  text-center ${activeTab === "Tentang" ? "bg-primary  text-white" : ""}`}
                    onClick={() => handleTabChange("Tentang")}
                  >
                    Tentang
                  </div>

                  <div
                    className={`w-1/2 px-3 py-3 text-center  ${activeTab === "Materi" ? "bg-primary text-white" : ""}`}
                    onClick={() => handleTabChange("Materi")}
                  >
                    Materi Kelas
                  </div>
                </div>

                {/* Konten Tab */}
                {activeTab === "Tentang" ? (
                  <>
                    <Link
                      to={courseDetail.telegram}
                      target="_blank"
                      className="flex justify-center my-5"
                    >
                      <Button className="text-xs h-8 bg-success space-x-2">
                        <p>Join Grup Telegram</p>
                        <FontAwesomeIcon icon={faComments} />
                      </Button>
                    </Link>{" "}
                    <div className="space-y-3">
                      <div className="text-justify px-4 text-primary font-semibold text-xl">Tentang Kelas</div>
                      <div className="text-justify px-4">{courseDetail.description}</div>
                    </div>
                  </>
                ) : (
                  <Module onSelectModule={handleModuleSelection} />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <CourseHeader />
            <div className="container mb-14 md:flex justify-between ">
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
                </div>
                <div>
                  <div className="space-y-2 mt-5">
                    <div className="font-bold text-2xl">Tentang Kelas</div>
                    <div className="text-justify">{courseDetail.description}</div>
                  </div>
                  <div className="space-y-2 mt-5">
                    <div className="font-bold text-2xl">Target Audience</div>
                    {courseDetail.audience.map((item, index) => (
                      <div key={index}>
                        {index + 1 + ". "}
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-1/3">
                <Module onSelectModule={handleModuleSelection} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

function getYouTubeVideoId(url) {
  const match = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i.exec(url);
  return match ? match[4] : null;
}

export default DetailCourse;
