import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Module = () => {
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

  return (
    <div className="absolute w-1/4 top-52 z-10 font-poppins ms-10">
      <Card className="p-3">
        <CardHeader>
          <CardTitle className="font-bold text-lg">Materi Belajar</CardTitle>
        </CardHeader>
        <CardContent className=" space-y-10">
          {courseDetail.chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="space-y-5"
            >
              <div className="flex justify-between font-semibold text-sm">
                <div>{`Chapter ${chapter.chapterNumber} - ${chapter.title}`}</div>
                <div>{`${chapter.duration} Menit`}</div>
              </div>
              <div className="space-y-3">
                {chapter.modules.map((module, index) => (
                  <div
                    key={module.id}
                    className="flex items-center justify-between cursor-pointer space-y-2"
                    onClick={() => console.log(`Module clicked: ${module.title}`)} // Tambahkan logikanya di sini
                  >
                    <div
                      value={module.Video}
                      className="flex items-center text-sm space-x-3"
                    >
                      <div className="bg-secondary rounded-full w-10 h-10 items-center justify-center flex">{index + 1}</div>
                      <div>{module.title}</div>
                    </div>
                    <div className="rounded-full w-8 h-8 bg-success flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

Module.propTypes = {
  onSelectModule: PropTypes.func.isRequired,
};

export default Module;
