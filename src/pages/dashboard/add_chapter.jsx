import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddChapter = () => {
  const { id } = useParams();

  const [chapters, setChapters] = useState([{ title: "", chapterNumber: 0, duration: 0 }]);
  const token = localStorage.getItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();

    // Form validation
    if (!chapters.every((chapter) => chapter.title && chapter.chapterNumber && chapter.duration)) {
      // Handle validation error (you can show a message to the user)
      console.error("All fields must be filled");
      return;
    }

    // You can now proceed to make the axios POST request
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      chapters.map(async (chapter) => {
        const payload = {
          title: chapter.title,
          chapterNumber: chapter.chapterNumber,
          duration: chapter.duration,
        };

        const res = await axios.post(`https://idea-academy.up.railway.app/api/v1/courses/${id}`, payload, config);

        console.log(res);
      });

      toast.success("Data berhasil ditambahkan!", { autoClose: 2000 }); // Menampilkan toast sukses selama 2 detik
    } catch (error) {
      // Handle error (you can show an error message to the user)
      console.error("Error adding chapters:", error);
      toast.error("Gagal menambahkan data. Silakan coba lagi.");
    }
  };

  const handleAddChapter = () => {
    if (chapters.length < 10) {
      setChapters([...chapters, { title: "", chapterNumber: 0, duration: 0 }]);
    }
  };

  const handleRemoveChapter = (index) => {
    const updatedChapters = [...chapters];
    updatedChapters.splice(index, 1);
    setChapters(updatedChapters);
  };

  const handleChapterChange = (index, key, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][key] = value;
    setChapters(updatedChapters);
  };

  return (
    <>
      <div>
        <ToastContainer />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center justify-between space-x-2 bg-success h-7">
              <FontAwesomeIcon icon={faCirclePlus} />
              <div className="text-xs">Tambah</div>
            </Button>
          </DialogTrigger>

          <DialogContent className="border-gray-800 shadow-2xl font-poppins ">
            <div className="mb-2 text-2xl font-semibold text-center">Tambah Chapter</div>
            <Form>
              <div className="px-5 mb-3 space-y-5">
                {chapters.map((chapter, index) => (
                  <div
                    key={index}
                    className="flex items-end space-x-3"
                  >
                    <div className="w-1/3 space-y-1 shadow-sm">
                      <Label className="text-sm font-medium text-gray-800">Chap. No.</Label>
                      <Input
                        placeholder="Masukkan Chapter Number"
                        type="number"
                        value={chapter.chapterNumber}
                        name={`chapterNumber-${index}`}
                        maxLength={3}
                        className="border border-gray-500"
                        onChange={(e) => handleChapterChange(index, "chapterNumber", parseInt(e.target.value))}
                        autoFocus
                      />
                    </div>
                    <div className="w-full space-y-1 shadow-sm">
                      <Label className="text-sm font-medium text-gray-800">Judul Chapter</Label>
                      <Input
                        placeholder="Masukkan Judul Chapter"
                        value={chapter.title}
                        name={`title-${index}`}
                        maxLength={150}
                        className="border border-gray-500"
                        onChange={(e) => handleChapterChange(index, "title", e.target.value)}
                      />
                    </div>

                    <div className="w-1/3 space-y-1 shadow-sm">
                      <Label className="text-sm font-medium text-gray-800">Duration</Label>
                      <Input
                        placeholder="Masukkan Duration"
                        type="number"
                        value={chapter.duration}
                        name={`duration-${index}`}
                        maxLength={3}
                        className="border border-gray-500"
                        onChange={(e) => handleChapterChange(index, "duration", parseInt(e.target.value))}
                      />
                    </div>
                    {index > 0 && (
                      <div>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleRemoveChapter(index)}
                          className="pb-2 text-destructive hover:cursor-pointer hover:opacity-80"
                        />
                      </div>
                    )}
                  </div>
                ))}
                {chapters.length === 5 ? (
                  ""
                ) : (
                  <Button
                    onClick={handleAddChapter}
                    className="mt-2 text-xs text-white bg-blue-500 h-7"
                  >
                    Add Chapter
                  </Button>
                )}
                <div className="w-full">
                  <Button
                    className="w-full"
                    onClick={submitHandler}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddChapter;
