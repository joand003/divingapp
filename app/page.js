import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='lg:px-48 text-center '>
      <h1 className="flex flex-col justify-center pt-12">
          Diving App
      </h1>
      <Link href='/diveCalculator'><h3 className=''>The Diving calculator</h3>
      <p className='py-2'>This calculator will allow you to calculate the score of a dive.</p>
      <p className='italic'>Note: This will not save your dives.</p></Link>
      <Link href='/meetTracker'><h3 className='pt-12'>Meet Tracker</h3>
      <p className='py-2'>This calculator will allow you to save the dive information for all your dives during a meet for any number of divers.</p>
      <p className='italic pb-4'>Note: You will have to sign in before you can use this as it will email and save your results to your own database.</p></Link>
    </div>
  )
}
