import { db } from "@/config/db";
import { CompletedExerciseTable, CourseChaptersTable, CourseTable, EnrolledCourse } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, asc, and, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){

    const {searchParams} = new URL(req.url);
    const courseId = searchParams.get('courseid')
    const user = await currentUser()

    if(courseId){
        const result = await db.select().from(CourseTable).
            //@ts-ignore
            where(eq(CourseTable.courseId, courseId));

        const chapterResult = await db.select().from(CourseChaptersTable).
            //@ts-ignore
            where(eq(CourseChaptersTable.courseId,courseId))
            .orderBy(asc(CourseChaptersTable.chapterId));

        const enrolledCourse = await db.select().from(EnrolledCourse).
            //@ts-ignore
            where(and(eq(EnrolledCourse?.courseId,courseId),eq(EnrolledCourse.userId,user?.primaryEmailAddress?.emailAddress)))

        const isEnrolledCourse = enrolledCourse?.length>0?true:false

        const completedExercises = await db.select().from(CompletedExerciseTable).
            //@ts-ignore
            where(and(eq(CompletedExerciseTable.courseId,courseId),eq(CompletedExerciseTable.userId,user?.primaryEmailAddress?.emailAddress))).orderBy(desc(CompletedExerciseTable?.courseId),desc(CompletedExerciseTable?.exerciseId))


        return NextResponse.json({
            ...result[0],
            chapters : chapterResult,
            userEnrolled: isEnrolledCourse,
            courseEnrolledInfo: enrolledCourse[0],
            completedExercises: completedExercises
        })
    }else{
        //fetch all Courses
        const result = await db.select().from(CourseTable);

        return NextResponse.json(result)
    }
    
}