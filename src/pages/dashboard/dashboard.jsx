import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import Filter from "@/components/filter_button";
import axios from "axios";

const Dashboard = () => {
  const [payments, setPayments] = useState([]);
  const [filterType, setFilterType] = useState("DESC");
  const [search, setSearch] = useState("");

  async function getData() {
    try {
      const data = await axios.get("https://idea-academy.up.railway.app/api/v1/orders/list", {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwNDA5ZmI0LTNlMWUtNDFhNC04NzI2LTQxYTBjMmE2ZTk5ZSIsImlhdCI6MTcwMzMwNzU4M30.CMDb7Xw1730zLb-0PVuHR4L0YimuH-iABs3BbPfeYVw"
        }
      });
      setPayments(data.data.data);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getData();
  }, [])
  
  let sortedPayments = payments;

  if (search != null && search != "") {
    sortedPayments = sortedPayments.filter(e => {
      for (const [key, value] of Object.entries(e)) {
        if (typeof(value) != "string") continue;
        if (value.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
          return true;
      }

      for (const [key, value] of Object.entries(e.Course)) {
        if (typeof(value) != "string") continue;
        if (value.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
          return true;
      }

      return false;
    });
  }

  // Sorting the dummyPayments based on the filter type
  sortedPayments = sortedPayments.sort((a, b) => {
    if (filterType === "ASC") {
      return a.userId.localeCompare(b.userId);
    } else {
      return b.userId.localeCompare(a.userId);
    }
  });

  

  return (
    <div className="px-10 font-poppins">
      <div className="flex flex-1 items-center justify-between mb-4">
        <div className="text-2xl font-semibold"> Status Pembayaran</div>
        <Filter onFilterChange={setFilterType} onSearchChange={setSearch} />
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
                <TableCell className="font-medium">{item.userId}</TableCell>
                <TableCell>{item.Course.category}</TableCell>
                <TableCell>{item.Course.title}</TableCell>
                <TableCell className={item.status === "PENDING" ? "text-destructive font-medium" : "text-success font-medium"}>{item.status}</TableCell>
                <TableCell>{item.paymentMethod}</TableCell>
                <TableCell>{(item.status === "COMPLETED") ? item.updatedAt : ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
