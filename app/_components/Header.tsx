'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import { Course } from "../(routes)/courses/_components/CourseList"

function Header() {
  const { user } = useUser()
  const { exerciseslug } = useParams()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    GetCourses()
  }, [])

  const GetCourses = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await axios.get('/api/course')
      console.log("here is data",result.data)
      // Ensure result.data is an array
      if (Array.isArray(result.data)) {
        setCourses(result.data)
      } else {
        setCourses([])
      }
    } catch (err) {
      console.error('Error fetching courses:', err)
      setError('Failed to load courses')
      setCourses([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-7xl flex justify-between items-center w-full">
      <div className="flex gap-2 items-center">
        <Link href={'/'} className="flex gap-2 items-center">
          <Image src={'/logo.png'} alt="logo" width={40} height={40} />
          <h2 className="font-bold text-3xl font-game">CodeBox</h2>
        </Link>
      </div>

      {/* Navbar */}
      {!exerciseslug && courses ? (
        <NavigationMenu className="font-game">
          <NavigationMenuList className="gap-8">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-2xl">Courses</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid md:grid-cols-2 gap-2 sm:w-100 md:w-120 lg:w-150">
                  {loading ? (
                    <div className="p-4">Loading courses...</div>
                  ) : error ? (
                    <div className="p-4 text-red-500">{error}</div>
                  ) : courses.length === 0 ? (
                    <div className="p-4">No courses available</div>
                  ) : (
                    courses.map((course, index) => (
                      <Link href={'/courses/' + course?.courseId} key={index}>
                        <div className="p-2 hover:bg-accent rounded-xl cursor-pointer">
                          <h2 className="font-medium text-2xl">{course?.title}</h2>
                          <p className="text-lg text-gray-500 line-clamp-2">{course?.desc}</p>
                        </div>
                      </Link>
                    ))
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="text-2xl">
                <Link href={'/projects'}>Projects</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="text-2xl">
                <Link href={'/pricing'}>Pricing</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="text-2xl">
                <Link href={'/contact-us'}>Contact Us</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <h2 className="text-2xl font-game">{exerciseslug?.toString()?.replaceAll("-", " ").toLocaleUpperCase()}</h2>
      )}

      {/* Signup-button */}
      {!user ? (
        <Link href={'/sign-in'}>
          <Button className="font-game text-2xl" variant={"pixel"}>Sign In</Button>
        </Link>
      ) : (
        <div className="flex gap-4 items-center">
          <Link href={'/dashboard'}>
            <Button className="font-game text-2xl" variant={"pixel"}>Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      )}
    </div>
  )
}

export default Header