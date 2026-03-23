import { db } from "@/config/db";
import { CompletedExerciseTable, EnrolledCourse, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {courseId,chapterId,exerciseId,xpEarned} = await req.json()
    const user = await currentUser();

    const result = await db.insert(CompletedExerciseTable).values({
        chapterId:chapterId,
        courseId:courseId,
        exerciseId:exerciseId,
        userId: user?.primaryEmailAddress?.emailAddress
    }).returning()

    //update course XP earned
    await db.update(EnrolledCourse).set({
        xpEarned: sql `${EnrolledCourse.xpEarned}  + ${xpEarned}`
    }).where(eq(EnrolledCourse?.courseId,courseId))

    //update user Xp earned
    await db.update(usersTable).set({
        points: sql `${usersTable.points}  + ${xpEarned}`
        //@ts-ignore
    }).where(eq(usersTable?.email,user?.primaryEmailAddress?.emailAddress))

    return NextResponse.json(result)
    
}