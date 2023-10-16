'use client'
import React from 'react'
import JudgeComponent from '@/Components/JudgeComponent'
import DiveSelectionComponent from '@/Components/DiveSelectionComponent'
import { setNumberOfJudges } from '@/lib/redux/slices/numberOfJudges/numberOfJudgesSlice' 
import { useSelector, useDispatch } from 'react-redux';
import { setJudgeScoresArray } from '@/lib/redux/slices/judgeScoresArray/judgeScoresArraySlice';
import { selectDiveMode, setDiveMode } from '@/lib/redux/slices/diveMode/diveModeSlice'
import { setDiverScoresArray } from '@/lib/redux/slices/diverScoresArray/diverScoresArraySlice'
import { setDiverNameArray } from '@/lib/redux/slices/diverNameArray/diverNameArraySlice'
import { setDiverDescriptionsArray } from '@/lib/redux/slices/diverDescriptionsArray/diverDescriptionsArraySlice'
import { setDiverCodesArray } from '@/lib/redux/slices/diverCodesArray/diverCodesArraySlice'
import { setDiverDifficultyArray } from '@/lib/redux/slices/diverDifficultyArray/diverDifficultyArraySlice'
import diverArrayBuilder from '@/functions/diverArrayBuilder'
import judgeArrayBuilder from '@/functions/judgeArrayBuilder'

export default function DiveCalculator () {
    const dispatch = useDispatch();
    const diveMode = useSelector(selectDiveMode);


    const handleJudgeNumberChange = (e) => {
        dispatch(setJudgeScoresArray(judgeArrayBuilder(2, 6, Number(e.target.value))))
        dispatch(setNumberOfJudges(Number(e.target.value)))
        dispatch(setDiverScoresArray(diverArrayBuilder(0, 2, 6)))
        dispatch(setDiverNameArray(diverArrayBuilder('Diver', 2, 6)))
        dispatch(setDiverDescriptionsArray(diverArrayBuilder('N/A', 2, 6)))
        dispatch(setDiverCodesArray(diverArrayBuilder('N/A', 2, 6)))
        dispatch(setDiverDifficultyArray(diverArrayBuilder('N/A', 2, 6)))
        dispatch(setDiveMode('diveCalculator'))
    }

  return (
    <div className='pb-10'>
        <h1 className='text-4xl text-center py-6'>Dive Calculator</h1>
        <p className='lg:px-48 italic pb-6'>To get started just click the number of judges. Note: This calculator will not save your dive information, to save all dives for a meet please go to the meet tracker.</p>
        <div className='flex flex-row items-center justify-center text-center py-2'>
            <h3>Please select the number of judges scoring.</h3>
            <div className='flex flex-row justify-start space-x-4 ml-4'> 
            <label><input className='radio' type='radio' name='judgeNumber' value={3} onChange={handleJudgeNumberChange}></input><span className='text-xl pl-1'>3</span></label>
            <label><input className='radio' type='radio' name='judgeNumber' value={5} onChange={handleJudgeNumberChange}></input><span className='text-xl pl-1'>5</span></label>
            <label><input className='radio' type='radio' name='judgeNumber' value={7} onChange={handleJudgeNumberChange}></input><span className='text-xl pl-1'>7</span></label>
            </div>
        </div>
        {diveMode === 'diveCalculator' ? <DiveSelectionComponent /> : ''}
        {diveMode === 'diveCalculator' ? <JudgeComponent /> : ''}
    </div>
  )
}
