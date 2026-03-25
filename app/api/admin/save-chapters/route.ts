import { db } from "@/config/db"
import { CourseChaptersTable } from "@/config/schema"
import { NextRequest, NextResponse } from "next/server"

const DATA = 
[
  {
    "id": 1,
    "name": "Introduction to Python",
    "desc": "Get started with Python, understand why it's popular, and set up your development environment.",
    "exercises": [
      {"name": "What is Python?", "slug": "what-is-python", "xp": 20, "difficulty": "easy"},
      {"name": "Installing Python", "slug": "installing-python", "xp": 25, "difficulty": "easy"},
      {"name": "First Python Program", "slug": "first-python-program", "xp": 20, "difficulty": "easy"},
      {"name": "Python as a Calculator", "slug": "python-calculator", "xp": 15, "difficulty": "easy"},
      {"name": "Comments in Python", "slug": "comments-python", "xp": 15, "difficulty": "easy"},
      {"name": "Print Function Deep Dive", "slug": "print-function", "xp": 25, "difficulty": "easy"}
    ]
  },
  {
    "id": 2,
    "name": "Variables & Data Types",
    "desc": "Learn how to store and manage different types of data in Python.",
    "exercises": [
      {"name": "Variables Basics", "slug": "variables-basics", "xp": 20, "difficulty": "easy"},
      {"name": "Numbers & Math Operations", "slug": "numbers-math", "xp": 25, "difficulty": "easy"},
      {"name": "Strings Basics", "slug": "strings-basics", "xp": 30, "difficulty": "easy"},
      {"name": "String Methods", "slug": "string-methods", "xp": 35, "difficulty": "medium"},
      {"name": "Boolean Values", "slug": "boolean-values", "xp": 20, "difficulty": "easy"},
      {"name": "Type Conversion", "slug": "type-conversion", "xp": 30, "difficulty": "easy"}
    ]
  },
  {
    "id": 3,
    "name": "Input & Output",
    "desc": "Make interactive programs that can accept user input and display formatted output.",
    "exercises": [
      {"name": "Input Function", "slug": "input-function", "xp": 25, "difficulty": "easy"},
      {"name": "String Formatting", "slug": "string-formatting", "xp": 30, "difficulty": "easy"},
      {"name": "F-Strings", "slug": "f-strings", "xp": 35, "difficulty": "easy"},
      {"name": "Multiple Inputs", "slug": "multiple-inputs", "xp": 25, "difficulty": "easy"},
      {"name": "Escape Sequences", "slug": "escape-sequences", "xp": 20, "difficulty": "easy"},
      {"name": "Formatted Output Challenge", "slug": "formatted-output-challenge", "xp": 40, "difficulty": "medium"}
    ]
  },
  {
    "id": 4,
    "name": "Control Flow",
    "desc": "Control the flow of your program using conditional statements.",
    "exercises": [
      {"name": "If Statement", "slug": "if-statement", "xp": 25, "difficulty": "easy"},
      {"name": "If-Else Statement", "slug": "if-else", "xp": 30, "difficulty": "easy"},
      {"name": "Elif Chains", "slug": "elif-chains", "xp": 35, "difficulty": "easy"},
      {"name": "Nested Conditions", "slug": "nested-conditions", "xp": 30, "difficulty": "medium"},
      {"name": "Comparison Operators", "slug": "comparison-operators", "xp": 20, "difficulty": "easy"},
      {"name": "Logical Operators", "slug": "logical-operators", "xp": 35, "difficulty": "medium"}
    ]
  },
  {
    "id": 5,
    "name": "Loops",
    "desc": "Automate repetitive tasks using while and for loops.",
    "exercises": [
      {"name": "While Loop Basics", "slug": "while-loop", "xp": 30, "difficulty": "easy"},
      {"name": "For Loop with Range", "slug": "for-loop-range", "xp": 30, "difficulty": "easy"},
      {"name": "Looping Through Strings", "slug": "loop-strings", "xp": 25, "difficulty": "easy"},
      {"name": "Break Statement", "slug": "break-statement", "xp": 20, "difficulty": "easy"},
      {"name": "Continue Statement", "slug": "continue-statement", "xp": 20, "difficulty": "easy"},
      {"name": "Nested Loops", "slug": "nested-loops", "xp": 40, "difficulty": "medium"}
    ]
  },
  {
    "id": 6,
    "name": "Lists & Tuples",
    "desc": "Store collections of data using Python's versatile list and tuple structures.",
    "exercises": [
      {"name": "Creating Lists", "slug": "creating-lists", "xp": 20, "difficulty": "easy"},
      {"name": "List Indexing", "slug": "list-indexing", "xp": 25, "difficulty": "easy"},
      {"name": "List Methods", "slug": "list-methods", "xp": 35, "difficulty": "medium"},
      {"name": "List Slicing", "slug": "list-slicing", "xp": 30, "difficulty": "easy"},
      {"name": "Tuples Basics", "slug": "tuples-basics", "xp": 25, "difficulty": "easy"},
      {"name": "List Comprehension", "slug": "list-comprehension", "xp": 40, "difficulty": "medium"}
    ]
  },
  {
    "id": 7,
    "name": "Dictionaries & Sets",
    "desc": "Work with key-value pairs and unique collections for efficient data management.",
    "exercises": [
      {"name": "Creating Dictionaries", "slug": "creating-dictionaries", "xp": 25, "difficulty": "easy"},
      {"name": "Accessing Dictionary Values", "slug": "dict-access", "xp": 25, "difficulty": "easy"},
      {"name": "Dictionary Methods", "slug": "dict-methods", "xp": 35, "difficulty": "medium"},
      {"name": "Looping Through Dictionaries", "slug": "loop-dictionaries", "xp": 30, "difficulty": "easy"},
      {"name": "Sets Basics", "slug": "sets-basics", "xp": 25, "difficulty": "easy"},
      {"name": "Set Operations", "slug": "set-operations", "xp": 35, "difficulty": "medium"}
    ]
  },
  {
    "id": 8,
    "name": "Functions",
    "desc": "Write reusable code blocks with functions to make your programs modular.",
    "exercises": [
      {"name": "Defining Functions", "slug": "defining-functions", "xp": 25, "difficulty": "easy"},
      {"name": "Function Parameters", "slug": "function-parameters", "xp": 30, "difficulty": "easy"},
      {"name": "Return Values", "slug": "return-values", "xp": 30, "difficulty": "easy"},
      {"name": "Default Parameters", "slug": "default-parameters", "xp": 25, "difficulty": "easy"},
      {"name": "Keyword Arguments", "slug": "keyword-arguments", "xp": 30, "difficulty": "medium"},
      {"name": "Variable Scope", "slug": "variable-scope", "xp": 35, "difficulty": "medium"}
    ]
  },
  {
    "id": 9,
    "name": "Error Handling",
    "desc": "Handle errors gracefully and make your programs robust.",
    "exercises": [
      {"name": "Syntax vs Runtime Errors", "slug": "error-types", "xp": 20, "difficulty": "easy"},
      {"name": "Try-Except Block", "slug": "try-except", "xp": 35, "difficulty": "easy"},
      {"name": "Handling Specific Exceptions", "slug": "specific-exceptions", "xp": 30, "difficulty": "easy"},
      {"name": "Else & Finally Clauses", "slug": "else-finally", "xp": 30, "difficulty": "medium"},
      {"name": "Raising Exceptions", "slug": "raising-exceptions", "xp": 25, "difficulty": "easy"},
      {"name": "Input Validation", "slug": "input-validation", "xp": 35, "difficulty": "medium"}
    ]
  },
  {
    "id": 10,
    "name": "File Handling",
    "desc": "Read from and write to files for persistent data storage.",
    "exercises": [
      {"name": "Opening Files", "slug": "opening-files", "xp": 25, "difficulty": "easy"},
      {"name": "Reading Files", "slug": "reading-files", "xp": 30, "difficulty": "easy"},
      {"name": "Writing to Files", "slug": "writing-files", "xp": 30, "difficulty": "easy"},
      {"name": "Appending to Files", "slug": "appending-files", "xp": 25, "difficulty": "easy"},
      {"name": "With Statement", "slug": "with-statement", "xp": 35, "difficulty": "medium"},
      {"name": "CSV File Handling", "slug": "csv-handling", "xp": 40, "difficulty": "medium"}
    ]
  },
  {
    "id": 11,
    "name": "Modules & Packages",
    "desc": "Organize code using modules and leverage Python's extensive standard library.",
    "exercises": [
      {"name": "Importing Modules", "slug": "importing-modules", "xp": 25, "difficulty": "easy"},
      {"name": "Math Module", "slug": "math-module", "xp": 30, "difficulty": "easy"},
      {"name": "Random Module", "slug": "random-module", "xp": 35, "difficulty": "easy"},
      {"name": "Datetime Module", "slug": "datetime-module", "xp": 30, "difficulty": "easy"},
      {"name": "Creating Custom Modules", "slug": "custom-modules", "xp": 35, "difficulty": "medium"},
      {"name": "Pip & External Packages", "slug": "pip-packages", "xp": 30, "difficulty": "easy"}
    ]
  },
  {
    "id": 12,
    "name": "Mini Projects",
    "desc": "Apply everything you've learned by building fun and practical Python projects.",
    "exercises": [
      {"name": "Number Guessing Game", "slug": "guessing-game", "xp": 35, "difficulty": "easy"},
      {"name": "Simple Calculator", "slug": "simple-calculator", "xp": 30, "difficulty": "easy"},
      {"name": "To-Do List App", "slug": "todo-list", "xp": 40, "difficulty": "medium"},
      {"name": "Rock Paper Scissors", "slug": "rock-paper-scissors", "xp": 35, "difficulty": "easy"},
      {"name": "Password Generator", "slug": "password-generator", "xp": 40, "difficulty": "medium"},
      {"name": "Final Project: Quiz App", "slug": "quiz-app", "xp": 50, "difficulty": "hard"}
    ]
  }
]


export async function GET(req: NextRequest) {
    DATA.forEach(async (item) => {
        await db.insert(CourseChaptersTable).values({
            courseId: 4, //Change Course ID depends on course info,
            desc: item?.desc,
            exercises: item.exercises,
            name: item?.name,
            chapterId: item?.id
        })
    })
    return NextResponse.json('Success')
}

