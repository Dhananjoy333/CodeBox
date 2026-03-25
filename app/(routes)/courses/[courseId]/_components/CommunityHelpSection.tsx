'use client'
import { Button } from "@/components/ui/button"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function CommunityHelpSection() {
  const { isSignedIn } = useUser()
  const router = useRouter()

  const handleCommunityClick = () => {
    if (!isSignedIn) {
      router.push('/sign-in')
    } else {
      router.push('/community')
    }
  }

  return (
    <div className="font-game p-4 border-4 rounded-xl mt-7 flex items-center flex-col gap-4">
      <h2 className='text-3xl'>Need Help?</h2>
      <p className="text-2xl text-center">Ask question in our community</p>
      <Button 
        className="text-2xl mt-3" 
        variant={'pixel'} 
        size={'lg'}
        onClick={handleCommunityClick}
      >
        {!isSignedIn ? 'Login to Join Community' : 'Go to Community'}
      </Button>
    </div>
  )
}

export default CommunityHelpSection