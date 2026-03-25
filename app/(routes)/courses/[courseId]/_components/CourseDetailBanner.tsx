'use client'
import Image from 'next/image'
import { Course } from '../../_components/CourseList'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

type Props={
  loading:boolean,
  courseDetail:Course | undefined
  refreshData:()=>void
}

function CourseDetailBanner({loading,courseDetail,refreshData}:Props) {

  const [loading_,setLoading_] = useState(false)
  const { isSignedIn } = useUser()
  const router = useRouter()

  const EnrollCourse = async()=>{
    // Check if user is logged in
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }
    
    setLoading_(true)
    try {
      const result = await axios.post('/api/enroll-course',{
        courseId:courseDetail?.courseId  
      })
      toast.success("Course Enrolled!")
      refreshData()
    } catch (error) {
      toast.error("Failed to enroll. Please try again.")
      console.error(error)
    } finally {
      setLoading_(false)
    }
  }

  const handleContinueLearning = () => {
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }
    // Add navigation to continue learning
    if (courseDetail?.chapters && courseDetail.chapters.length > 0) {
      router.push(`/courses/${courseDetail.courseId}/${courseDetail.chapters[0].chapterId}/start`)
    }
  }

  // Show skeleton while loading
  if (loading || !courseDetail) {
    return <Skeleton className='w-full h-75 rounded-2xl'/>
  }

  // Get banner image with fallback
  const bannerImage = courseDetail?.bannerImage?.trim() || '/placeholder-course.jpg'

  return (
    <div>
      <div className='relative'>
        <Image 
          src={bannerImage} 
          alt={courseDetail?.title || 'Course banner'} 
          width={1400} 
          height={300} 
          className='w-full h-87.5 object-cover'
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-course.jpg';
          }}
        />
        <div className='font-game absolute top-0 pt-20 p-10 md:px-24 lg:px-36 h-full bg-linear-to-r from-black/80 to-white-50/50'>
          <h2 className='text-6xl'>{courseDetail?.title}</h2>
          <p className='text-3xl mt-3 text-gray-300'>{courseDetail?.desc}</p>
          
          {/* Show different buttons based on authentication and enrollment status */}
          {!isSignedIn ? (
            <Button 
              className='text-2xl mt-7' 
              variant={'pixel'} 
              size={'lg'}
              onClick={() => router.push('/sign-in')}
            >
              Login to Enroll
            </Button>
          ) : !courseDetail?.userEnrolled ? (
            <Button 
              className='text-2xl mt-7' 
              variant={'pixel'} 
              size={'lg'} 
              disabled={loading_} 
              onClick={EnrollCourse}
            >
              {loading_ && <Loader2Icon className='animate-spin mr-2'/>}
              Enroll Now
            </Button>
          ) : (
            <Button 
              className='text-2xl' 
              variant={'pixel'} 
              size={'lg'}
              onClick={handleContinueLearning}
            >
              Continue Learning...
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseDetailBanner