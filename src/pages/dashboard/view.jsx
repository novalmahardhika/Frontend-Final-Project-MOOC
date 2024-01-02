import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UpdateCourse from "./update_course";
import AddChapter from "./add_chapter";
import AddModule from "./add_module";
import UpdateChapter from "./update_chapter";
import UpdateModule from "./update_module";

const ViewCourse = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [courseList, setCourseList] = useState([]);
  const [activeTab, setActiveTab] = useState("Course");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/courses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setCourseList(res.data.data);
        // console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourse();
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className="container">
        <div className="px-5 mt-5 font-poppins">
          {/* Tabs */}
          <div className="flex mb-4">
            <div
              className={`cursor-pointer ${activeTab === "Course" ? "text-primary font-bold border-b-primary border-b-2" : "text-gray-500"}`}
              onClick={() => handleTabClick("Course")}
            >
              Course
            </div>
            <div
              className={`ml-6 cursor-pointer ${activeTab === "Chapter" ? "text-primary font-bold border-b-primary border-b-2" : "text-gray-500"}`}
              onClick={() => handleTabClick("Chapter")}
            >
              Chapter
            </div>
          </div>

          {activeTab === "Chapter" && (
            <>
              <div className="mt-5 font-poppins">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-2xl">Detail Chapters</div>
                  <div className="flex items-center space-x-2">
                    <AddChapter />
                    <UpdateChapter id={id} />
                  </div>
                </div>
                <Separator className="my-4" />

                <div>
                  <div className="border-b py-2">
                    {courseList.chapters.map((chapter) => (
                      <div
                        key={chapter.id}
                        className="space-y-3"
                      >
                        <div className="flex justify-between">
                          <div className="font-semibold text-sm mt-3">
                            Chapter {chapter.chapterNumber} - {chapter.title} - {chapter.duration + "Minutes"}
                          </div>
                          <div className="flex items-center space-x-2">
                            <AddModule id={chapter.id} />
                            <UpdateModule id={chapter.id} />
                          </div>
                        </div>
                        <Separator className="my-1" />
                        <div className="space-y-3">
                          <div className="text-sm">Detail Modules</div>
                          <div className=" space-y-1">
                            {chapter.modules.map((module, index) => (
                              <div
                                key={module.id}
                                className="px-3"
                              >
                                <div className="text-sm">
                                  {index + 1 + "."} {module.title}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === "Course" && (
            <>
              <div className="mt-5 font-poppins">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-2xl">{courseList.title}</div>
                  <div>
                    <UpdateCourse
                      id={courseList.id}
                      title={courseList.title}
                      creator={courseList.creator}
                      price={courseList.price}
                      telegram={courseList.telegram}
                      level={courseList.level}
                      description={courseList.description}
                      category={courseList.category}
                      image={courseList.image}
                    />
                  </div>
                </div>
                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex space-x-5">
                    <div className="h-full w-[700px]">
                      <img
                        src={courseList.image}
                        alt="Course Thumbnail"
                        className="w-full h-[350px] object-cover rounded-sm"
                      />
                    </div>
                    <div className="w-full">
                      <div className="border-b py-2">
                        <Label className="font-semibold">Deskripsi Kelas</Label>
                        <Textarea
                          value={courseList.description}
                          readOnly
                          className="border-none cursor-default focus:border-none shadow-none h-20"
                        />
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <div className="border-b py-2">
                          <Label className="font-semibold">Kategori</Label>
                          <Input
                            value={courseList.category}
                            readOnly
                            className="border-none cursor-default focus:border-none shadow-none"
                          />
                        </div>
                        <div className="border-b py-2">
                          <Label className="font-semibold">Tingkatan</Label>
                          <Input
                            value={courseList.level}
                            readOnly
                            className="border-none cursor-default focus:border-none shadow-none"
                          />
                        </div>
                        <div className="border-b py-2">
                          <Label className="font-semibold">Tipe Kelas</Label>
                          <Input
                            value={courseList.type}
                            readOnly
                            className="border-none cursor-default focus:border-none shadow-none"
                          />
                        </div>
                        <div className="border-b py-2">
                          <Label className="font-semibold">Harga Kelas</Label>
                          <Input
                            value={courseList.price}
                            readOnly
                            className="border-none cursor-default focus:border-none shadow-none"
                          />
                        </div>

                        <div className="border-b py-2">
                          <Label className="font-semibold">Nama Creator</Label>
                          <Input
                            value={courseList.creator}
                            readOnly
                            className="border-none cursor-default focus:border-none shadow-none"
                          />
                        </div>

                        <div className="border-b py-2">
                          <Label className="font-semibold">Link Telegram</Label>
                          <Input
                            value={courseList.telegram}
                            readOnly
                            className="border-none cursor-default focus:border-none shadow-none w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <Separator className="mt-10" />
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
