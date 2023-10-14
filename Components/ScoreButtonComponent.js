import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setJudgeScoresArray, selectJudgeScoresArray } from '../lib/redux/slices/judgeScoresArray/judgeScoresArraySlice'
import { selectCurrentDiveRound } from '../lib/redux/slices/currentDiveRound/currentDiveRoundSlice'
import { selectCurrentDiverNumber } from '../lib/redux/slices/currentDiverNumber/currentDiverNumberSlice'

const ScoreButtonComponent = (judgeNumber) => {
    const dispatch = useDispatch();
    const judgeScores = useSelector(selectJudgeScoresArray);
    const currentDiveRound = useSelector(selectCurrentDiveRound);
    const currentDiverNumber = useSelector(selectCurrentDiverNumber);


    const handleJudgeScoreChange = (e) => {
        const judgeName = 'judge' + judgeNumber.judgeNumber
        const updatedObject = { ...judgeScores[currentDiverNumber-1][currentDiveRound - 1]}
        updatedObject[judgeName] = parseInt(e.target.value)
        const newJudgeScores = judgeScores[currentDiverNumber-1].map(obj => obj === judgeScores[currentDiverNumber-1][currentDiveRound - 1] ? updatedObject : obj)
        const finalArray = judgeScores.map(array => array === judgeScores[currentDiverNumber-1] ? newJudgeScores : array)
        dispatch(setJudgeScoresArray(finalArray))
    }
    
    const handleAddHalfJudgeScoreChange = (e) => {
        const judgeName = 'judge' + judgeNumber.judgeNumber
        const newScore = judgeScores[currentDiverNumber-1][currentDiveRound - 1][judgeName] + parseFloat(e.target.value)
        const updatedObject = { ...judgeScores[currentDiverNumber-1][currentDiveRound - 1]}
        updatedObject[judgeName] = newScore
        const newJudgeScores = judgeScores[currentDiverNumber-1].map(obj => obj === judgeScores[currentDiverNumber-1][currentDiveRound - 1] ? updatedObject : obj)
        const finalArray = judgeScores.map(array => array === judgeScores[currentDiverNumber-1] ? newJudgeScores : array)
        dispatch(setJudgeScoresArray(finalArray))
    }

  return (
    <div className='flex space-x-2 justify-center flex-wrap'>
        <button onClick={handleJudgeScoreChange} value={0}>
            0
        </button>
        <button onClick={handleJudgeScoreChange} value={1}>
            1
        </button>
        <button onClick={handleJudgeScoreChange} value={2}>
            2
        </button>
        <button onClick={handleJudgeScoreChange} value={3}>
            3
        </button>
        <button onClick={handleJudgeScoreChange} value={4}>
            4
        </button>
        <button onClick={handleJudgeScoreChange} value={5}>
            5
        </button>
        <button onClick={handleJudgeScoreChange} value={6}>
            6
        </button>
        <button onClick={handleJudgeScoreChange} value={7}>
            7
        </button>
        <button onClick={handleAddHalfJudgeScoreChange} value={0.5}>
            add 0.5
        </button>
    </div>
  )
}

export default ScoreButtonComponent


// const handleJudgeScoreChange = (e) => {
//     const judgeName = 'judge' + judgeNumber.judgeNumber
//     const updatedObject = { ...judgeScores[currentDiveRound - 1]}
//     updatedObject[judgeName] = parseInt(e.target.value)
//     const newJudgeScores = judgeScores.map(obj => obj === judgeScores[currentDiveRound - 1] ? updatedObject : obj)

//     dispatch(setJudgeScoresArray(newJudgeScores))
// }

// const handleAddHalfJudgeScoreChange = (e) => {
//     const judgeName = 'judge' + judgeNumber.judgeNumber
//     const newScore = judgeScores[currentDiveRound - 1][judgeName] + parseFloat(e.target.value)
//     const updatedObject = { ...judgeScores[currentDiveRound - 1]}
//     updatedObject[judgeName] = newScore
//     const newJudgeScores = judgeScores.map(obj => obj === judgeScores[currentDiveRound - 1] ? updatedObject : obj)
//     dispatch(setJudgeScoresArray(newJudgeScores))
// }
