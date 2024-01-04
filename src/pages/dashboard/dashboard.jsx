import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "@/components/search_table";

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"; // Sesuaikan dengan komponen paginasi yang Anda gunakan
import Loading from "@/components/loading";

const Dashboard = () => {
  const [payments, setPayments] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/orders/list`, { headers: { Authorization: `Bearer ${token}` } });
        setPayments(res.data.data);
        const userIds = res.data.data.map((item) => item.userId);

        const userNamesMap = {};

        for (let i = 0; i < userIds.length; i++) {
          const userId = userIds[i];
          const resUser = await axios.get(`https://idea-academy.up.railway.app/api/v1/users?id=${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userDataArray = resUser.data.data;

          if (userDataArray.length > 0) {
            const matchingUser = userDataArray.find((user) => user.id === userId);
            if (matchingUser) {
              userNamesMap[userId] = matchingUser.name;
            }
          }
        }

        console.log("userNamesMap:", userNamesMap);
        setUserNames(userNamesMap);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [token]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredPayments = payments.filter((item) => {
    const courseTitle = item.Course?.title || "";
    const status = item.status || "";
    const paymentMethod = item.paymentMethod || "";

    return courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) || status.toLowerCase().includes(searchTerm.toLowerCase()) || paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);

  const totalItemsAfterSearch = filteredPayments.length;
  const totalPaginationPages = Math.ceil(totalItemsAfterSearch / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-10 font-poppins">
      <div className="mt-2 flex items-center justify-between mb-4">
        <div className="text-2xl font-semibold"> Status Pembayaran</div>
        <div className="flex space-x-5 items-center">
          <Search onSearchChange={(term) => setSearchTerm(term)} />
        </div>
      </div>
      <div className="mb-3">
        {isLoading ? (
          <Loading />
        ) : totalItemsAfterSearch === 0 ? (
          <div className="text-primary text-center">Tidak ditemukan data seperti yang Anda cari.</div>
        ) : (
          <>
            <Table>
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
              <TableBody className="">
                {currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{userNames[item.userId]}</TableCell>
                    <TableCell>{item.Course.category}</TableCell>
                    <TableCell>{item.Course.title}</TableCell>
                    <TableCell className={item.status === "PENDING" ? "text-destructive font-medium" : "text-success font-medium"}>{item.status}</TableCell>
                    <TableCell>{item.paymentMethod}</TableCell>
                    <TableCell>{new Date(item.updatedAt).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" })}</TableCell>{" "}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination>
              <PaginationContent className="cursor-pointer">
                <PaginationItem>
                  {isLoading || currentPage === 1 ? (
                    <PaginationPrevious
                      disabled
                      className="cursor-not-allowed"
                    />
                  ) : (
                    <PaginationPrevious
                      onClick={() => {
                        console.log(currentPage);
                        paginate(currentPage - 1);
                      }}
                      disabled={currentPage === 1}
                    />
                  )}
                </PaginationItem>
                {[...Array(totalPaginationPages).keys()].map((number) => (
                  <PaginationItem
                    key={number + 1}
                    className={currentPage === number + 1 ? "bg-primary text-white rounded-lg cursor-not-allowed" : ""}
                  >
                    <PaginationLink onClick={() => paginate(number + 1)}>{number + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  {isLoading || currentPage === totalPaginationPages || totalItemsAfterSearch === 0 ? (
                    <PaginationNext
                      disabled
                      className="cursor-not-allowed"
                    />
                  ) : (
                    <PaginationNext onClick={() => paginate(currentPage + 1)} />
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
