import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const PaymentSuccess = () => {
  const { id } = useParams()

  return (
    <div>
      <div className='px-3 py-5 border-b'>
        <h3 className='max-w-4xl py-3 mx-auto text-center text-white rounded-lg bg-success'>
          Terimakasih atas pembayaran transaksi
        </h3>
      </div>

      <div className='flex flex-col items-center justify-center max-w-md px-3 mx-auto mt-10 space-y-5 text-center'>
        <h1 className='text-3xl font-semibold text-primary'>Selamat!</h1>
        <img src='/src/assets/success.png' className='max-w-[200px]' />
        <b>Transaksi Pembayaran Course Berhasil</b>
        <Button className='w-full hover:bg-active'>
          <Link to={`/course/${id}`}>Mulai Belajar</Link>
        </Button>
        <Link to='/beranda' className='font-medium text-active'>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess
