import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const AddModule = (idChapter) => {
  const [modules, setModules] = useState([{ title: "", videoLink: "" }]);
  const token = localStorage.getItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();

    // Form validation
    if (!modules.every((module) => module.title && module.videoLink)) {
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

      modules.map(async (module) => {
        const payload = {
          title: module.title,
          video: module.videoLink,
        };

        const res = await axios.post(`https://idea-academy.up.railway.app/api/v1/chapters/${idChapter.id}`, payload, config);

        console.log(res.data.data);
        toast.success("Data berhasil ditambahkan!", { autoClose: 2000 });
      });

      // Handle success (you can show a success message or redirect)
    } catch (error) {
      // Handle error (you can show an error message to the user)
      console.error("Error adding modules:", error);
      console.error("Error adding course:", error);
    }
  };

  const handleAddModule = () => {
    if (modules.length < 10) {
      setModules([...modules, { title: "", videoLink: "" }]);
    }
  };

  const handleRemoveModule = (index) => {
    const updatedModules = [...modules];
    updatedModules.splice(index, 1);
    setModules(updatedModules);
  };

  const handleModuleChange = (index, key, value) => {
    const updatedModules = [...modules];
    updatedModules[index][key] = value;
    setModules(updatedModules);
  };

  return (
    <>
      <div>
        <ToastContainer />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center h-6 space-x-2 bg-blue-500">
              <FontAwesomeIcon
                icon={faCirclePlus}
                className=" hover:text-active"
              />
              <div className="text-xs">Module</div>
            </Button>
          </DialogTrigger>

          <DialogContent className="border-gray-800 shadow-2xl font-poppins ">
            <div className="mb-2 text-2xl font-semibold text-center">Tambah Module</div>
            <Form>
              <div className="px-5 mb-3 space-y-5">
                {modules.map((module, index) => (
                  <div
                    key={index}
                    className="flex items-end space-x-3"
                  >
                    <div className="space-y-1 shadow-sm">
                      <Label className="text-sm font-medium text-gray-800">Judul Module</Label>
                      <Input
                        placeholder="Masukkan Judul"
                        value={module.title}
                        name={`title-${index}`}
                        maxLength={100}
                        className="border border-gray-500"
                        onChange={(e) => handleModuleChange(index, "title", e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="space-y-1 shadow-sm">
                      <Label className="text-sm font-medium text-gray-800">Link Video</Label>
                      <Input
                        placeholder="Link Video Module"
                        value={module.videoLink}
                        name={`video-${index}`}
                        maxLength={100}
                        className="border border-gray-500"
                        onChange={(e) => handleModuleChange(index, "videoLink", e.target.value)}
                      />
                    </div>
                    {index > 0 && (
                      <div>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleRemoveModule(index)}
                          className="pb-2 text-destructive hover:cursor-pointer hover:opacity-80"
                        />
                      </div>
                    )}
                  </div>
                ))}
                {modules.length === 10 ? (
                  ""
                ) : (
                  <Button
                    onClick={handleAddModule}
                    className="mt-2 text-xs text-white bg-blue-500 h-7"
                  >
                    Add Module
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

export default AddModule;
