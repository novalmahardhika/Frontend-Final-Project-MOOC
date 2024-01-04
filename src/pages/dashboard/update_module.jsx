import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Loading from "@/components/loading";
import PropTypes from "prop-types";

const UpdateModule = ({ id }) => {
  const [modules, setModules] = useState({
    title: "",
    video: "", // Fix: change Video to video
    // Add other properties as needed
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        setLoading(true); // Set loading to true when starting the request
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/modules/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setModules(res.data.data);
      } catch (error) {
        console.error("Error fetching chapter data:", error);
      } finally {
        setLoading(false); // Set loading to false when request completes (either success or error)
      }
    };

    fetchChapterData();
  }, [id, token]); // Fix: add token to the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModules((prevModules) => ({
      ...prevModules,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      // Perform the update operation here using axios.put or your preferred method
      console.log("Updating data:", modules);

      // Example using axios.put:
      const response = await axios.put(`https://idea-academy.up.railway.app/api/v1/modules/${id}`, modules, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Update response:", response.data);

      // Add any additional handling for success here
    } catch (error) {
      console.error("Error updating chapter data:", error);
    }
  };

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <FontAwesomeIcon
              icon={faPen}
              className="text-active text-xs"
            />
          </DialogTrigger>

          <DialogContent className="border-gray-800 shadow-2xl font-poppins">
            <div className="mb-2 text-2xl font-semibold text-center">Ubah Module</div>
            <Form>
              <div className="px-5 mb-3 space-y-5">
                {loading ? (
                  <Loading />
                ) : (
                  <div className="flex items-end space-x-3">
                    <div className="w-1/3 space-y-1 shadow-sm">
                      <Label className="text-sm font-medium text-gray-800">Judul Modul</Label>
                      <Input
                        placeholder="Masukkan Chapter Number"
                        value={modules.title}
                        name="title"
                        maxLength={100}
                        className="border border-gray-500"
                        autoFocus
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full space-y-1 shadow-sm">
                      <Label className="text-sm font-medium text-gray-800">Link Modul</Label>
                      <Input
                        placeholder="Masukkan Judul Chapter"
                        value={modules.video}
                        name="video"
                        maxLength={100}
                        className="border border-gray-500"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}

                <div className="w-full">
                  <Button
                    className="w-full"
                    onClick={handleUpdate}
                  >
                    Perbarui
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

UpdateModule.propTypes = {
  id: PropTypes.number.isRequired, // Adjust the prop type accordingly
};

export default UpdateModule;
