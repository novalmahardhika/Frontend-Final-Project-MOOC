import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import Filter from "@/components/filter_button";

const Dashboard = () => {
  const [filterType, setFilterType] = useState("DESC");
  const dummyPayments = [
    {
      id: "johndoe1",
      kategori: "UI/UX Design",
      kelasPremium: "Belajar Web Designer dengan Figma",
      status: "SUDAH BAYAR",
      metodePembayaran: "Credit Card",
      tanggalBayar: "21 Sep, 2023 at 2.00 AM",
    },
    {
      id: "johndoe2",
      kategori: "Data Science",
      kelasPremium: "Pengenalan ke Machine Learning",
      status: "BELUM BAYAR",
      metodePembayaran: "Bank Transfer",
      tanggalBayar: null,
    },
    {
      id: "johndoe3",
      kategori: "Programming",
      kelasPremium: "Belajar React.js",
      status: "SUDAH BAYAR",
      metodePembayaran: "PayPal",
      tanggalBayar: "22 Sep, 2023 at 3.30 PM",
    },
    {
      id: "johndoe4",
      kategori: "Digital Marketing",
      kelasPremium: "Strategi Pemasaran di Era Digital",
      status: "BELUM BAYAR",
      metodePembayaran: "Credit Card",
      tanggalBayar: null,
    },
    {
      id: "johndoe5",
      kategori: "UI/UX Design",
      kelasPremium: "Desain Interaksi untuk Aplikasi Mobile",
      status: "SUDAH BAYAR",
      metodePembayaran: "Bank Transfer",
      tanggalBayar: "23 Sep, 2023 at 10.45 AM",
    },
    {
      id: "johndoe6",
      kategori: "Data Science",
      kelasPremium: "Pengenalan ke Big Data",
      status: "BELUM BAYAR",
      metodePembayaran: "Credit Card",
      tanggalBayar: null,
    },
    {
      id: "johndoe7",
      kategori: "Programming",
      kelasPremium: "Belajar Node.js",
      status: "SUDAH BAYAR",
      metodePembayaran: "PayPal",
      tanggalBayar: "24 Sep, 2023 at 1.15 PM",
    },
    {
      id: "johndoe8",
      kategori: "Digital Marketing",
      kelasPremium: "Strategi Konten Digital",
      status: "BELUM BAYAR",
      metodePembayaran: "Bank Transfer",
      tanggalBayar: null,
    },
    {
      id: "johndoe1",
      kategori: "UI/UX Design",
      kelasPremium: "Belajar Web Designer dengan Figma",
      status: "SUDAH BAYAR",
      metodePembayaran: "Credit Card",
      tanggalBayar: "21 Sep, 2023 at 2.00 AM",
    },
    {
      id: "johndoe2",
      kategori: "Data Science",
      kelasPremium: "Pengenalan ke Machine Learning",
      status: "BELUM BAYAR",
      metodePembayaran: "Bank Transfer",
      tanggalBayar: null,
    },
    {
      id: "johndoe3",
      kategori: "Programming",
      kelasPremium: "Belajar React.js",
      status: "SUDAH BAYAR",
      metodePembayaran: "PayPal",
      tanggalBayar: "22 Sep, 2023 at 3.30 PM",
    },
    {
      id: "johndoe4",
      kategori: "Digital Marketing",
      kelasPremium: "Strategi Pemasaran di Era Digital",
      status: "BELUM BAYAR",
      metodePembayaran: "Credit Card",
      tanggalBayar: null,
    },
    {
      id: "johndoe5",
      kategori: "UI/UX Design",
      kelasPremium: "Desain Interaksi untuk Aplikasi Mobile",
      status: "SUDAH BAYAR",
      metodePembayaran: "Bank Transfer",
      tanggalBayar: "23 Sep, 2023 at 10.45 AM",
    },
    {
      id: "johndoe6",
      kategori: "Data Science",
      kelasPremium: "Pengenalan ke Big Data",
      status: "BELUM BAYAR",
      metodePembayaran: "Credit Card",
      tanggalBayar: null,
    },
    {
      id: "johndoe7",
      kategori: "Programming",
      kelasPremium: "Belajar Node.js",
      status: "SUDAH BAYAR",
      metodePembayaran: "PayPal",
      tanggalBayar: "24 Sep, 2023 at 1.15 PM",
    },
    {
      id: "johndoe8",
      kategori: "Digital Marketing",
      kelasPremium: "Strategi Konten Digital",
      status: "BELUM BAYAR",
      metodePembayaran: "Bank Transfer",
      tanggalBayar: null,
    },
  ];

  const handleFilterChange = (newFilterType) => {
    setFilterType(newFilterType);
  };

  // Sorting the dummyPayments based on the filter type
  const sortedPayments = dummyPayments.sort((a, b) => {
    if (filterType === "ASC") {
      return a.id.localeCompare(b.id);
    } else {
      return b.id.localeCompare(a.id);
    }
  });

  return (
    <body className="px-10 font-poppins">
      <div className="flex flex-1 items-center justify-between mb-4">
        <div className="text-2xl font-semibold"> Status Pembayaran</div>
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <div>
        <Table>
          <TableCaption>Tabel Status Pembayaran.</TableCaption>
          <TableHeader className="bg-secondary h-12">
            <TableRow>
              <TableHead className="text-primary font-bold">ID</TableHead>
              <TableHead className="text-primary font-bold">Kategori</TableHead>
              <TableHead className="text-primary font-bold">Kelas Premium</TableHead>
              <TableHead className="text-primary font-bold">Status</TableHead>
              <TableHead className="text-primary font-bold">Metode Pembayaran</TableHead>
              <TableHead className="text-primary font-bold">Tanggal Bayar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPayments.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.kategori}</TableCell>
                <TableCell>{item.kelasPremium}</TableCell>
                <TableCell className={item.status === "BELUM BAYAR" ? "text-destructive font-medium" : "text-success font-medium"}>{item.status}</TableCell>
                <TableCell>{item.metodePembayaran}</TableCell>
                <TableCell>{item.tanggalBayar}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </body>
  );
};

export default Dashboard;
