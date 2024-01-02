import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const UpdateCourse = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    creator: "",
    description: "",
    level: "",
    type: "",
    price: "",
    image: null,
    telegram: "",
  });
  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, image: file });
    } else {
      setImage(null);
      setFormData({ ...formData, image: null });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.title || !formData.category || !formData.creator || !formData.description || !formData.level || !formData.type || !formData.price || !formData.image || !formData.telegram) {
      // Handle validation error (you can show a message to the user)
      console.error("All fields must be filled");
      return;
    }

    // Additional validation for price (numeric check)
    if (isNaN(formData.price)) {
      // Handle validation error for price (you can show a message to the user)
      console.error("Price must be a number");
      return;
    }

    // You can now proceed to make the axios POST request
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("creator", formData.creator);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("level", formData.level);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("telegram", formData.telegram);

      const res = await axios.post("https://idea-academy.up.railway.app/api/v1/courses", formDataToSend, config);

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
            <Button className="flex items-center justify-between h-8 space-x-2 bg-success">
              <FontAwesomeIcon icon={faCirclePlus} />
              <div>Course</div>
            </Button>
          </DialogTrigger>

          <DialogContent className="shadow-2xl font-poppins border-gray-800 md:h-[600px]">
            <div className="mb-2 text-2xl font-semibold text-center">Tambah Kelas</div>
            <Form>
              <div className="px-5 space-y-5 overflow-y-scroll">
                <div className="relative space-y-1 shadow-sm">
                  <Label className="block text-sm font-medium text-gray-800">Nama Kelas</Label>
                  <Input
                    placeholder="Nama Kelas"
                    name="title"
                    maxLength={50}
                    className="border border-gray-500"
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    autoFocus
                  />
                </div>
                <div className="relative space-y-1 shadow-sm">
                  <Label className="block text-sm font-medium text-gray-800">Kategori</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="w-full border border-gray-500">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent className="p-1 cursor-pointer font-poppins">
                      <SelectItem
                        className="cursor-pointer"
                        value="Android Development"
                      >
                        Android Development
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer"
                        value="Data Science"
                      >
                        Data Science
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer"
                        value="IOS Development"
                      >
                        IOS Development
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer"
                        value="Product Management"
                      >
                        Product Management
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer"
                        value="UI/UX Design"
                      >
                        UI/UX Design
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer"
                        value="Web Development"
                      >
                        Web Development
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative space-y-1 shadow-sm">
                  <Label className="block text-sm font-medium text-gray-800">Nama Fasilitator/Creator</Label>
                  <Input
                    placeholder="Nama Lengkap Fasilitator/Creator"
                    name="creator"
                    maxLength={50}
                    className="border border-gray-500"
                    onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                  />
                </div>
                <div className="relative space-y-1 shadow-sm">
                  <Label className="block text-sm font-medium text-gray-800">Deskripsi Kelas</Label>
                  <Textarea
                    placeholder="Deskripsi Kelas"
                    id="description"
                    className="border border-gray-500"
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="relative space-y-1 shadow-sm">
                  <Label className="block text-sm font-medium text-gray-800">Tipe Kelas</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="w-full border border-gray-500">
                      <SelectValue placeholder="Pilih tipe kelas" />
                    </SelectTrigger>
                    <SelectContent className="p-1 font-poppins">
                      <SelectItem
                        className="cursor-pointer"
                        value="free"
                      >
                        Free
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer"
                        value="premium"
                      >
                        Premium
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative space-y-1 shadow-sm">
                  <Label className="block text-sm font-medium text-gray-800">Tingkatan</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger className="w-full border border-gray-500">
                      <SelectValue placeholder="Pilih Level" />
                    </SelectTrigger>
                    <SelectContent className="p-1 font-poppins">
                      <SelectItem
                        className="cursor-pointer"
                        value="beginner"
                      >
                        Beginner
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer"
                        value="intermediate"
                      >
                        Intermediate
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer"
                        value="advance"
                      >
                        Advance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative space-y-1 shadow-sm">
                  <Label className="block text-sm font-medium text-gray-800">Harga</Label>
                  <Input
                    placeholder="Masukkan"
                    type="number"
                    name="price"
                    maxLength={50}
                    className="border border-gray-500"
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div className="relative space-y-1 shadow-sm">
                  <Label className="block text-sm font-medium text-gray-800">Tumbnail Kelas</Label>
                  <div className="flex items-center space-x-2">
                    {image && (
                      <>
                        <img
                          src={image}
                          alt="Thumbnail Preview"
                          className="object-cover w-full h-20 rounded-sm"
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-500 cursor-pointer"
                          onClick={() => setImage(null)}
                        />
                      </>
                    )}
                    {!image && (
                      <>
                        <Button
                          className="cursor-pointer h-7 bg-success"
                          onClick={() => document.getElementById("thumbnailInput").click()}
                        >
                          <div className="flex items-center space-x-2 ">
                            <FontAwesomeIcon
                              icon={faCirclePlus}
                              className="text-white"
                            />
                            <div className="text-xs">Tambah Gambar</div>
                          </div>
                        </Button>
                        <input
                          type="file"
                          id="thumbnailInput"
                          name="image"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="relative space-y-1 shadow-sm">
                  <Label className="block text-sm font-medium text-gray-800">Link Grup Kelas</Label>
                  <Input
                    placeholder="Link Telegram"
                    name="telegram"
                    className="border border-gray-500"
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
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

export default UpdateCourse;
