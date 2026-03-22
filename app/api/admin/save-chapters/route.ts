import { db } from "@/config/db"
import { CourseChaptersTable } from "@/config/schema"
import { NextRequest, NextResponse } from "next/server"

const DATA = 
[
  {
    "id": 1,
    "name": "Introduction to React",
    "desc": "Understand what React is, why it's used, and how it powers modern web apps.",
    "exercises": [
      {"name": "What is React?", "slug": "what-is-react", "xp": 20, "difficulty": "easy"},
      {"name": "Setup React App", "slug": "setup-react-app", "xp": 25, "difficulty": "easy"},
      {"name": "Explore Project Structure", "slug": "explore-project-structure", "xp": 15, "difficulty": "easy"},
      {"name": "First React Render", "slug": "first-react-render", "xp": 20, "difficulty": "easy"},
      {"name": "JSX Preview", "slug": "jsx-preview", "xp": 20, "difficulty": "easy"},
      {"name": "React DevTools Intro", "slug": "react-devtools-intro", "xp": 25, "difficulty": "easy"}
    ]
  },
  {
    "id": 2,
    "name": "JSX Basics",
    "desc": "Learn how JSX allows you to write HTML-like syntax inside JavaScript.",
    "exercises": [
      {"name": "Write Your First JSX", "slug": "write-first-jsx", "xp": 35, "difficulty": "medium"},
      {"name": "JSX Rules Fix", "slug": "jsx-rules-fix", "xp": 30, "difficulty": "easy"},
      {"name": "Embed Expressions", "slug": "embed-expressions", "xp": 20, "difficulty": "easy"},
      {"name": "Class vs className", "slug": "class-vs-classname", "xp": 10, "difficulty": "easy"},
      {"name": "JSX Fragment Use", "slug": "jsx-fragment-use", "xp": 20, "difficulty": "easy"},
      {"name": "JSX Challenge", "slug": "jsx-challenge", "xp": 15, "difficulty": "easy"}
    ]
  },
  {
    "id": 3,
    "name": "Components",
    "desc": "Break UI into reusable pieces using functional components.",
    "exercises": [
      {"name": "Create First Component", "slug": "create-first-component", "xp": 20, "difficulty": "easy"},
      {"name": "Component Reuse", "slug": "component-reuse", "xp": 30, "difficulty": "medium"},
      {"name": "Nested Components", "slug": "nested-components", "xp": 15, "difficulty": "easy"},
      {"name": "Component Naming", "slug": "component-naming", "xp": 20, "difficulty": "easy"},
      {"name": "Split UI into Components", "slug": "split-ui-components", "xp": 25, "difficulty": "easy"},
      {"name": "Mini Project UI", "slug": "mini-project-ui", "xp": 25, "difficulty": "easy"}
    ]
  },
  {
    "id": 4,
    "name": "Props",
    "desc": "Pass data between components using props.",
    "exercises": [
      {"name": "Pass Your First Props", "slug": "pass-first-props", "xp": 30, "difficulty": "easy"},
      {"name": "Dynamic Props", "slug": "dynamic-props", "xp": 20, "difficulty": "easy"},
      {"name": "Props Destructuring", "slug": "props-destructuring", "xp": 30, "difficulty": "medium"},
      {"name": "Default Props", "slug": "default-props", "xp": 15, "difficulty": "easy"},
      {"name": "Props Validation Idea", "slug": "props-validation-idea", "xp": 25, "difficulty": "easy"},
      {"name": "Component Customization", "slug": "component-customization", "xp": 30, "difficulty": "medium"}
    ]
  },
  {
    "id": 5,
    "name": "State",
    "desc": "Manage dynamic data inside components using useState.",
    "exercises": [
      {"name": "Intro to useState", "slug": "intro-usestate", "xp": 20, "difficulty": "easy"},
      {"name": "Counter App", "slug": "counter-app", "xp": 25, "difficulty": "easy"},
      {"name": "Toggle State", "slug": "toggle-state", "xp": 40, "difficulty": "medium"},
      {"name": "Form Input State", "slug": "form-input-state", "xp": 20, "difficulty": "easy"},
      {"name": "Multiple States", "slug": "multiple-states", "xp": 20, "difficulty": "easy"},
      {"name": "State Challenge", "slug": "state-challenge", "xp": 25, "difficulty": "medium"}
    ]
  },
  {
    "id": 6,
    "name": "Event Handling",
    "desc": "Handle user interactions like clicks, inputs, and submissions.",
    "exercises": [
      {"name": "Handle Click Event", "slug": "handle-click-event", "xp": 20, "difficulty": "easy"},
      {"name": "Input Change Event", "slug": "input-change-event", "xp": 15, "difficulty": "easy"},
      {"name": "Form Submit", "slug": "form-submit", "xp": 35, "difficulty": "medium"},
      {"name": "Prevent Default", "slug": "prevent-default", "xp": 20, "difficulty": "easy"},
      {"name": "Pass Arguments", "slug": "pass-arguments", "xp": 25, "difficulty": "medium"},
      {"name": "Event Practice", "slug": "event-practice", "xp": 15, "difficulty": "easy"}
    ]
  },
  {
    "id": 7,
    "name": "Conditional Rendering",
    "desc": "Render UI based on conditions using JS logic.",
    "exercises": [
      {"name": "if-else Rendering", "slug": "if-else-rendering", "xp": 20, "difficulty": "easy"},
      {"name": "Ternary Operator UI", "slug": "ternary-ui", "xp": 20, "difficulty": "easy"},
      {"name": "&& Rendering Trick", "slug": "and-rendering", "xp": 35, "difficulty": "medium"},
      {"name": "Login/Logout UI", "slug": "login-logout-ui", "xp": 25, "difficulty": "easy"},
      {"name": "Conditional Component", "slug": "conditional-component", "xp": 20, "difficulty": "easy"},
      {"name": "Challenge UI Switch", "slug": "challenge-ui-switch", "xp": 35, "difficulty": "medium"}
    ]
  },
  {
    "id": 8,
    "name": "Lists & Keys",
    "desc": "Render lists dynamically using map and unique keys.",
    "exercises": [
      {"name": "Map Function Basics", "slug": "map-function-basics", "xp": 30, "difficulty": "medium"},
      {"name": "Render List UI", "slug": "render-list-ui", "xp": 20, "difficulty": "easy"},
      {"name": "Add Keys", "slug": "add-keys", "xp": 35, "difficulty": "medium"},
      {"name": "Dynamic List", "slug": "dynamic-list", "xp": 25, "difficulty": "easy"},
      {"name": "List Filtering", "slug": "list-filtering", "xp": 20, "difficulty": "easy"},
      {"name": "List Challenge", "slug": "list-challenge", "xp": 30, "difficulty": "medium"}
    ]
  },
  {
    "id": 9,
    "name": "Forms in React",
    "desc": "Handle controlled inputs and form state.",
    "exercises": [
      {"name": "Controlled Input", "slug": "controlled-input", "xp": 40, "difficulty": "medium"},
      {"name": "Multiple Inputs", "slug": "multiple-inputs", "xp": 45, "difficulty": "medium"},
      {"name": "Checkbox Handling", "slug": "checkbox-handling", "xp": 15, "difficulty": "easy"},
      {"name": "Radio Buttons", "slug": "radio-buttons", "xp": 20, "difficulty": "easy"},
      {"name": "Form Validation", "slug": "form-validation", "xp": 25, "difficulty": "easy"},
      {"name": "Form Project", "slug": "form-project", "xp": 30, "difficulty": "medium"}
    ]
  },
  {
    "id": 10,
    "name": "useEffect Hook",
    "desc": "Handle side effects like API calls and lifecycle events.",
    "exercises": [
      {"name": "Intro to useEffect", "slug": "intro-useeffect", "xp": 35, "difficulty": "medium"},
      {"name": "Run on Mount", "slug": "run-on-mount", "xp": 40, "difficulty": "medium"},
      {"name": "Dependency Array", "slug": "dependency-array", "xp": 25, "difficulty": "easy"},
      {"name": "Fetch API Data", "slug": "fetch-api-data", "xp": 35, "difficulty": "medium"},
      {"name": "Cleanup Function", "slug": "cleanup-function", "xp": 25, "difficulty": "easy"},
      {"name": "Effect Challenge", "slug": "effect-challenge", "xp": 40, "difficulty": "medium"}
    ]
  },
  {
    "id": 11,
    "name": "Styling in React",
    "desc": "Style components using CSS, inline styles, and libraries.",
    "exercises": [
      {"name": "CSS Import", "slug": "css-import", "xp": 25, "difficulty": "easy"},
      {"name": "Inline Styling", "slug": "inline-styling", "xp": 30, "difficulty": "medium"},
      {"name": "Conditional Styles", "slug": "conditional-styles", "xp": 20, "difficulty": "easy"},
      {"name": "CSS Modules", "slug": "css-modules", "xp": 40, "difficulty": "medium"},
      {"name": "Tailwind Setup", "slug": "tailwind-setup", "xp": 20, "difficulty": "easy"},
      {"name": "Styled UI Challenge", "slug": "styled-ui-challenge", "xp": 25, "difficulty": "easy"}
    ]
  },
  {
    "id": 12,
    "name": "React Best Practices",
    "desc": "Write clean, scalable, and maintainable React code.",
    "exercises": [
      {"name": "Folder Structure", "slug": "folder-structure", "xp": 20, "difficulty": "easy"},
      {"name": "Component Reusability", "slug": "component-reusability", "xp": 35, "difficulty": "medium"},
      {"name": "Avoid Props Drilling", "slug": "avoid-props-drilling", "xp": 20, "difficulty": "easy"},
      {"name": "Custom Hooks Intro", "slug": "custom-hooks-intro", "xp": 25, "difficulty": "easy"},
      {"name": "Performance Basics", "slug": "performance-basics", "xp": 20, "difficulty": "easy"},
      {"name": "Final Mini Project", "slug": "final-mini-project", "xp": 40, "difficulty": "medium"}
    ]
  }
]


export async function GET(req: NextRequest) {
    DATA.forEach(async (item) => {
        await db.insert(CourseChaptersTable).values({
            courseId: 1, //Change Course ID depends on course info,
            desc: item?.desc,
            exercises: item.exercises,
            name: item?.name,
            chapterId: item?.id
        })
    })
    return NextResponse.json('Success')
}

