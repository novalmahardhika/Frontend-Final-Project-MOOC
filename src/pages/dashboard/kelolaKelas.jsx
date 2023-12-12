// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Filter from "@/components/filter_button";
import { Button } from "@/components/ui/button";

const KelolaKelas = () => {
  const dummyKelas = [
    {
      kodeKelas: "UIUX0123",
      kategori: "UI/UX Design",
      namaKelas: "Belajar Web Designer dengan Figma",
      tipeKelas: "PREMIUM",
      level: "Advance",
      hargaKelas: 199000,
    },
    {
      kodeKelas: "DS101",
      kategori: "Data Science",
      namaKelas: "Pengenalan ke Machine Learning",
      tipeKelas: "FREE",
      level: "Beginner",
      hargaKelas: 0,
    },
    {
      kodeKelas: "REACT202",
      kategori: "Programming",
      namaKelas: "Belajar React.js",
      tipeKelas: "PREMIUM",
      level: "Intermediate",
      hargaKelas: 149000,
    },
    {
      kodeKelas: "DM001",
      kategori: "Digital Marketing",
      namaKelas: "Strategi Pemasaran di Era Digital",
      tipeKelas: "FREE",
      level: "Beginner",
      hargaKelas: 0,
    },
    {
      kodeKelas: "UIUX045",
      kategori: "UI/UX Design",
      namaKelas: "Desain Interaksi untuk Aplikasi Mobile",
      tipeKelas: "PREMIUM",
      level: "Intermediate",
      hargaKelas: 179000,
    },
    {
      kodeKelas: "BD101",
      kategori: "Data Science",
      namaKelas: "Pengenalan ke Big Data",
      tipeKelas: "FREE",
      level: "Beginner",
      hargaKelas: 0,
    },
    {
      kodeKelas: "NODEJS303",
      kategori: "Programming",
      namaKelas: "Belajar Node.js",
      tipeKelas: "PREMIUM",
      level: "Advance",
      hargaKelas: 219000,
    },
    {
      kodeKelas: "DM102",
      kategori: "Digital Marketing",
      namaKelas: "Strategi Konten Digital",
      tipeKelas: "FREE",
      level: "Intermediate",
      hargaKelas: 0,
    },
    {
      kodeKelas: "UIUX078",
      kategori: "UI/UX Design",
      namaKelas: "Prototyping dengan Adobe XD",
      tipeKelas: "PREMIUM",
      level: "Intermediate",
      hargaKelas: 189000,
    },
    {
      kodeKelas: "PYTHON404",
      kategori: "Programming",
      namaKelas: "Belajar Python",
      tipeKelas: "PREMIUM",
      level: "Advance",
      hargaKelas: 209000,
    },
  ];

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
            {dummyKelas.map((item) => (
              <TableRow key={dummyKelas.id}>
                <TableCell className="font-medium">{item.kodeKelas}</TableCell>
                <TableCell>{item.kategori}</TableCell>
                <TableCell>{item.namaKelas}</TableCell>
                <TableCell className={item.tipeKelas === "PREMIUM" ? "text-active font-semibold" : "text-success font-medium"}>{item.tipeKelas}</TableCell>
                <TableCell>{item.level}</TableCell>
                <TableCell>Rp. {item.hargaKelas}</TableCell>
                <TableCell>
                  <div className="justify-between space-x-2">
                    <Button className=" w-14 h-6 text-xs bg-success">ubah</Button>
                    <Button className=" w-14 h-6 text-xs bg-destructive">hapus</Button>
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
