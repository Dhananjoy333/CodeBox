'use client'

import { useClerk } from "@clerk/nextjs"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SignInPage() {
    const { client, setActive, loaded } = useClerk()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    if (!loaded) return null // This replaces isLoaded

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            // Using the client directly is safer in v7
            const result = await client.signIn.create({
                identifier: email,
                password,
            })

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId })
                router.push("/")
            }
        } catch (err: any) {
            setError(err.errors?.[0]?.message || "Incorrect email or password")
        }
    }

    const signInWithGoogle = () => {
        client.signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/",
        })
    }

  return (
        <div className="min-h-screen grid w-full items-center bg-zinc-100 px-4 font-mono text-sm">
            <div className="mx-auto w-full sm:w-96 space-y-6 bg-white px-4 py-8 border-4 border-black shadow-[8px_8px_0_0_#000]">
                {/* Your Original Header */}
                <header className="text-center flex flex-col items-center">
                    <Image src={'/logo.png'} alt="logo" width={40} height={40}/>
                    <h1 className="mt-3 text-base font-bold tracking-wide text-black uppercase font-game">
                        Sign in to Clover
                    </h1>
                </header>

                {error && <p className="text-xs text-red-500 font-bold uppercase">{error}</p>}

                {/* Google Button */}
                <button
                    onClick={signInWithGoogle}
                    type="button"
                    className="flex w-full items-center justify-center gap-3 px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-0.5 active:shadow-none font-bold text-black cursor-pointer"
                >
                    Login with Google
                </button>

                <div className="relative flex items-center py-2 text-black">
                    <div className="grow border-t-2 border-black"></div>
                    <span className="shrink mx-4 font-bold uppercase">OR</span>
                    <div className="grow border-t-2 border-black"></div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="font-bold text-black uppercase block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-white border-2 border-black shadow-[3px_3px_0_0_#000] outline-none focus:border-yellow-500 text-black"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="font-bold text-black uppercase block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-white border-2 border-black shadow-[3px_3px_0_0_#000] outline-none focus:border-yellow-500 text-black"
                            required
                        />
                    </div>
                    <div id="clerk-captcha"></div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-0.5 active:shadow-none text-black font-bold uppercase cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-xs text-black">
                    No account?{' '}
                    <button
                        onClick={() => router.push('/sign-up')}
                        className="font-bold underline underline-offset-2 hover:text-yellow-600 cursor-pointer"
                    >
                        Create an account
                    </button>
                </p>
            </div>
        </div>
    )
}
