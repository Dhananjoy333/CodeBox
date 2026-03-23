import { db } from "@/config/db";
import { CompletedExerciseTable, CourseChaptersTable, ExerciseTable } from "@/config/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {courseId,chapterId,exerciseId} = await req.json();

    const courseResult = await db.select().from(CourseChaptersTable).
    where(and(eq(CourseChaptersTable.courseId,courseId),eq(CourseChaptersTable.chapterId,chapterId)))

    const exerciseResult = await db.select().from(ExerciseTable).
    where(and(eq(ExerciseTable.courseId,courseId),eq(ExerciseTable.exerciseId,exerciseId)))

    //Get completed exercise in that course/chapters
    const completedExercise = await db.select().from(CompletedExerciseTable).
    where(and(eq(CompletedExerciseTable?.courseId,courseId),eq(CompletedExerciseTable?.chapterId,chapterId)))

    return NextResponse.json({
        ...courseResult[0],
        exerciseData: exerciseResult[0],
        completedExercise: completedExercise
    })
}