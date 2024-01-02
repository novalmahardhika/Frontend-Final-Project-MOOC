import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Search from '@/components/search_table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination' // Sesuaikan dengan komponen paginasi yang Anda gunakan
import AddCourse from './add'

const KelolaKelas = () => {
  const [courseList, setCourseList] = useState([])
  const token = localStorage.getItem('token')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 10

  useEffect(() => {
    const fetchPremiumCourse = async () => {
      try {
        const res = await axios.get(
          `https://idea-academy.up.railway.app/api/v1/courses`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setCourseList(res.data.data)
        console.log(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPremiumCourse()
  }, [token])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const filteredPayments = courseList.filter((item) => {
    const category = item.category || '' // Check if item.Course is null or undefined
    const title = item.title || ''
    const type = item.type || ''
    const level = item.level || ''

    return (
      category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const deleteHandler = async (e) => {
    try {
      const res = await axios.delete(
        `https://idea-academy.up.railway.app/api/v1/courses/${e.currentTarget.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem)

  const totalItemsAfterSearch = filteredPayments.length
  const totalPaginationPages = Math.ceil(totalItemsAfterSearch / itemsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className='px-10 font-poppins'>
      <div className='flex items-center justify-between mt-2 mb-4'>
        <div className='text-2xl font-semibold'>Data Kelas</div>

        <div className='flex items-center space-x-5'>
          <Search onSearchChange={(term) => setSearchTerm(term)} />
          <AddCourse />
        </div>
      </div>
      <div className='mb-3'>
        {totalItemsAfterSearch === 0 ? (
          <div className='text-center text-primary'>
            Tidak ditemukan data seperti yang Anda cari.
          </div>
        ) : (
          <Table>
            <TableHeader className='h-12 bg-secondary'>
              <TableRow>
                <TableHead className='font-bold text-primary'>
                  Kategori
                </TableHead>
                <TableHead className='font-bold text-primary'>
                  Nama Kelas
                </TableHead>
                <TableHead className='font-bold text-primary'>
                  Tipe Kelas
                </TableHead>
                <TableHead className='font-bold text-primary'>Level</TableHead>
                <TableHead className='font-bold text-primary'>
                  Harga Kelas
                </TableHead>
                <TableHead className='font-bold text-primary'>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={courseList.id}>
                  <TableCell className='font-medium'>{item.category}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell
                    className={
                      item.type === 'premium'
                        ? 'text-active font-semibold'
                        : 'text-success font-medium'
                    }
                  >
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </TableCell>
                  <TableCell>
                    {item.level.charAt(0).toUpperCase() + item.level.slice(1)}
                  </TableCell>
                  <TableCell>
                    {item.price.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell>
                    <div className='justify-between space-x-2'>
                      <Link to={`/admin/course/${item.id}`}>
                        <Button className='h-6 text-xs w-14 bg-success'>
                          ubah
                        </Button>
                      </Link>
                      <Button
                        id={item.id}
                        className='h-6 text-xs w-14 bg-destructive'
                        onClick={deleteHandler}
                      >
                        hapus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <Pagination>
        <PaginationContent className='cursor-pointer'>
          <PaginationItem>
            {currentPage === 1 ? (
              <PaginationPrevious disabled className='cursor-not-allowed' />
            ) : (
              <PaginationPrevious
                onClick={() => {
                  console.log(currentPage)
                  paginate(currentPage - 1)
                }}
                disabled={currentPage === 1}
              />
            )}
          </PaginationItem>
          {[...Array(totalPaginationPages).keys()].map((number) => (
            <PaginationItem
              key={number + 1}
              className={
                currentPage === number + 1
                  ? 'bg-primary text-white rounded-lg cursor-not-allowed'
                  : ''
              }
            >
              <PaginationLink onClick={() => paginate(number + 1)}>
                {number + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {currentPage === totalPaginationPages ||
            totalItemsAfterSearch === 0 ? (
              <PaginationNext disabled className='cursor-not-allowed' />
            ) : (
              <PaginationNext onClick={() => paginate(currentPage + 1)} />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default KelolaKelas
