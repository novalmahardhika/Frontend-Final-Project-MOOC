import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "@/components/search_table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"; // Sesuaikan dengan komponen paginasi yang Anda gunakan
import AddCourse from "./add_course";
import { Link } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import Loading from "@/components/loading";
import { toast, ToastContainer } from "react-toastify";

const KelolaKelas = () => {
  const [courseList, setCourseList] = useState([]);
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPremiumCourse = async () => {
      try {
        const res = await axios.get(`https://idea-academy.up.railway.app/api/v1/courses`, { headers: { Authorization: `Bearer ${token}` } });
        setCourseList(res.data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchPremiumCourse();
  }, [token]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredPayments = courseList.filter((item) => {
    const category = item.category || ""; // Check if item.Course is null or undefined
    const title = item.title || "";
    const type = item.type || "";
    const level = item.level || "";

    return (
      category.toLowerCase().includes(searchTerm.toLowerCase()) || title.toLowerCase().includes(searchTerm.toLowerCase()) || type.toLowerCase().includes(searchTerm.toLowerCase()) || level.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const deleteHandler = async (e) => {
    try {
      axios.delete(`https://idea-academy.up.railway.app/api/v1/courses/${e.currentTarget.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Data berhasil dihapus!", { autoClose: 2000 });
    } catch (error) {
      console.log(error);
      toast.error("Gagal menghapus data. Silakan coba lagi.");
    }
  };

  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);

  const totalItemsAfterSearch = filteredPayments.length;
  const totalPaginationPages = Math.ceil(totalItemsAfterSearch / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-10 font-poppins">
      <ToastContainer />
      <div className="flex items-center justify-between mt-2 mb-4">
        <div className="text-2xl font-semibold">Data Kelas</div>

        <div className="flex items-center space-x-5">
          <Search onSearchChange={(term) => setSearchTerm(term)} />
          <AddCourse />
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
              <TableHeader className="h-12 bg-secondary">
                <TableRow>
                  <TableHead className="font-bold text-primary">Kategori</TableHead>
                  <TableHead className="font-bold text-primary">Nama Kelas</TableHead>
                  <TableHead className="font-bold text-primary">Tipe Kelas</TableHead>
                  <TableHead className="font-bold text-primary">Level</TableHead>
                  <TableHead className="font-bold text-primary">Harga Kelas</TableHead>
                  <TableHead className="font-bold text-primary">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={courseList.id}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell className={item.type === "premium" ? "text-active font-semibold" : "text-success font-medium"}>{item.type === null ? item.type : item.type.charAt(0).toUpperCase() + item.type.slice(1)}</TableCell>
                    <TableCell>{item.level === null ? item.level : item.level.charAt(0).toUpperCase() + item.level.slice(1)}</TableCell>
                    <TableCell>
                      {item.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link to={`/Admin/course/${item.id}`}>
                          <Button className="h-6 text-xs w-14 bg-success">Detail</Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button className="h-6 text-xs w-14 bg-destructive">Hapus</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Apakah anda yakin akan menghapus?</AlertDialogTitle>
                              <AlertDialogDescription>Tindakan ini tidak bisa dibatalkan. Tindakan ini akan menghapus akun Anda secara permanen dan menghapus data Anda dari server kami.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                id={item.id}
                                onClick={deleteHandler}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
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

export default KelolaKelas;
