import { PricingTable } from '@clerk/nextjs'

function Pricing() {
  return (
    <div className='mt-28 w-full px-72 flex flex-col items-center justify-center text-4xl'>
        <h2 className='text-4xl text-center font-game'>Pricing</h2>
        <h2 className='text-xl text-center font-game'>Join For Unlimited Access to all features and courses</h2>
        <div className='w-250 font-mono'>
        <PricingTable />
        </div>
    </div>
  )
}

export default Pricing