// import { Skeleton } from '@/components/ui/skeleton'


// import { Course } from '../../_components/CourseList'
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"
// import { Button } from '@/components/ui/button'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"
// import Link from 'next/link'
// import { useAuth } from '@clerk/nextjs'

// type Props={
//   loading:boolean,
//   courseDetail:Course | undefined
// }

// function CourseChapter({loading,courseDetail}:Props) {

//   const {has} =useAuth()
//   const hasUnlimitedAccess = has({ plan: 'unlimited' })

//   const isExerciseCompleted = (chapterId:number,exerciseId:number) => {
//     const completedChapters = courseDetail?.completedExercises;

//     const completeChapter = completedChapters?.find(item=>(item.chapterId==chapterId && item.exerciseId == exerciseId))
//     return completeChapter?true:false
//   }

//   return (
//     <div>
//       {courseDetail?.chapters?.length == 0 ?
//       <div>
//         <Skeleton className='w-full h-25 rounded-xl'/>
//         <Skeleton className='w-full h-25 mt-5 rounded-xl'/>
//       </div>
//       :
//       <div className='p-5 border-4 rounded-2xl'>
//         {courseDetail?.chapters?.map((chapter,index)=>(
//           <Accordion type="single" collapsible key={index}>
//             <AccordionItem value="item-1">
//               <AccordionTrigger className='p-3 hover:bg-zinc-800 cursor-pointer font-game text-4xl'>
//                 <div className='flex items-center justify-between w-full'>
//                   <div className='flex gap-10'>
//                     <h2 className='h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center'>{index + 1}</h2>
//                     <h2>{chapter?.name}</h2>
//                   </div> 
//                   {!hasUnlimitedAccess && index >=2 && <h2 className='font-game text-3xl text-yellow-400'>Pro</h2>}
//                 </div>               
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className='p-7 bg-zinc-900 rounded-2xl'>
//                   {chapter?.exercises.map((exc,indexExc)=>(
//                     <div key={indexExc} className='flex items-center justify-between mb-7'>        
//                       <div className='flex items-center gap-10 font-game'>
//                         <h2 className='text-3xl'>Exercise {index*chapter?.exercises.length+indexExc + 1}</h2>  
//                         <h2 className='text-3xl'>{exc?.name}</h2>
//                       </div> 

                       
//                       {isExerciseCompleted(chapter?.chapterId, Number(indexExc) + 1) ?
//                       <Link href={'/courses/'+ courseDetail?.courseId + '/' + chapter?.chapterId+ '/'+exc?.slug}>
//                         <Button variant={'pixel'} className='font-game bg-green-600' size={'lg'}>Completed</Button>
//                       </Link> 
//                        :
//                        (courseDetail?.userEnrolled && (!hasUnlimitedAccess && index < 2) )?
//                       <Link href={'/courses/'+ courseDetail?.courseId+ '/'+ chapter?.chapterId+ '/' + exc?.slug}>
//                         <Button variant={'pixel'} className='font-game' size={'lg'}>{exc?.xp} xp</Button> 
//                       </Link>
//                       : 
//                       hasUnlimitedAccess &&  courseDetail?.userEnrolled ?  
//                       <Link href={'/courses/'+ courseDetail?.courseId+ '/'+ chapter?.chapterId+ '/' + exc?.slug}>
//                         <Button variant={'pixel'} className='font-game' size={'lg'}>{exc?.xp} xp</Button> 
//                       </Link>
//                       :        
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button variant={'pixelDisabled'} className='font-game' size={'lg'}>???</Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p className='font-game text-lg'>Please Enroll First</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     }
//                     </div>
//                   ))}
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//           </Accordion>
//         ))}
//       </div>
//       }
//     </div>
//   )
// }

// export default CourseChapter
import { Skeleton } from '@/components/ui/skeleton'
import { Course } from '../../_components/CourseList'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link'
import { useAuth, useUser } from '@clerk/nextjs'

type Props={
  loading:boolean,
  courseDetail:Course | undefined
}

