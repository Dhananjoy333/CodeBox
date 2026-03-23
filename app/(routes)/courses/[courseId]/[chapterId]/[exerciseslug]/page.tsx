'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-splitter-layout/lib/index.css';
import { exercise } from '../../../_components/CourseList';
import ContentSection from './_components/ContentSection';
import dynamic from 'next/dynamic';

const SplitterLayout = dynamic(
  () => import('react-splitter-layout'),
  { ssr: false }
);

export type CourseExercise={
  chapterId:number,
  courseId:number,
  desc:string,
  name:string,
  exercises:exercise[],
  exerciseData:ExerciseData
}

type ExerciseData={
  chapterId:number,
  courseId:number,
  exerciseId:string,
  exerciseName:string,
  exercisesContent: ExercisesContent
}

type ExercisesContent={
  content:string,
  hint:string,
  hintXp:string,
  starterCode:any,
  task:string
}

function Playground() {

  const {courseId,chapterId,exerciseslug} = useParams()
  const [loading,setloading] = useState(false)

  const [courseExerciseData,setCourseExerciseData] = useState<CourseExercise>()

  useEffect(()=>{
    GetExerciseCourseDetails()
  },[])

  const GetExerciseCourseDetails = async()=>{
    setloading(true)
    const result = await axios.post('/api/exercise',{
      courseId:courseId,
      chapterId:chapterId,
      exerciseId:exerciseslug
    })   
    console.log("this is exercise data:",result.data)
    setCourseExerciseData(result.data)
    setloading(false)
  }
    
  return (
    <div className='border-t-4'>
        <SplitterLayout 
        percentage 
        primaryMinSize={40}
        secondaryInitialSize={60}>
            <div>
              <ContentSection courseExerciseData={courseExerciseData} loading={loading}/>
            </div>
            <div>Code Editor</div>
        </SplitterLayout>
    </div>
  )
}

export default Playground