import { db } from "@/config/db"
import { ExerciseTable } from "@/config/schema"
import { NextRequest, NextResponse } from "next/server"

const DATA = 
[
  {
    "courseId": 2,
    "exerciseId": "explore-the-web-skeleton",
    "exerciseName": "Explore the Web Skeleton",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.7;background:#0f0f0f;padding:20px;border-radius:12px;color:#e5e5e5;'><p style='margin-bottom:14px;'>Welcome, brave explorer! Your journey begins by discovering the <strong>web skeleton</strong>.</p><ul style='padding-left:20px;margin-bottom:16px;'><li style='margin-bottom:10px;'>Use <code style=\"background:#1f2937;padding:2px 6px;border-radius:6px;color:#22c55e;\">&lt;!DOCTYPE html&gt;</code> to declare your document type.</li><li style='margin-bottom:10px;'>The <code style=\"background:#1f2937;padding:2px 6px;border-radius:6px;color:#22c55e;\">&lt;html&gt;</code> wraps your page.</li><li style='margin-bottom:10px;'>The <code style=\"background:#1f2937;padding:2px 6px;border-radius:6px;color:#22c55e;\">&lt;head&gt;</code> stores metadata.</li><li style='margin-bottom:10px;'>The <code style=\"background:#1f2937;padding:2px 6px;border-radius:6px;color:#22c55e;\">&lt;body&gt;</code> contains visible content.</li></ul><p>Build your first skeleton!</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:16px;border-radius:10px;'><p>Create full HTML skeleton with required tags.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:16px;border-radius:10px;'><p>Follow order: DOCTYPE → html → head → body.</p></body>",
      "starterCode": { "/index.html": "<!DOCTYPE html>..." },
      "regex": "(?i)<title>\\s*Web Skeleton Adventure\\s*</title>",
      "output": "<title>Web Skeleton Adventure</title>",
      "hintXp": 30
    }
  },

  {
    "courseId": 2,
    "exerciseId": "build-your-base-camp",
    "exerciseName": "Build Your Base Camp",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.7;background:#0f0f0f;padding:20px;border-radius:12px;color:#e5e5e5;'><p style='margin-bottom:14px;'>Set up your base camp using heading and paragraph.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:16px;border-radius:10px;'><p>Add <code>&lt;h1&gt;</code> and <code>&lt;p&gt;</code>.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:16px;border-radius:10px;'><p>Use proper heading + paragraph.</p></body>",
      "starterCode": { "/index.html": "<!DOCTYPE html>..." },
      "regex": "<h1>\\s*Welcome to Base Camp\\s*</h1>",
      "output": "<h1>Welcome to Base Camp</h1>",
      "hintXp": 35
    }
  },

  {
    "courseId": 2,
    "exerciseId": "name-your-world",
    "exerciseName": "Name Your World",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.7;background:#0f0f0f;padding:20px;border-radius:12px;color:#e5e5e5;'><p>Name your page using <code style=\"background:#1f2937;padding:2px 6px;border-radius:6px;\">&lt;title&gt;</code>.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:16px;border-radius:10px;'><p>Set title to <strong>My Adventure World</strong>.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:16px;border-radius:10px;'><p>Title must be inside head.</p></body>",
      "starterCode": { "/index.html": "<!DOCTYPE html>..." },
      "regex": "(?i)<title>\\s*My Adventure World\\s*</title>",
      "output": "<title>My Adventure World</title>",
      "hintXp": 30
    }
  },

  {
    "courseId": 2,
    "exerciseId": "break-and-repair",
    "exerciseName": "Break & Repair",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.7;background:#0f0f0f;padding:20px;border-radius:12px;color:#e5e5e5;'><p>Fix broken HTML tags and structure.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:16px;border-radius:10px;'><p>Fix missing closing tags.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:16px;border-radius:10px;'><p>Check <code>&lt;/h1&gt;</code> and <code>&lt;/p&gt;</code>.</p></body>",
      "starterCode": { "/index.html": "<!DOCTYPE html>..." },
      "regex": "<h1>\\s*Fortress Repaired\\s*</h1>",
      "output": "<h1>Fortress Repaired</h1>",
      "hintXp": 40
    }
  },

  {
    "courseId": 2,
    "exerciseId": "html-detective",
    "exerciseName": "HTML Detective",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.7;background:#0f0f0f;padding:20px;border-radius:12px;color:#e5e5e5;'><p>Find and fix HTML mistakes.</p></body>",
      "task": "<body style='font-family:Arial,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:16px;border-radius:10px;'><p>Fix all broken tags.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:16px;border-radius:10px;'><p>Look for missing closing tags.</p></body>",
      "starterCode": { "/index.html": "<!DOCTYPE html>..." },
      "regex": "<h1>\\s*Detective Mode\\s*</h1>",
      "output": "<h1>Detective Mode</h1>",
      "hintXp": 45
    }
  },

  {
    "courseId": 2,
    "exerciseId": "element-collector",
    "exerciseName": "Element Collector",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body style='font-family:Arial,sans-serif;line-height:1.7;background:#0f0f0f;padding:20px;border-radius:12px;color:#e5e5e5;'><p style='margin-bottom:14px;'>Collect elements like headings, paragraphs and lists.</p><ul style='padding-left:20px;'><li>Headings</li><li>Paragraphs</li><li>Links</li></ul></body>",
      "task": "<body style='font-family:Arial,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:16px;border-radius:10px;'><p>Add heading, paragraph and list.</p></body>",
      "hint": "<body style='font-family:Arial,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:16px;border-radius:10px;'><p>Use <code>&lt;ul&gt;</code> and <code>&lt;li&gt;</code>.</p></body>",
      "starterCode": { "/index.html": "<!DOCTYPE html>..." },
      "regex": "<li>\\s*Headings\\s*</li>",
      "output": "<li>Headings</li>",
      "hintXp": 35
    }
  }
]


export async function GET(req: NextRequest) {
    DATA.forEach(async (item) => {
        await db.insert(ExerciseTable).values({
            courseId: item?.courseId, //Change Course ID depends on course info,
            chapterId: item?.chapterId,
            exerciseId: item.exerciseId,
            exerciseName: item?.exerciseName,
            exercisesContent: item?.exercisesContent
        })
    })
    return NextResponse.json('Success')
}