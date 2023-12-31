// Card_Course.js
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMedal,
  faClock,
  faBook,
  faStar,
  faGem,
  faCirclePlay,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

// eslint-disable-next-line react-refresh/only-export-components
const LoadingSkeletonCard = () => (
  <div className='top-0 block'>
    <Card className='md:w-[420px] w-[300px] h-[280px] md:h-full pb-5'>
      <div className='space-y-4 cursor-pointer hover:opacity-50 hover:transition-transform'>
        <Skeleton className='object-cover w-full h-32 rounded-t-sm rounded-b-none md:h-48' />
        <div className='p-3 space-y-3'>
          <div className='flex justify-between'>
            <Skeleton className='w-32 h-2 md:w-52' />
            <Skeleton className='w-10 h-2' />
          </div>
          <Skeleton className='w-20 h-2 md:w-32' />
          <div className='flex flex-wrap justify-between gap-5'>
            <Skeleton className='w-16 h-2 md:w-20' />
            <Skeleton className='w-16 h-2 md:w-20' />
            <Skeleton className='w-16 h-2 md:w-20' />
          </div>
        </div>
      </div>
    </Card>
  </div>
)

const Card_Course = ({ selectedFilters, activeTab }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const categoryParam = searchParams.get('category')
  const [courseList, setCourseList] = useState([])
  const {
    level: selectedLevels,
    category: selectedCategories,
    sort: selectedSort,
  } = selectedFilters

  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchCourses = async () => {
      try {
        let url = 'https://idea-academy.up.railway.app/api/v1/courses'
        const res = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        })
        setCourseList(res.data.data)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }

    fetchCourses()
  }, [categoryParam])

  const filterCourses = () => {
    let filteredCourses = courseList.filter((course) => {
      return (
        (selectedLevels.length === 0 ||
          selectedLevels.includes(course.level)) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(course.category))
      )
    })

    if (selectedSort === 'Terbaru') {
      filteredCourses = filteredCourses.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    } else if (selectedSort === 'Terpopuler') {
      filteredCourses = filteredCourses.sort((a, b) => b.rating - a.rating)
    } else if (selectedSort === 'Promo') {
      filteredCourses = filteredCourses.filter(
        (course) => course.price === 1000
      )
    } else {
      filteredCourses = filteredCourses.sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    }

    if (activeTab === 'premium') {
      filteredCourses = filteredCourses.filter(
        (course) => course.type === 'premium'
      )
    }
    if (activeTab === 'free') {
      filteredCourses = filteredCourses.filter(
        (course) => course.type === 'free'
      )
    }
    return filteredCourses
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  if (loading) {
    return (
      <div>
        {isMobile ? (
          <div className='flex flex-wrap gap-10'>
            {[...Array(2)].map((_, index) => (
              <LoadingSkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className='flex flex-wrap gap-6'>
            {[...Array(4)].map((_, index) => (
              <LoadingSkeletonCard key={index} />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (filterCourses().length === 0) {
    return (
      <div className='flex mx-auto text-xl font-semibold text-center '>
        No courses available
      </div>
    )
  }

  return (
    <div className=' font-poppins'>
      <div className='flex flex-wrap justify-center w-full gap-10 font-poppins md:mb-20 md:justify-start'>
        {filterCourses().map((course) => (
          <div className='space-y-3' key={course.id}>
            <Card className='md:w-[420px] w-[300px] h-full md:h-full '>
              <Link to={`/Course/${course.id}`}>
                <div className='cursor-pointer hover:opacity-50 hover:transition-transform'>
                  <img
                    className='object-cover w-full h-32 rounded-t-sm md:h-48'
                    src={course.image}
                    alt={course.title}
                  />
                </div>
              </Link>
              <div className='p-4 space-y-1'>
                <div className='flex items-center justify-between'>
                  <div className='text-xs font-semibold text-active '>
                    {course.category}
                  </div>
                  <div className='flex space-x-2'>
                    <FontAwesomeIcon
                      icon={faStar}
                      className='text-sm text-active ms:text-lg'
                    />
                    <div className='text-xs md:text-sm'>{course.rating}</div>
                  </div>
                </div>
                <Link to={`/Course/${course.id}`}>
                  <div className='text-sm font-semibold text-primary'>
                    {course.title}
                  </div>
                </Link>
                <div className='text-xs'>by {course.creator}</div>
                <div className='flex flex-wrap items-center justify-between gap-3 pt-2 pb-3'>
                  <div className='flex items-center space-x-2'>
                    <FontAwesomeIcon icon={faMedal} className='text-success' />
                    <div className='text-xs'>
                      {course.level === 'beginner'
                        ? 'Beginner'
                        : course.level === 'intermediate'
                        ? 'Intermediate'
                        : 'Advance'}
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <FontAwesomeIcon icon={faBook} className='text-success' />
                    <div className='text-xs'>{course.totalModule} Modules</div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <FontAwesomeIcon icon={faClock} className='text-success' />
                    <div className='text-xs'>{course.totalDuration} Menit</div>
                  </div>
                </div>
                <div>
                  <Link to={`/Course/${course.id}`}>
                    {course.statusPayment !== true ? (
                      <Button
                        className={`${
                          course.type === 'free' ? 'bg-primary' : 'bg-active'
                        } flex gap-3 text-xs text-white h-7 `}
                      >
                        <FontAwesomeIcon icon={faGem} />{' '}
                        {course.type === 'free' ? 'Free' : 'Premium'}{' '}
                        {course.statusPayment}
                      </Button>
                    ) : (
                      <Button className='flex gap-3 text-xs h-7 bg-success '>
                        <FontAwesomeIcon icon={faCirclePlay} /> Mulai Kelas{' '}
                      </Button>
                    )}
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

Card_Course.propTypes = {
  selectedFilters: PropTypes.shape({
    level: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.arrayOf(PropTypes.string),
    sort: PropTypes.string,
  }),
  activeTab: PropTypes.string,
}

export default Card_Course
