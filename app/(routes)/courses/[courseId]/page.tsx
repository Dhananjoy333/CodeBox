'use client'
import { useParams } from 'next/navigation'
import CourseDetailBanner from './_components/CourseDetailBanner'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Course } from '../_components/CourseList'
import CourseChapter from './_components/CourseChapter'
import CourseStatus from './_components/CourseStatus'
import UpgradeToPro from '../../dashboard/_components/UpgradeToPro'
import CommunityHelpSection from './_components/CommunityHelpSection'

type courseDetail = {

}

function CourseDetail() {
    const {courseId} = useParams()
    const [couseDetail, setCourseDetail] = useState<Course>()
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
      courseId && GetCourseDetail()
    },[courseId])
    
    const GetCourseDetail = async() => {
      setLoading(true)
      const result = await axios.get('/api/course?courseid='+courseId)
      console.log(result.data)
      setCourseDetail(result?.data)
      setLoading(false)
    }

  return (
    <div>
        <CourseDetailBanner loading={loading} courseDetail={couseDetail} refreshData={()=>GetCourseDetail()}/>
        <div className='grid grid-cols-3 gap-7 p-10 md:px-24 lg:px-36'>
          <div className='col-span-2'>
            <CourseChapter loading={loading} courseDetail={couseDetail}/>
          </div>
          <div>
            <CourseStatus courseDetail={couseDetail}/>
            <UpgradeToPro/>
            <CommunityHelpSection/>
          </div>
        </div>
    </div>
  )
}

export default CourseDetail