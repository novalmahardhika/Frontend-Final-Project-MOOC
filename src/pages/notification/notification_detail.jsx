import Notification from './list'
import Detail from './detail'

const NotificationDetail = () => {
  return (
    <div className='relative z-1 font-poppins'>
      <div className='bg-secondary'>
        <div className='container pt-12 pb-20'>
          <div className='text-3xl font-semibold text-primary'>
            Notification{' '}
          </div>
        </div>
      </div>
      <div className='container flex justify-between gap-10'>
        <div className='w-[500px]'>
          <Notification />
        </div>
        <div className=' w-[900px]'>
          <Detail />
        </div>
      </div>
    </div>
  )
}
export default NotificationDetail
