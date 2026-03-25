'use client'
import { Button } from '@/components/ui/button'
import { useAuth, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function UpgradeToPro() {

  const { has } = useAuth()
  const { isSignedIn } = useUser()
  const router = useRouter()
  const hasUnlimitedAccess = has({ plan: 'unlimited' })

  // Don't show anything if user already has unlimited access
  if (hasUnlimitedAccess) {
    return null
  }

  // Show login prompt for unauthenticated users
  if (!isSignedIn) {
    return (
      <div className='flex items-center flex-col p-5 border-4 rounded-2xl mt-8'>
        <Image src={'/logo.png'} alt='logo' width={70} height={70}/>
        <h2 className='text-3xl font-game'>Login to Access</h2>
        <p className='font-game text-gray-500 text-xl text-center'>Login to enroll in courses and track your progress</p>
        <Link href={'/sign-in'}>
          <Button variant={'pixel'} className='font-game text-2xl' size={'lg'}>
            Login Now
          </Button>
        </Link>
      </div>
    )
  }

  // Show upgrade prompt for authenticated users without pro access
  return (
    <div className='flex items-center flex-col p-5 border-4 rounded-2xl mt-8'>
      <Image src={'/logo.png'} alt='logo' width={70} height={70}/>
      <h2 className='text-3xl font-game'>Upgrade to Pro</h2>
      <p className='font-game text-gray-500 text-xl text-center'>Join Pro Membership and Get All course access</p>
      <Link href={'/pricing'}>
        <Button variant={'pixel'} className='font-game text-2xl' size={'lg'}>
          Upgrade
        </Button>
      </Link>
    </div>
  )
}

export default UpgradeToPro