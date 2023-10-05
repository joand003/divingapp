'use client'; 
import React from 'react';
import DiveSelectionComponent from '../Components/DiveSelectionComponent';
import JudgeComponent from '../Components/JudgeComponent';
import TestComponent from '../Components/TestComponent';
import StartingQuestionsComponent from '../Components/StartingQuestionsComponent';
import ResultsTableComponent from '../Components/ResultsTableComponent';
import { useSelector } from 'react-redux';
import { selectDiverNameArray } from '../lib/redux/slices/diverNameArray/diverNameArraySlice';



export default function Home() {
  const diverNameArray = useSelector(selectDiverNameArray);

  return (
      <div className="main">
          <TestComponent />
          <h1>Diving App</h1>
            {diverNameArray.length === 0 ? <StartingQuestionsComponent /> : ''}
            {diverNameArray.length === 0 ? '' : <DiveSelectionComponent />}
            {diverNameArray.length === 0 ? '' : <JudgeComponent />}
            {/* If current round = length of diver array add reset button to delete and start new, but include a warning are you sure before executing */}
          <hr></hr>
          {diverNameArray.length === 0 ? '' :  <ResultsTableComponent />}
      </div>
  )
}
