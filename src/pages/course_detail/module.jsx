import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Module = ({ onSelectModule }) => {
  const { id } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const [modulePaid, setModulePaid] = useState(null);

  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchPaid = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/orders`, { headers: { Authorization: `Bearer ${token}` } });
        const courseIdFromParam = id;
        const foundOrder = res.data.data.find((order) => order.courseId === courseIdFromParam && order.status === "COMPLETED");
        setModulePaid(foundOrder);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPaid();
  }, [id, token]);

  const handleModuleClick = async (module) => {
    onSelectModule(module);
  };

  const onPayment = async () => {
    try {
      if (!courseDetail) {
        console.error("Course detail is not available");
        return;
      }

      const response = await axios.post(`https://idea-academy.up.railway.app/api/v1/orders/${courseDetail.id}`, {}, { headers: { Authorization: `Bearer ${token}` } });

      if (response.data && response.data.data && response.data.data.id) {
        const orderId = response.data.data.id;

        navigate(`/payment/${orderId}`);
      } else {
        console.error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error posting order:", error);
    }
  };

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
    return <div>Loading...</div>;
  }

  return (
    <>
      {isMobile ? (
        <>
          <div className="px-4 md:relative md:w-[450px] md:-top-20 w-screen z-1 font-poppins ">
            <div className="p-3">
              <div>
                <div className="font-bold text-lg">Materi Belajar</div>
              </div>
              <div className=" space-y-5">
                {courseDetail.chapters.map((chapter, chapterIndex) => (
                  <div
                    key={chapter.id}
                    className="space-y-3"
                  >
                    <div className="flex justify-between font-semibold text-sm">
                      <div>{`Chapter ${chapter.chapterNumber} - ${chapter.title}`}</div>
                      <div>{`${chapter.duration} Menit`}</div>
                    </div>
                    <div className="space-y-3">
                      {chapter.modules.map((module, index) => (
                        <div
                          key={module.id}
                          onClick={() => handleModuleClick(module, chapterIndex)}
                          className="flex items-center justify-between cursor-pointer bg-secondary rounded-sm hover:scale-105 hover:transition-transform shadow-sm"
                        >
                          {chapterIndex === 0 || courseDetail.type === "free" || modulePaid ? (
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center text-sm">
                                <div className="bg-secondary rounded-full w-10 h-10 items-center justify-center flex">{index + 1}</div>
                                <div>{module.title}</div>
                              </div>

                              <div className={`rounded-full w-6 h-6 flex justify-center items-center me-3 ${module.done ? "bg-success" : "bg-primary"}`}>
                                <FontAwesomeIcon
                                  icon={faPlay}
                                  className="text-white text-xs"
                                />
                              </div>
                            </div>
                          ) : (
                            <Dialog className="font-poppins">
                              <DialogTrigger className="w-full">
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center text-sm">
                                    <div className="bg-secondary rounded-full w-10 h-10 items-center justify-center flex">{index + 1}</div>
                                    <div>{module.title}</div>
                                  </div>
                                  <div className="rounded-full w-6 h-6 bg-gray-400 flex justify-center items-center me-3">
                                    <FontAwesomeIcon
                                      icon={faLock} // Use faLock for the second module
                                      className="text-white text-xs"
                                    />
                                  </div>
                                </div>
                              </DialogTrigger>

                              <DialogContent className="sm:max-w-[500px] font-poppins">
                                <DialogHeader>
                                  <DialogTitle className="text-center text-sm font-normal">Selangkah Lagi Menuju</DialogTitle>
                                  <DialogDescription className="text-center text-2xl text-active font-medium ">Kelas Premium</DialogDescription>
                                </DialogHeader>
                                <div className=" flex flex-col">
                                  <div className="space-y-3 cursor-pointer mx-auto">
                                    <Card className="">
                                      <div>
                                        <img
                                          src={courseDetail.image}
                                          alt="UI/UX Design"
                                          className=" object-cover w-96 h-56 rounded-sm "
                                        />
                                      </div>
                                    </Card>
                                    <div className=" font-bold text-center">{courseDetail.title}</div>
                                  </div>
                                </div>
                                <DialogFooter className="flex">
                                  <Button
                                    type="button"
                                    onClick={() => onPayment()}
                                    className="flex  mx-auto hover:bg-active w-60"
                                  >
                                    Beli Sekarang
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="md:relative md:w-[450px] md:-top-20 w-screen z-1 font-poppins ">
            <Card className="p-3">
              <CardHeader>
                <CardTitle className="font-bold text-lg">Materi Belajar</CardTitle>
              </CardHeader>
              <CardContent className=" space-y-10">
                {courseDetail.chapters.map((chapter, chapterIndex) => (
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
                          onClick={() => handleModuleClick(module, chapterIndex)}
                          className="flex items-center justify-between cursor-pointer bg-secondary rounded-sm hover:scale-105 hover:transition-transform shadow-sm"
                        >
                          {chapterIndex === 0 || courseDetail.type === "free" || modulePaid ? (
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center text-sm">
                                <div className="bg-secondary rounded-full w-10 h-10 items-center justify-center flex">{index + 1}</div>
                                <div>{module.title}</div>
                              </div>

                              <div className={`rounded-full w-6 h-6 flex justify-center items-center me-3 ${module.done ? "bg-success" : "bg-primary"}`}>
                                <FontAwesomeIcon
                                  icon={faPlay}
                                  className="text-white text-xs"
                                />
                              </div>
                            </div>
                          ) : (
                            <Dialog className="font-poppins">
                              <DialogTrigger className="w-full">
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center text-sm">
                                    <div className="bg-secondary rounded-full w-10 h-10 items-center justify-center flex">{index + 1}</div>
                                    <div>{module.title}</div>
                                  </div>
                                  <div className="rounded-full w-6 h-6 bg-gray-400 flex justify-center items-center me-3">
                                    <FontAwesomeIcon
                                      icon={faLock}
                                      className="text-white text-xs"
                                    />
                                  </div>
                                </div>
                              </DialogTrigger>

                              <DialogContent className="sm:max-w-[500px] font-poppins">
                                <DialogHeader>
                                  <DialogTitle className="text-center text-sm font-normal">Selangkah Lagi Menuju</DialogTitle>
                                  <DialogDescription className="text-center text-2xl text-active font-medium ">Kelas Premium</DialogDescription>
                                </DialogHeader>
                                <div className=" flex flex-col">
                                  <div className="space-y-3 cursor-pointer mx-auto">
                                    <Card className="">
                                      <div>
                                        <img
                                          src={courseDetail.image}
                                          alt="UI/UX Design"
                                          className=" object-cover w-96 h-56 rounded-sm "
                                        />
                                      </div>
                                    </Card>
                                    <div className=" font-bold text-center">{courseDetail.title}</div>
                                  </div>
                                </div>
                                <DialogFooter className="flex">
                                  <Button
                                    type="button"
                                    onClick={() => onPayment()}
                                    className="flex  mx-auto hover:bg-active w-60"
                                  >
                                    Beli Sekarang
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

Module.propTypes = {
  onSelectModule: PropTypes.func.isRequired,
};

export default Module;
