'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const gifs = ["/mario.gif", "/hero2.gif", "/hero3.gif"]

function Hero() {

  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % gifs.length)
    }, 4000) // change every 4s

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='w-full relative h-screen overflow-hidden'>
      {gifs.map((gif, i) => (
        <Image
          key={i}
          src={gif}
          alt="hero-bg"
          fill
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className='absolute w-full flex flex-col items-center mt-60'>
        <h2 className='font-bold text-7xl font-game'>Start Your</h2>
        <h2 className='font-bold text-8xl font-game text-yellow-400' style={{
          textShadow: '2px 2px 0 #000, -2px -2px 0  #000, 2px -2px 0 #000, -2px 2px 0 #000'
        }}>Coding Adventure</h2>
        <h2 className='mt-5 font-game text-3xl'>Beginner Friendly coding courses and projects</h2>
        <div className='flex gap-5'>
          <Link href={'/sign-in'}>
            <Button className='font-game text-3xl p-6 mt-7 cursor-pointer' variant={'pixel'}> GET STARTED</Button>
          </Link>
          <a href={'#courses'}>
            <Button className='font-game text-3xl p-6 mt-7 cursor-pointer' variant={'pixel'}> Browse Courses</Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero