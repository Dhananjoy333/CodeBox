'use client'
import axios from 'axios'
import { ChartNoAxesColumnIncreasingIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export type Course={
    id:number,
    courseId:number,
    title:string,
    desc:string,
    level:string,
    bannerImage:string,
    tag:string,
    chapters?:Chapter[],
    userEnrolled?:boolean,
    courseEnrolledInfo?:CourseEnrolledInfo,
    completedExercises?:CompletedExercises[]
}

export type CourseEnrolledInfo = {
    xpEarned:number,
    enrolledDate:any,
}

export type Chapter={
    chapterId: number,
    courseId: number,
    desc: string,
    name: string,
    id: number,
    exercises: exercise[]
}

export type exercise={
    name: string,
    slug: string,
    xp: number,
    difficulty: string
}

export type CompletedExercises = {
    chapterId: number,
    courseId: number,
    exerciseId: number
}

type Props={
    smallerCard?:boolean,
    maxLimit?:number
}

function CourseList({smallerCard = false, maxLimit = 100}: Props) {

    const [courseList, setCourseList] = useState<Course[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        GetAllCourses()
    },[])

    const GetAllCourses = async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await axios.get('/api/course')
            
            // Check if result.data is an array, if not, set empty array
            if (Array.isArray(result?.data)) {
                setCourseList(result.data)
            } else {
                console.error('API did not return an array:', result?.data)
                setCourseList([])
            }
        } catch (err) {
            console.error('Error fetching courses:', err)
            setError('Failed to load courses. Please try again later.')
            setCourseList([])
        } finally {
            setLoading(false)
        }
    }

    // Show loading state
    if (loading) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-3'>
                {[1, 2, 3].map((_, index) => (
                    <div key={index} className='border-4 rounded-xl bg-zinc-900 animate-pulse'>
                        <div className='w-full h-50 bg-zinc-800 rounded-t-lg'></div>
                        <div className='p-4'>
                            <div className='h-8 bg-zinc-800 rounded mb-2'></div>
                            <div className='h-16 bg-zinc-800 rounded mb-3'></div>
                            <div className='h-8 w-24 bg-zinc-800 rounded'></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // Show error state
    if (error) {
        return (
            <div className='text-center p-8'>
                <p className='text-red-500 font-game text-xl'>{error}</p>
                <button 
                    onClick={GetAllCourses} 
                    className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
                >
                    Try Again
                </button>
            </div>
        )
    }

    // Show empty state
    if (!courseList || courseList.length === 0) {
        return (
            <div className='text-center p-8'>
                <p className='text-gray-400 font-game text-xl'>No courses available yet. Check back soon!</p>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-3'>
            {courseList.map((course, index) => 
                maxLimit && maxLimit > index && (
                    <Link href={'/courses/' + course?.courseId} key={index}>
                        <div className='border-4 rounded-xl hover:bg-zinc-900 cursor-pointer transition-all duration-300'>
                            <Image 
                                src={course?.bannerImage?.trimEnd() || '/placeholder-course.jpg'} 
                                alt={course.title} 
                                width={400} 
                                height={400} 
                                className={`w-full ${smallerCard ? 'h-30' : 'h-50'} object-cover rounded-t-lg`}
                                onError={(e) => {
                                    // Handle image loading error
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/placeholder-course.jpg';
                                }}
                            />
                            <div className='p-4'>
                                <h2 className='font-game text-2xl'>{course?.title}</h2>
                                <p className='font-game text-xl text-gray-400 line-clamp-2'>{course?.desc}</p>
                                <h2 className='bg-zinc-800 gap-2 font-game p-1 mt-3 px-4 rounded-2xl items-center inline-flex'>
                                    <ChartNoAxesColumnIncreasingIcon className='h-4 w-4'/>
                                    {course.level}
                                </h2>
                            </div>
                        </div>
                    </Link>
                )
            )}
        </div>
    )
}

export default CourseList