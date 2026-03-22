'use client'

import { useSignUp, useClerk } from "@clerk/nextjs"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SignUpPage() {
    // 1. Pull 'loaded' from here instead of useSignUp
    const { loaded, setActive } = useClerk() 
    const { signUp } = useSignUp()
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, setCode] = useState("")
    const [pendingVerification, setPendingVerification] = useState(false)
    const [error, setError] = useState("")

    // 2. Use 'loaded' (from useClerk) and check if signUp exists
    if (!loaded || !signUp) return null

    // 1. Initial Sign Up
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            // Use 'as any' to bypass the SignUpFutureCreateParams restriction 
            // since 'password' is a valid param but TS is being overly cautious
            await (signUp as any).create({
                emailAddress: email,
                password: password,
            })

            // Trigger the email
            await (signUp as any).prepareEmailAddressVerification({ 
                strategy: "email_code" 
            })
            
            setPendingVerification(true)
        } catch (err: any) {
            setError(err.errors?.[0]?.message || "Registration failed")
        }
    }

    // 2. Verify Email Code
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            // Cast to any to access the verification methods on the 'Future' resource
            const completeSignUp = await (signUp as any).attemptEmailAddressVerification({
                code,
            })

            if (completeSignUp.status === "complete") {
                // Use setActive from useClerk()
                await setActive({ session: completeSignUp.createdSessionId })
                router.push("/")
            }
        } catch (err: any) {
            setError(err.errors?.[0]?.message || "Invalid verification code")
        }
    }

    // ... (Your Return UI remains the same)

    return (
        <div className="min-h-screen grid w-full items-center bg-zinc-900 px-4 font-mono text-sm text-white">
            {!pendingVerification ? (
                <div className="mx-auto w-full sm:w-96 space-y-6 bg-zinc-800 px-4 py-8 border-4 border-black shadow-[8px_8px_0_0_#000]">
                    <header className="text-center flex flex-col items-center">
                        <Image src={'/logo.png'} alt="logo" width={40} height={40}/>
                        <h1 className="mt-3 text-base font-bold tracking-wide text-white uppercase font-game">
                            Create Account
                        </h1>
                    </header>

                    {error && <p className="text-xs text-red-500 font-bold uppercase border-2 border-red-500 p-2">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="font-bold text-yellow-400 uppercase block font-game">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 bg-zinc-900 border-2 border-black shadow-[3px_3px_0_0_#000] outline-none focus:border-yellow-400 text-white"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="font-bold text-yellow-400 uppercase block font-game">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 bg-zinc-900 border-2 border-black shadow-[3px_3px_0_0_#000] outline-none focus:border-yellow-400 text-white"
                            />
                        </div>

                        <button type="submit" className="w-full px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-0.5 active:shadow-none text-black font-bold uppercase cursor-pointer">
                            Sign Up
                        </button>
                    </form>
                    
                    <p className="text-center text-xs text-yellow-400">
                        Already have an account?{' '}
                        <div id="clerk-captcha"></div>
                        <button onClick={() => router.push('/sign-in')} className="font-bold underline underline-offset-2 hover:text-yellow-200 cursor-pointer">
                            Sign in
                        </button>
                    </p>
                </div>
            ) : (
                <div className="mx-auto w-full sm:w-96 space-y-6 bg-zinc-800 px-4 py-8 border-4 border-black shadow-[8px_8px_0_0_#000]">
                    <header className="text-center">
                        <h1 className="mt-3 text-base font-bold tracking-wide text-yellow-400 uppercase">Verify Email</h1>
                    </header>

                    {error && <p className="text-xs text-red-500 font-bold uppercase border-2 border-red-500 p-2">{error}</p>}

                    <form onSubmit={handleVerify} className="space-y-4">
                        <div className="space-y-1">
                            <label className="font-bold text-yellow-400 uppercase block text-center">Enter Code</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                                className="w-full px-3 py-2 bg-zinc-900 border-2 border-black shadow-[3px_3px_0_0_#000] outline-none focus:border-yellow-400 text-white text-center tracking-widest font-bold"
                            />
                        </div>
                        <button type="submit" className="w-full px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-0.5 active:shadow-none text-black font-bold uppercase cursor-pointer">
                            Verify & Complete
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}