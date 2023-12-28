// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Filter from "@/components/filter_button";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";

const KelolaKelas = () => {
  const [courses, SetCourses] = useState([]);
  async function getData() {
    try {
      const data = await axios.get("https://idea-academy.up.railway.app/api/v1/courses", {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwNDA5ZmI0LTNlMWUtNDFhNC04NzI2LTQxYTBjMmE2ZTk5ZSIsImlhdCI6MTcwMzMwNzU4M30.CMDb7Xw1730zLb-0PVuHR4L0YimuH-iABs3BbPfeYVw"
        }
      });
      SetCourses(data.data.data);
      return data.data.data;
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <body className="px-10 font-poppins">
      <div className="flex flex-1 items-center justify-between mb-4">
        <div className="text-2xl font-semibold">Kelola Kelas</div>
        <div className="flex space-x-4 justify-between">
          <Filter />
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
              <TableHead className="text-primary font-bold">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.kodeKelas}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell className={item.type === "PREMIUM" ? "text-active font-semibold" : "text-success font-medium"}>{item.type.toUpperCase()}</TableCell>
                <TableCell>{item.level.toUpperCase()}</TableCell>
                <TableCell>Rp. {item.price}</TableCell>
                <TableCell>
                  <div className="justify-between space-x-2">
                    <Button className=" w-14 h-6 text-xs bg-success">Ubah</Button>
                    <Button className=" w-14 h-6 text-xs bg-destructive">Hapus</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </body>
  );
};

export default KelolaKelas;