function CourseChapter({loading,courseDetail}:Props) {

  const { has } = useAuth()
  const { isSignedIn } = useUser()
  const hasUnlimitedAccess = has({ plan: 'unlimited' })

  const isExerciseCompleted = (chapterId:number, exerciseId:number) => {
    const completedChapters = courseDetail?.completedExercises;
    const completeChapter = completedChapters?.find(item => (item.chapterId == chapterId && item.exerciseId == exerciseId))
    return completeChapter ? true : false
  }

  // Check if user can access the exercise
  const canAccessExercise = (chapterIndex: number) => {
    // If user is not signed in, show login prompt
    if (!isSignedIn) {
      return { canAccess: false, reason: 'login' }
    }
    
    // If user is signed in but not enrolled
    if (!courseDetail?.userEnrolled) {
      return { canAccess: false, reason: 'enroll' }
    }
    
    // If user is signed in and enrolled
    if (courseDetail?.userEnrolled) {
      // Check unlimited access or free chapters
      if (!hasUnlimitedAccess && chapterIndex >= 2) {
        return { canAccess: false, reason: 'pro' }
      }
      return { canAccess: true, reason: null }
    }
    
    return { canAccess: false, reason: 'enroll' }
  }

  return (
    <div>
      {courseDetail?.chapters?.length == 0 ?
      <div>
        <Skeleton className='w-full h-25 rounded-xl'/>
        <Skeleton className='w-full h-25 mt-5 rounded-xl'/>
      </div>
      :
      <div className='p-5 border-4 rounded-2xl'>
        {courseDetail?.chapters?.map((chapter, index) => (
          <Accordion type="single" collapsible key={index}>
            <AccordionItem value="item-1">
              <AccordionTrigger className='p-3 hover:bg-zinc-800 cursor-pointer font-game text-4xl'>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex gap-10'>
                    <h2 className='h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center'>{index + 1}</h2>
                    <h2>{chapter?.name}</h2>
                  </div> 
                  {/* Only show Pro badge for authenticated users who don't have unlimited access */}
                  {isSignedIn && !hasUnlimitedAccess && index >= 2 && <h2 className='font-game text-3xl text-yellow-400'>Pro</h2>}
                </div>               
              </AccordionTrigger>
              <AccordionContent>
                <div className='p-7 bg-zinc-900 rounded-2xl'>
                  {chapter?.exercises.map((exc, indexExc) => {
                    const isCompleted = isExerciseCompleted(chapter?.chapterId, Number(indexExc) + 1)
                    const { canAccess, reason } = canAccessExercise(index)
                    
                    return (
                      <div key={indexExc} className='flex items-center justify-between mb-7'>        
                        <div className='flex items-center gap-10 font-game'>
                          <h2 className='text-3xl'>Exercise {index * chapter?.exercises.length + indexExc + 1}</h2>  
                          <h2 className='text-3xl'>{exc?.name}</h2>
                        </div> 

                        {isCompleted ? (
                          <Link href={'/courses/' + courseDetail?.courseId + '/' + chapter?.chapterId + '/' + exc?.slug}>
                            <Button variant={'pixel'} className='font-game bg-green-600' size={'lg'}>Completed</Button>
                          </Link>
                        ) : canAccess ? (
                          <Link href={'/courses/' + courseDetail?.courseId + '/' + chapter?.chapterId + '/' + exc?.slug}>
                            <Button variant={'pixel'} className='font-game' size={'lg'}>{exc?.xp} xp</Button>
                          </Link>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant={'pixelDisabled'} className='font-game' size={'lg'}>???</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {reason === 'login' && (
                                <Link href="/sign-in" className='font-game text-lg hover:underline'>
                                  Please Login First →
                                </Link>
                              )}
                              {reason === 'enroll' && (
                                <Link href={`/courses/${courseDetail?.courseId}/enroll`} className='font-game text-lg hover:underline'>
                                  Please Enroll First →
                                </Link>
                              )}
                              {reason === 'pro' && (
                                <Link href="/pricing" className='font-game text-lg hover:underline'>
                                  Upgrade to Pro →
                                </Link>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      }
    </div>
  )
}

export default CourseChapter