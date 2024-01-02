import { useEffect, useState } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const UpdateModule = (idChapter) => {
  const [chapters, setChapters] = useState([{ title: "", videoLink: "" }]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/chapters/${idChapter}`, config);
        console.log(res.data.data.modules);

        // Make sure res.data.chapters is an array before setting it
        const fetchedChapters = Array.isArray(res.data.data.modules) ? res.data.data.modules : [];
        setChapters(fetchedChapters);
      } catch (error) {
        console.error("Error fetching chapter data:", error);
      }
    };

    fetchChapterData();
  }, [idChapter, token]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!chapters.every((chapter) => chapter.title && chapter.videoLink)) {
      console.error("All fields must be filled");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const formDataToSend = {
        chapters: chapters.map((chapter) => ({
          title: chapter.title,
          videoLink: chapter.videoLink,
        })),
      };

      const res = await axios.post(`https://idea-academy.up.railway.app/api/v1/chapters/${idChapter}`, formDataToSend, config);

      console.log("Chapters updated successfully:", res.data);
    } catch (error) {
      console.error("Error updating chapters:", error);
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center justify-between space-x-2 bg-active h-7">
              <FontAwesomeIcon icon={faPen} />
              <div className="text-xs">Ubah</div>
            </Button>
          </DialogTrigger>

          <DialogContent className="shadow-2xl font-poppins border-gray-800 ">
            <div className="mb-2 text-2xl font-semibold text-center">Ubah Modul</div>
            <Form>
              <div className="px-5 space-y-5 mb-3">
                {chapters.map((chapter, index) => (
                  <div
                    key={index}
                    className="flex space-x-3 items-end"
                  >
                    <div className="space-y-1 shadow-sm">
                      <Label className="text-sm font-medium text-gray-800">Judul Module</Label>
                      <Input
                        placeholder="Masukkan Judul"
                        value={chapter.title}
                        name={`title-${index}`}
                        maxLength={100}
                        className="border border-gray-500"
                        onChange={(e) => handleChapterChange(index, "title", e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="space-y-1 shadow-sm">
                      <Label className="text-sm font-medium text-gray-800">Link Video</Label>
                      <Input
                        placeholder="Link Video Module"
                        value={chapter.videoLink}
                        name={`videoLink-${index}`}
                        maxLength={100}
                        className="border border-gray-500"
                        onChange={(e) => handleChapterChange(index, "videoLink", e.target.value)}
                      />
                    </div>
                    {index >= 0 && (
                      <>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <div>
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-destructive hover:cursor-pointer hover:opacity-80 pb-2"
                              />
                            </div>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure delete this item?</AlertDialogTitle>
                              <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRemoveChapter(index)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                ))}
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

export default UpdateModule;
