'use client'

import Image from "next/image"
import { SignIn, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {

    const {user} = useUser()

    if (user){
        return(
            <div className="min-h-screen grid w-full items-center bg-zinc-100 px-4 font-mono text-sm">
                <div className="mx-auto w-full sm:w-180 space-y-6 bg-white px-4 py-8 border-4 border-black shadow-[8px_8px_0_0_#000] text-center">

                    {/* GIF */}
                    <div className="flex justify-center">
                    <Image 
                        src={'/auth.gif'} 
                        alt="authenticated" 
                        width={620} 
                        height={520}
                        className="rounded-xl"
                    />
                    </div>

                    {/* Message */}
                    <h2 className="text-2xl font-bold uppercase font-game text-black">
                    You are already authenticated
                    </h2>

                    {/* Back Button */}
                    <Link href={'/'}>
                    <Button className="w-auto px-4 py-4 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_0_#000] text-black font-bold font-game text-4xl uppercase cursor-pointer" size={'lg'}>Go Back</Button>
                    </Link>
                </div>
                </div>
        )
    }

  return (
    <div className="relative flex flex-col justify-center items-center overflow-hidden"
            style={{ height: 'calc(100vh - 80px)' }}>
              {/* Test Credentials */}
              <div className="mb-4 p-4 backdrop-blur-lg dark:bg-black/50 border border-white/20 rounded-xl shadow-lg">
                <p className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">🔑 Test Credentials</p>
                <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <p className="font-mono">📧 <span className="font-medium">Email:</span>tester1+clerk_test@example.com</p>
                  <p className="font-mono">🔒 <span className="font-medium">Password:</span>testW@123</p>
                </div>
              </div>
    
            {/* Background Image */}
            <Image
              src="/sign-in.gif"
              alt="sign-up"
              fill
              className="object-cover -z-10"
              priority
            />
    
            {/* Content */}
            <SignIn 
              path="/sign-in"
              routing="path"
              signUpUrl="/sign-up"
              fallbackRedirectUrl="/"
            />
        </div>
  )
}

