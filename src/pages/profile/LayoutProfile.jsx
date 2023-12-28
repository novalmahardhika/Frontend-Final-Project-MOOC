import { Link, Outlet } from 'react-router-dom'
import ItemsProfile from './ItemsProfile'
import PropTypes from 'prop-types'

const LayoutProfile = ({ children }) => {
  return (
    <div className='flex flex-col px-3 mb-10 max-w-[950px] mx-auto '>
      <Link className='py-4 font-medium text-primary' to='/'>
        Kembali ke Beranda
      </Link>
      <div className='flex flex-col rounded-md'>
        <h3 className='py-2 text-lg text-center text-white rounded-t-md bg-primary'>
          Account
        </h3>
        <div className='grid px-5 py-3 border-b md:grid-cols-2 border-x rounded-b-md border-primary'>
          {/* items profile */}
          <ItemsProfile />
          {/* content profile */}
          <div className='mt-10 md:px-14 md:mt-0'>{children}</div>
        </div>
      </div>

      <Outlet />
    </div>
  )
}

LayoutProfile.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutProfile
