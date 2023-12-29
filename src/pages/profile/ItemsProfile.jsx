import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'

const items = [
  { name: 'My Profile', href: '/User/profile/' },
  { name: 'Change Password', href: '/user/reset-password' },
  { name: 'History Payment', href: '/user/history-payment' },
]

const ItemsProfile = () => {
  const navigate = useNavigate()
  const clickHandler = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className='flex flex-col space-y-3'>
      {items.map((item) => (
        <Link
          key={`${item.name}-item`}
          to={item.href}
          className='relative pb-4 text-sm font-medium duration-300 border-b hover:text-active group'
        >
          {item.name}

          {/* animation border-bottom */}
          <span className='absolute bottom-0 right-0 w-0 h-0.5 duration-500 group-hover:w-[50%]  bg-primary'></span>
          <span className='absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-[50%] duration-500  bg-primary'></span>
        </Link>
      ))}
      <Button onClick={clickHandler} className='hover:bg-active'>
        Logout
      </Button>
    </div>
  )
}

export default ItemsProfile
