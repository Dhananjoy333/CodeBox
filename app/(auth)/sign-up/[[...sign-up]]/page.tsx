
'use client'

import { SignUp } from "@clerk/nextjs"
import Image from "next/image"

export default function Page() {
  return (
    <div className="relative flex justify-center items-center overflow-hidden"
        style={{ height: 'calc(100vh - 80px)' }}>

        {/* Background Image */}
        <Image
          src="/sign-up.gif"
          alt="sign-up"
          fill
          className="object-cover -z-10"
          priority
        />

        {/* Content */}
        <SignUp 
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
        />
    </div>
  )
}