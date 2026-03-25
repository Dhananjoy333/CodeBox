'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CompletedExercises, exercise } from '../../../_components/CourseList';
import ContentSection from './_components/ContentSection';
import CodeEditor from './_components/CodeEditor';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Allotment } from "allotment";
import "allotment/dist/style.css";

export type CourseExercise={
  chapterId:number,
  courseId:number,
  desc:string,
  name:string,
  editorType:string,
  exercises:exercise[],
  exerciseData:ExerciseData,
  completedExercise:CompletedExercises[]
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
  const [exerciseInfo,setExerciseinfo] = useState<exercise>()
  const [nextButtonRoute,setNextButtonRoute] = useState<string>()
  const [prevButtonRoute,setPrevButtonRoute] = useState<string>()

  useEffect(()=>{
    GetExerciseCourseDetails()
  },[])

  useEffect(()=>{
    courseExerciseData && GetExerciseDetail()
    courseExerciseData && GetPrevNextButtonRoute()
  },[courseExerciseData])

  useEffect(()=>{
    document.body.style.overflow = "hidden";
    return ()=>{
      document.body.style.overflow = ' ';
    }
  },[])

  const GetExerciseCourseDetails = async()=>{
    setloading(true)
    const result = await axios.post('/api/exercise',{
      courseId:courseId,
      chapterId:chapterId,
      exerciseId:exerciseslug
    })   
    setCourseExerciseData(result.data)
    setloading(false)
  }

  const GetExerciseDetail=()=>{
    const exerciseInfo = courseExerciseData?.exercises?.find((item)=>item.slug == exerciseslug);
    setExerciseinfo(exerciseInfo)
  }

  const GetPrevNextButtonRoute = ()=>{
    //current index of exercise
    const currentExerciseIndex = courseExerciseData?.exercises?.findIndex(item=>item.slug == exerciseslug) ?? 0
    const NextExercise = courseExerciseData?.exercises[currentExerciseIndex + 1]?.slug
    const PrevExercise = courseExerciseData?.exercises[currentExerciseIndex - 1]?.slug

    setNextButtonRoute(NextExercise ? '/courses/'+courseId+'/'+chapterId+'/'+NextExercise : undefined)
    setPrevButtonRoute(PrevExercise ? '/courses/'+courseId+'/'+chapterId+'/'+PrevExercise : undefined)
  }
  
  return (
    <div className="h-screen flex flex-col overflow-hidden"> 
    
  
    <div className="flex-1 relative border-t-4"> 
      <Allotment>
        <Allotment.Pane minSize={300}>
          <div className="h-full overflow-y-auto">
            <ContentSection courseExerciseData={courseExerciseData} loading={loading}/>
          </div>
        </Allotment.Pane>

        <Allotment.Pane minSize={400}>
          <CodeEditor courseExerciseData={courseExerciseData} loading={loading}/>
        </Allotment.Pane>
      </Allotment>
    </div>
    
    <div className="h-20 shrink-0 font-game w-full bg-zinc-900 flex p-4 justify-around items-center border-t border-zinc-700 mb-20">
      <Link href={prevButtonRoute ?? '/courses/'+courseId}>
        <Button variant={'pixel'} className="text-xl">Previous</Button>
      </Link>
      <div className='flex gap-2 items-center'>
        <Image src='/star.png' alt='star' width={40} height={40}/>
        <h2 className='text-2xl'>You can earn <span className='text-4xl'>{exerciseInfo?.xp}</span> Xp</h2>
      </div>
      <Link href={nextButtonRoute ?? '/courses/'+courseId}>
        <Button variant={'pixel'} className="text-xl">Next</Button>
      </Link>
    </div>
  </div>
  )
}

export default Playground
