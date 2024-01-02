import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const AddChapter = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    chapterNumber: 0,
    duration: 0,
  });
  console.log(formData);
  const token = localStorage.getItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.title || !formData.chapterNumber || !formData.duration) {
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

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("chapterNumber", formData.chapterNumber);

      formDataToSend.append("duration", formData.duration);

      const res = await axios.post(`https://idea-academy.up.railway.app/api/v1/courses/${id}`, formDataToSend, config);

      // Handle success (you can show a success message or redirect)
      console.log("Course added successfully:", res.data);
    } catch (error) {
      // Handle error (you can show an error message to the user)
      console.error("Error adding course:", error);
    }
  };

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center justify-between space-x-2 bg-success">
              <FontAwesomeIcon icon={faCirclePlus} />
              <div>Chapter</div>
            </Button>
          </DialogTrigger>

          <DialogContent className="shadow-2xl font-poppins border-gray-800 ">
            <div className="mb-2 text-2xl font-semibold text-center">Tambah Chapter</div>
            <Form>
              <div className="px-5 space-y-5 mb-3">
                <div className="relative space-y-1 shadow-sm">
                  <Label className="block text-sm font-medium text-gray-800">Judul Chapter</Label>
                  <Input
                    placeholder="Masukkan Judul Chapter"
                    name="title"
                    maxLength={50}
                    className="border border-gray-500"
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    autoFocus
                  />
                </div>
                <div className="relative space-y-1 shadow-sm">
                  <Label className="block text-sm font-medium text-gray-800">Chapter Number</Label>
                  <Input
                    placeholder="Masukkan"
                    type="number"
                    name="chapterNumber"
                    maxLength={3}
                    className="border border-gray-500"
                    onChange={(e) => setFormData({ ...formData, chapterNumber: e.target.value })}
                  />
                </div>
                <div className="relative space-y-1 shadow-sm">
                  <Label className="block text-sm font-medium text-gray-800">Duration</Label>
                  <Input
                    placeholder="Masukkan"
                    type="number"
                    name="duration"
                    maxLength={3}
                    className="border border-gray-500"
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
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
