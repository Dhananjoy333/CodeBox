'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs";
import { useParams, usePathname } from "next/navigation"

const courses = [
  {
    id: 1,
    name: 'HTML',
    desc: 'Learn the fundamentals of HTML and build the structure of modern web pages.',
    path: '/courses/2'
  },
  {
    id: 2,
    name: 'CSS',
    desc: 'Master CSS to style and design responsive, visually appealing web layouts.',
    path: '/courses/3'
  },
  {
    id: 3,
    name: 'React',
    desc: 'Build dynamic and interactive web applications using the React JavaScript library.',
    path: '/courses/1'
  },
  {
    id: 5,
    name: 'Python',
    desc: 'Learn Python programming from basics to intermediate level, covering logic building, functions, and real-world applications.',
    path: '/courses/4'
  },
];


function Header() {

  const {user} = useUser()

  const path = usePathname()
  const {exerciseslug} = useParams()

  return (
    <div className="p-4 max-w-7xl flex justify-between items-center w-full">
        <div className="flex gap-2 items-center">
          <Link href={'/'} className="flex gap-2 items-center">
            <Image src={'/logo.png'} alt="logo" width={40} height={40}/>
            <h2 className="font-bold text-3xl font-game">CodeBox</h2>
          </Link>
        </div>
        {/* Navbar */}
        {!exerciseslug ?
        <NavigationMenu className="font-game">
          <NavigationMenuList className="gap-8">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-2xl">Courses</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid md:grid-cols-2 gap-2 sm:w-100 md:w-120 lg:w-150">
                  {courses.map((course,index)=>(
                    <Link href={course.path} key={index} >
                    <div className="p-2 hover:bg-accent rounded-xl cursor-pointer">
                      <h2 className="font-medium text-2xl">{course.name}</h2>
                      <p className="text-lg text-gray-500 line-clamp-2">{course.desc}</p>
                    </div>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="text-2xl">
                <Link href={'/projects'} >Projects</Link>
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
        :
        <h2 className="text-2xl font-game">{exerciseslug?.toString()?.replaceAll("-"," ").toLocaleUpperCase()}</h2>
        }
        {/* Signup-button */}
        {!user ?
        <Link href={'/sign-in'}>
          <Button className="font-game text-2xl" variant={"pixel"}>Sign Up</Button>
        </Link>
        : 
        <div className="flex gap-4 items-center">
            <Link href={'/dashboard'}>
            <Button className="font-game text-2xl" variant={"pixel"}>Dashboard</Button>
            </Link>
            <UserButton/>
        </div>
        }
    </div>
  )
}

export default Header