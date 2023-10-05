import React from 'react'
import  judgeArrayBuilder  from '../functions/judgeArrayBuilder'
import { selectJudgeScoresArray, setJudgeScoresArray } from '../lib/redux/slices/judgeScoresArray/judgeScoresArraySlice'
import { useSelector, useDispatch } from 'react-redux'
import ScoreButtonComponent from './ScoreButtonComponent'
import { addJudgesToNewDiver, addNewDiverToArray } from '../functions/addNewDiver'
import { selectDiverScoresArray } from '../lib/redux/slices/diverScoresArray/diverScoresArraySlice'

const TestComponent = () => {
    const dispatch = useDispatch();
    const judgeScores = useSelector(selectJudgeScoresArray);
    const diverScores = useSelector(selectDiverScoresArray);
    const judgeArray = judgeArrayBuilder(4, 6, 6)
    // const judgeScoreObject = judgeArray[0][0]
    // const currentDiveRound = 1
    // const currentDiverNumber = 1

    const sampleArray = [ [1,2,3], [4,5,6], [7,8,9] ]


    const totalScoresArray = sampleArray.map((diver, index) => {
        return diver.reduce((score, current)=>{
            return score + current
        }, 0)
    })


  return (
    <div>TestComponent
        {/* {
            Object.entries(judgeScores[currentDiverNumber-1][currentDiveRound-1]).map(([key, value], index) => {
                return (
                    <div className='smallContainer' key={key}>
                        <h4>Judge {index + 1} score: {value}</h4>   
                        <ScoreButtonComponent judgeNumber={index + 1}/>
                        <button>button</button>
                    </div>
                )
            })
        } */}


        <button onClick={()=> console.log(totalScoresArray)}>console.log</button>
        <button onClick={()=> {
            const judgeArray = judgeArrayBuilder(4, 6, 6)
            console.log(judgeArray)
            dispatch(setJudgeScoresArray(judgeArray))
        }}>initialize</button>
        <button onClick={()=> {
                let newArray = [...judgeScores]
                newArray.pop()
                dispatch(setJudgeScoresArray(newArray))
        }}>test</button>
    </div>
  )
}

export default TestComponent