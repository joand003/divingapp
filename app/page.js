'use client'; 
import React, {useEffect} from 'react';
import DiveSelectionComponent from '../Components/DiveSelectionComponent';
import JudgeComponent from '../Components/JudgeComponent';
import TestComponent from '../Components/TestComponent';
import StartingQuestionsComponent from '../Components/StartingQuestionsComponent';
import ResultsTableComponent from '../Components/ResultsTableComponent';
import { useSelector } from 'react-redux';
import { selectDiverNameArray } from '../lib/redux/slices/diverNameArray/diverNameArraySlice';
import { useRouter } from 'next/navigation';
import { selectUserObject, setUserObject } from '../lib/redux/slices/userObject/userObjectSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import { selectDiveMode, setDiveMode } from '@/lib/redux/slices/diveMode/diveModeSlice';



export default function Home() {


  return (
    <div className='px-48 text-center '>
      <h1 className="flex flex-col justify-center pt-12">
          Diving App
      </h1>
      <p className='pt-6 pb-12'>*** Please select a mode to get started. ***</p>
      <Link href='/diveCalculator'><h3 className=''>The Diving calculator</h3>
      <p className='py-2'>This calculator will allow you to calculate the score of a dive.</p>
      <p className='italic'>Note: fThis will not save your dives.</p></Link>
      <Link href='/meetTracker'><h3 className='pt-12'>Meet Tracker</h3>
      <p className='py-2'>This calculator will allow you to save the dive information for all your dives during a meet for any number of divers.</p>
      <p className='italic pb-4'>Note: You will have to sign in before you can use this as it will email and save your results to your own database.</p></Link>
      <p>Coming Soon!</p>
      <p>Be able to sort and analyze your dives from the databas.</p>
    </div>
  )
}
