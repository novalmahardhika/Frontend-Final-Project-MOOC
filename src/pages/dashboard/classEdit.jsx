import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const url = "https://idea-academy.up.railway.app/api/v1/courses/";

export default function ClassEdit() {
  const { token } = React.useContext(AuthContext);
  const { id } = useParams();
  
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [type, setType] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [telegram, setTelegram] = React.useState("");
  const [creator, setCreator] = React.useState("");
  const [rating, setRating] = React.useState("");

  const [tmpImg, setTmpImg] = React.useState("");
  const [isRequestDone, setIsRequestDone] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  
  async function getData(id) {
    try {
      const response = await axios.get(url + id, {
        headers: {
          Authorization: token
        }
      });
      const data = response.data?.data;
      setTitle(data.title);
      setCategory(data.category);
      setType(data.type);
      setLevel(data.level);
      setPrice(data.price);
      setImage(data.image);
      setDescription(data.description);
      setTelegram(data.telegram);
      setCreator(data.creator);
      setRating(data.rating);
    } catch (err) {
      console.error(err)
    }
  }

  React.useEffect(() => {
    getData(id);
  }, [id])

  React.useEffect(() => {
    if (image.name == null || !image["type"].includes("image")) {
      return;
    }
    setTmpImg(URL.createObjectURL(image));
  }, [image])

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsRequestDone(false);
      setErrMsg("");

      const formData = new FormData(e.currentTarget);
      formData.append("image", image);
      const res = await axios.put(url + id, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multiform/form-data"
        }
      });

      setTitle("");
      setCategory("");
      setType("");
      setLevel("");
      setPrice("");
      setImage("");
      setDescription("");
      setTelegram("");
      setCreator("");
      setRating("");
    } catch (err) {
      console.error(err);
      setErrMsg(err.response?.data?.message || err.message || "Register failed, please try again.");
    } finally {
      setIsRequestDone(true);
    }
  };

  const onPaste = (e) => {
    try {
      const data = e.clipboardData;
      if (data.getData("text")) return;
      
      const file = data.files[0];
      if (!file["type"].includes("image")) return;

      setImage(file)
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="font-poppins flex" onPaste={onPaste}>
      <div className="flex mx-auto my-auto items-center w-4/5">
        <div className=" mx-auto items-center w-4/5">
          <div className="max-w-md mx-auto p-8 space-y-6">

            {isRequestDone && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center h-20 z-10">
                <div className={(errMsg ? "bg-destructive" : "bg-success") + " text-white p-4 rounded-md shadow-md"}>
                  {errMsg ? errMsg : "Data berhasil diupdate"}
                  <a href="#" onClick={e => setIsRequestDone(false)}>
                    <FontAwesomeIcon className="ml-4" icon={faXmark} />
                  </a>
                </div>
              </div>
            )}
            
            <h2 className="text-2xl font-semibold text-center">Update</h2>
            <form className="space-y-7" onSubmit={onSubmit}>
              
              {/* Title */}
              <div className="space-y-1 relative">
                <div className="block text-sm font-medium text-gray-800">Title</div>
                <Input
                  placeholder="Title"
                  className={`h-11`}
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              {/* Category */}
              <div className="space-y-1 relative">
                <div className="block text-sm font-medium text-gray-800">Category</div>
                <Input
                  placeholder="Category"
                  className={`h-11`}
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              </div>

              {/* Type */}
              <div className="space-y-1 relative">
                <div className="block text-sm font-medium text-gray-800">Type</div>
                <Input
                  placeholder="Type"
                  className={`h-11`}
                  id="type"
                  name="type"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
              </div>

              {/* Level */}
              <div className="space-y-1 relative">
                <div className="block text-sm font-medium text-gray-800">Level</div>
                <Input
                  placeholder="Level"
                  className={`h-11`}
                  id="level"
                  name="level"
                  value={level}
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                />
              </div>

              {/* Price */}
              <div className="space-y-1 relative">
                <div className="block text-sm font-medium text-gray-800">Price</div>
                <Input
                  placeholder="Price"
                  className={`h-11`}
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>

              {/* Image */}
              <div className="space-y-1 relative">
                <div className="block text-sm font-medium text-gray-800">Image</div>
                {image ? (<img src={tmpImg? tmpImg : image} style={{ maxWidth: "100%", maxHeight: "267.6px" }} />) : ""}
                <Input
                  type="file"
                  id="image"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </div>

              {/* Description */}
              <div className="space-y-1 relative">
                <div className="block text-sm font-medium text-gray-800">
                  Description
                </div>
                <Input
                  placeholder="Description"
                  className={`h-11`}
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>

              {/* Telegram */}
              <div className="space-y-1 relative">
                <div className="block text-sm font-medium text-gray-800">Telegram</div>
                <Input
                  placeholder="Telegram"
                  className={`h-11`}
                  id="telegram"
                  name="telegram"
                  value={telegram}
                  onChange={(e) => {
                    setTelegram(e.target.value);
                  }}
                />
              </div>

              {/* Creator */}
              <div className="space-y-1 relative">
                <div className="block text-sm font-medium text-gray-800">Creator</div>
                <Input
                  placeholder="Creator"
                  className={`h-11`}
                  id="creator"
                  name="creator"
                  value={creator}
                  onChange={(e) => {
                    setCreator(e.target.value);
                  }}
                />
              </div>

              {/* Rating */}
              <div className="space-y-1 relative">
                <div className="block text-sm font-medium text-gray-800">Rating</div>
                <Input
                  placeholder="Rating"
                  className={`h-11`}
                  id="rating"
                  name="rating"
                  value={rating}
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                />
              </div>

              {/* Tombol Submit */}
              <div className="pt-3">
                <Button
                  type="submit"
                  className="w-full h-11 hover:bg-active"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}