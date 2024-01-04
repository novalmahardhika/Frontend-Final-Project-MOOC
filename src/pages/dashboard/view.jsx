// ... (kode lainnya)
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UpdateCourse from "./update_course";
import AddChapter from "./add_chapter";
import AddModule from "./add_module";
import UpdateChapter from "./update_chapter";
import UpdateModule from "./update_module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Loading from "@/components/loading";

const ViewCourse = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [courseList, setCourseList] = useState([]);
  const [activeTab, setActiveTab] = useState("Course");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/courses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        const sortedCourseList = sortChapters(res.data.data);
        setCourseList(sortedCourseList);
        console.log(sortedCourseList);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, token]);

  const deleteHandler = async (e) => {
    try {
      const res = await axios.delete(`https://idea-academy.up.railway.app/api/v1/modules/${e.currentTarget.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const sortChapters = (courseList) => {
    return {
      ...courseList,
      chapters: courseList.chapters.sort((a, b) => a.chapterNumber - b.chapterNumber),
    };
  };

  if (loading) {
    return <Loading />;
  }

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

          {/* Tampilkan tab Chapter hanya jika loading selesai */}
          {activeTab === "Chapter" && (
            <>
              <div className="mt-5 font-poppins">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-semibold">Detail Chapters</div>
                  <div className="flex items-center space-x-2">
                    <AddChapter />
                    <UpdateChapter id={id} />
                  </div>
                </div>
                <Separator className="my-4" />

                <div>
                  <div className="py-2 border-b">
                    {courseList.chapters.map((chapter) => (
                      <div
                        key={chapter.id}
                        className="space-y-3"
                      >
                        <div className=" flex justify-between">
                          <div className=" text-sm font-semibold">
                            Chapter {chapter.chapterNumber} - {chapter.title} - {chapter.duration + "Minutes"}
                          </div>
                          <div className="flex items-center space-x-2">
                            <AddModule id={chapter.id} />
                          </div>
                        </div>
                        <Separator className="my-1" />
                        <div className="space-y-3 pb-10">
                          <div className="text-sm">Modules</div>
                          <div className="space-y-1 ">
                            {chapter?.modules?.map((module, index) => (
                              <div
                                key={module.id}
                                className="px-3 flex justify-between items-center"
                              >
                                <div className="text-sm">
                                  {index + 1 + "."} {module.title}
                                </div>
                                <div className="flex space-x-3 items-center">
                                  <UpdateModule id={module.id} />
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        className="text-destructive text-xs"
                                      />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          id={module.id}
                                          onClick={deleteHandler}
                                        >
                                          Continue
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
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
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-semibold">{courseList.title}</div>
                  <div>
                    <UpdateCourse
                      id={courseList.id}
                      title={courseList.title}
                      creator={courseList.creator}
                      price={courseList.price}
                      telegram={courseList.telegram}
                      level={courseList.level}
                      type={courseList.type}
                      description={courseList.description}
                      category={courseList.category}
                      image={courseList.image}
                    />
                  </div>
                </div>
                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex space-x-5 w-full">
                    <div className="h-full w-[700px]">
                      <img
                        src={courseList.image}
                        alt="Course Thumbnail"
                        className="w-full h-[450px] object-cover rounded-sm"
                      />
                    </div>
                    <div className="w-full">
                      <div className="py-2 border-b">
                        <Label className="font-semibold">Deskripsi Kelas</Label>
                        <Textarea
                          value={courseList.description}
                          readOnly
                          className="h-24 border-none shadow-none cursor-default focus:border-none"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <div className="border-b flex w-full py-3">
                          <div className="flex items-center w-full">
                            <Label className="font-semibold w-1/2">Kategori</Label>
                            <Label className="font-normal">: {courseList.category}</Label>
                          </div>
                          <div className="flex items-center w-full">
                            <Label className="font-semibold w-1/2">Tingkatan</Label>
                            <Label className="font-normal">: {courseList.level}</Label>
                          </div>
                        </div>
                        <div className="border-b flex w-full py-3">
                          <div className="flex items-center w-full">
                            <Label className="font-semibold w-1/2">Tipe Kelas</Label>
                            <Label className="font-normal">: {courseList.type}</Label>
                          </div>
                          <div className="flex items-center w-full">
                            <Label className="font-semibold w-1/2">Harga Kelas</Label>
                            <Label className="font-normal">: {courseList.price}</Label>
                          </div>
                        </div>
                        <div className="border-b flex w-full py-3">
                          <div className="flex items-center w-full">
                            <Label className="font-semibold w-1/4">Nama Creator</Label>
                            <Label className="font-normal">: {courseList.creator}</Label>
                          </div>
                        </div>
                        <div className="border-b flex w-full py-3">
                          <div className="flex items-center w-full">
                            <Label className="font-semibold w-1/4">Link Grup</Label>
                            <Label className="font-normal">: {courseList.telegram}</Label>
                          </div>
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
