import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState, useEffect, useContext } from 'react'
import Filter from '@/components/filter_button'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext)
  const [payments, setPayments] = useState([])
  const [filterType, setFilterType] = useState('DESC')
  const [search, setSearch] = useState('')

  async function getData() {
    try {
      const data = await axios.get(
        'https://idea-academy.up.railway.app/api/v1/orders/list',
        {
          headers: {
            Authorization: token,
          },
        }
      )
      setPayments(data.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!token) return
    getData()
  }, [token])

  let sortedPayments = payments

  if (search != null && search != '') {
    sortedPayments = sortedPayments.filter((e) => {
      for (const [key, value] of Object.entries(e)) {
        if (typeof value != 'string') continue
        if (value.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
          return true
      }

      for (const [key, value] of Object.entries(e.Course)) {
        if (typeof value != 'string') continue
        if (value.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
          return true
      }

      return false
    })
  }

  // Sorting the dummyPayments based on the filter type
  sortedPayments = sortedPayments.sort((a, b) => {
    if (filterType === 'ASC') {
      return a.userId.localeCompare(b.userId)
    } else {
      return b.userId.localeCompare(a.userId)
    }
  })

  return (
    <div className='px-10 font-poppins'>
      <div className='flex items-center justify-between flex-1 mb-4'>
        <div className='text-2xl font-semibold'> Status Pembayaran</div>
        <Filter onFilterChange={setFilterType} onSearchChange={setSearch} />
      </div>
      <div>
        <Table>
          <TableCaption>Tabel Status Pembayaran.</TableCaption>
          <TableHeader className='h-12 bg-secondary'>
            <TableRow>
              <TableHead className='font-bold text-primary'>ID</TableHead>
              <TableHead className='font-bold text-primary'>Kategori</TableHead>
              <TableHead className='font-bold text-primary'>
                Kelas Premium
              </TableHead>
              <TableHead className='font-bold text-primary'>Status</TableHead>
              <TableHead className='font-bold text-primary'>
                Metode Pembayaran
              </TableHead>
              <TableHead className='font-bold text-primary'>
                Tanggal Bayar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPayments.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>{item.userId}</TableCell>
                <TableCell>{item.Course.category}</TableCell>
                <TableCell>{item.Course.title}</TableCell>
                <TableCell
                  className={
                    item.status === 'PENDING'
                      ? 'text-destructive font-medium'
                      : 'text-success font-medium'
                  }
                >
                  {item.status}
                </TableCell>
                <TableCell>{item.paymentMethod}</TableCell>
                <TableCell>
                  {item.status === 'COMPLETED' ? item.updatedAt : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Dashboard
