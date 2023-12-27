// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Filter from "@/components/filter_button";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const KelolaKelas = () => {
  const { token, logout } = useContext(AuthContext);
  const [courses, SetCourses] = useState([]);
  const [filterType, setFilterType] = useState("ASC");
  const [search, setSearch] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isRequestDone, setIsRequestDone] = useState(false);

  async function getData() {
    try {
      const data = await axios.get("https://idea-academy.up.railway.app/api/v1/courses", {
        headers: {
          Authorization: token
        }
      });
      SetCourses(data.data.data);
      return data.data.data;
    } catch (err) {
      console.error(err)
    }
  }

  async function deleteCourse(e) {
    const id = e.target.value
    let data;
    setIsRequestDone(false);
    setErrMsg(false);
    try {
      data = await axios.delete("https://idea-academy.up.railway.app/api/v1/courses/" + id, {
        headers: {
          Authorization: token
        }
      });

      if (data.data.status == "OK") {
        SetCourses(courses.filter(e => e.id != id));
      } else {
        setErrMsg(data.data.message)
      }
    } catch (err) {
      console.error(err)
      setErrMsg(err.response?.data?.message);
    }
    setIsRequestDone(true);
    return data.data.data;
  }

  useEffect(() => {
    if (!token)
      return;
    getData();
  }, [token])
  
  let sortedData = courses;

  if (search != null && search != "") {
    sortedData = sortedData.filter(e => {
      for (const [key, value] of Object.entries(e)) {
        if (typeof(value) != "string" || key == "id") continue;
        if (value.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
          return true;
      }

      return false;
    });
  }

  sortedData = sortedData.sort((a, b) => {
    if (filterType === "ASC") {
      return a.category.localeCompare(b.category);
    } else {
      return b.category.localeCompare(a.category);
    }
  });

  return (
    <div className="px-10 font-poppins">
      <div className="flex flex-1 items-center justify-between mb-4">
        <div className="text-2xl font-semibold">Kelola Kelas</div>
        <div className="flex space-x-4 justify-between">
          <Filter onFilterChange={setFilterType} onSearchChange={setSearch} />
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>Table Data Kelas.</TableCaption>
          <TableHeader className="bg-secondary h-12">
            <TableRow>
              <TableHead className="text-primary font-bold">Kode Kelas</TableHead>
              <TableHead className="text-primary font-bold">Kategori</TableHead>
              <TableHead className="text-primary font-bold">Nama Kelas</TableHead>
              <TableHead className="text-primary font-bold">Tipe Kelas</TableHead>
              <TableHead className="text-primary font-bold">Level</TableHead>
              <TableHead className="text-primary font-bold">Harga Kelas</TableHead>
              <TableHead className="text-primary font-bold text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.kodeKelas}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell className={item.type.toUpperCase() === "PREMIUM" ? "text-active font-semibold" : "text-success font-medium"}>{item.type.toUpperCase()}</TableCell>
                <TableCell>{item.level.toUpperCase()}</TableCell>
                <TableCell>Rp. {item.price}</TableCell>
                <TableCell className="justify-between space-x-2">
                    <Button className=" w-14 h-6 text-xs bg-success" onClick={() => location.href += `/update/${item.id}`}>Ubah</Button>
                    <Button className=" w-14 h-6 text-xs bg-destructive" onClick={deleteCourse} value={item.id}>Hapus</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {isRequestDone && <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center h-20 z-10">
          <div className={"text-white p-4 rounded-md shadow-md " + (errMsg ? "bg-destructive" : "bg-success")}>
            {errMsg || "Data berhasil dihapus..."}
            <a href="#" onClick={e => setIsRequestDone(false)}>
              <FontAwesomeIcon className="ml-4" icon={faXmark} />
            </a>
          </div>
      </div>}
    </div>
  );
};

export default KelolaKelas;
