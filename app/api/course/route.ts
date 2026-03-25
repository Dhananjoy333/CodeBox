import { db } from "@/config/db";
import { CompletedExerciseTable, CourseChaptersTable, CourseTable, EnrolledCourse } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, asc, and, desc, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseid');
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    // Handle specific course request (for both authenticated and unauthenticated users)
    if (courseId && courseId !== 'enrolled') {
      // Get course details (public data)
      const result = await db.select().from(CourseTable)
        //@ts-ignore
        .where(eq(CourseTable.courseId, courseId));

      if (!result || result.length === 0) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }

      // Get chapters (public data)
      const chapterResult = await db.select().from(CourseChaptersTable)
        //@ts-ignore
        .where(eq(CourseChaptersTable.courseId, courseId))
        .orderBy(asc(CourseChaptersTable.chapterId));

      // If user is not logged in, return public data only
      if (!user) {
        return NextResponse.json({
          ...result[0],
          chapters: chapterResult,
          userEnrolled: false,
          courseEnrolledInfo: null,
          completedExercises: []
        });
      }

      // User is logged in - get enrollment data
      const enrolledCourse = await db.select().from(EnrolledCourse)
      //@ts-ignore
        .where(and(eq(EnrolledCourse.courseId, courseId),eq(EnrolledCourse.userId, userEmail)
        ));

      const isEnrolledCourse = enrolledCourse?.length > 0;

      const completedExercises = await db.select().from(CompletedExerciseTable)
        //@ts-ignore
        .where(and(eq(CompletedExerciseTable.courseId, courseId),eq(CompletedExerciseTable.userId, userEmail)
        ))
        .orderBy(
          desc(CompletedExerciseTable.courseId),
          desc(CompletedExerciseTable.exerciseId)
        );

      return NextResponse.json({
        ...result[0],
        chapters: chapterResult,
        userEnrolled: isEnrolledCourse,
        courseEnrolledInfo: enrolledCourse[0] || null,
        completedExercises: completedExercises || []
      });
    }

    // Handle enrolled courses request (requires authentication)
    else if (courseId == 'enrolled') {
      if (!user) {
        return NextResponse.json([]);
      }

      const enrolledCourses = await db
        .select()
        .from(EnrolledCourse)
        //@ts-ignore
        .where(eq(EnrolledCourse.userId, userEmail));

      if (enrolledCourses.length === 0) {
        return NextResponse.json([]);
      }

      const courseIds = enrolledCourses.map(c => c.courseId);

      const courses = await db
        .select()
        .from(CourseTable)
        //@ts-ignore
        .where(inArray(CourseTable.courseId, courseIds));

      const chapters = await db
        .select()
        .from(CourseChaptersTable)
        //@ts-ignore
        .where(inArray(CourseChaptersTable.courseId, courseIds))
        .orderBy(asc(CourseChaptersTable.chapterId));

      const completed = await db
        .select()
        .from(CompletedExerciseTable)
        //@ts-ignore
        .where(and(inArray(CompletedExerciseTable.courseId, courseIds),eq(CompletedExerciseTable.userId, userEmail)
        ))
        .orderBy(
          desc(CompletedExerciseTable.courseId),
          desc(CompletedExerciseTable.exerciseId)
        );

      const finalResult = courses.map(course => {
        const courseEnrollInfo = enrolledCourses.find(e => e.courseId === course.courseId);

        return {
          ...course,
          chapters: chapters.filter(ch => ch.courseId === course.courseId),
          completedExercises: completed.filter(cx => cx.courseId === course.courseId),
          courseEnrolledInfo: courseEnrollInfo,
          userEnrolled: true
        };
      });

      const formattedResult = finalResult.map(item => {
        const totalExercises = item.chapters.reduce((acc, chapter) => {
          const exercisesCount = Array.isArray(chapter.exercises) ? chapter.exercises.length : 0;
          return acc + exercisesCount;
        }, 0);

        const completedExercises = item.completedExercises.length;

        return {
          courseId: item.courseId,
          title: item.title,
          bannerImage: item?.bannerImage,
          totalExercises,
          completedExercises,
          xpEarned: item.courseEnrolledInfo?.xpEarned || 0,
          level: item.level
        };
      });

      return NextResponse.json(formattedResult);
    }

    // Fetch all courses (public)
    else {
      const result = await db.select().from(CourseTable);
      return NextResponse.json(result || []);
    }

  } catch (error) {
    console.error('Error in /api/course:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}