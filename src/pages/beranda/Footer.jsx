import { Link } from 'react-router-dom'
import imageFooter from '../../assets/logo.png'
const Footer = () => {
  return (
    <>
      <footer className='absolute w-full  b-0 bg-primary font-poppins'>
        <div className='container flex flex-wrap items-start justify-between pt-16 pb-10 space-y-5 md:flex-nowrap md:space-x-20 md:px-24'>
          <div className='items-start w-4/5'>
            <img src={imageFooter} alt='' className='w-40  md:w-48' />
            <p className='w-4/5 text-sm text-white '>
              Dengan Idea Academy Belajar menjadi lebih mudah
            </p>
          </div>
          <div className='w-2/5 space-y-1 text-sm text-white'>
            <div className='font-bold '>Kategori Belajar</div>
            <div className='flex flex-col space-y-1 text-xs'>
              <Link to=''>Data Science</Link>
              <Link to=''>UI/UX Design</Link>
              <Link to=''>Android Development</Link>
              <Link to=''>Web Development</Link>
              <Link to=''>IOS Development</Link>
              <Link to=''>Bussiness Intelligence</Link>
            </div>
          </div>
          <div className='w-2/5 space-y-1 text-sm text-white'>
            <div className='font-bold '>Kategori Belajar</div>
            <div className='flex flex-col space-y-1 text-xs'>
              <Link to=''>Data Science</Link>
              <Link to=''>UI/UX Design</Link>
              <Link to=''>Android Development</Link>
              <Link to=''>Web Development</Link>
              <Link to=''>IOS Development</Link>
              <Link to=''>Bussiness Intelligence</Link>
            </div>
          </div>
          <div className='w-2/5 space-y-1 text-sm text-white'>
            <p className='font-bold'>Kelas Populer</p>
            <div className='flex flex-col space-y-1 text-xs'>
              <Link to='#'>Belajar Web Designer Dengan Figma</Link>
              <Link to='#'>Membuat Wireframe Hingga ke Visual Design</Link>
              <Link to='#'>Pengenalan tentang Design System</Link>
            </div>
          </div>
        </div>
        <div className='py-3 text-xs text-center text-white'>
          &copy; Copyright Idea Academy 2023.
        </div>
      </footer>
    </>
  )
}

export default Footer
