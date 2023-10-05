import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectNumberOfJudges, setNumberOfJudges } from '../lib/redux/slices/numberOfJudges/numberOfJudgesSlice'
import { selectTotalRounds, setTotalRounds } from '../lib/redux/slices/totalRounds/totalRoundsSlice'
import { setDiverNameArray } from '../lib/redux/slices/diverNameArray/diverNameArraySlice'
import { setDiverScoresArray } from '../lib/redux/slices/diverScoresArray/diverScoresArraySlice'
import { setDiverCodesArray } from '../lib/redux/slices/diverCodesArray/diverCodesArraySlice'
import { setDiverDescriptionsArray } from '../lib/redux/slices/diverDescriptionsArray/diverDescriptionsArraySlice'
import { setDiverDifficultyArray } from '../lib/redux/slices/diverDifficultyArray/diverDifficultyArraySlice'
import { setJudgeScoresArray } from '../lib/redux/slices/judgeScoresArray/judgeScoresArraySlice'
import judgeArrayBuilder from '../functions/judgeArrayBuilder'
import diverArrayBuilder from '../functions/diverArrayBuilder'


const StartingQuestionsComponent = () => {
    const dispatch = useDispatch();
    const [numberOfDivers, setNumberOfDivers] = useState(0)
    const [judgeMessage, setJudgeMessage] = useState('')
    const [roundMessage, setRoundMessage] = useState('')
    const [diverMessage, setDiverMessage] = useState('')
    const numberOfJudges = useSelector(selectNumberOfJudges);
    const totalRounds = useSelector(selectTotalRounds);

    const handleJudgeNumberChange = (e) => {
        dispatch(setNumberOfJudges(parseInt(e.target.value)))
        setJudgeMessage('')
    }

    const handleTotalRounds = (e) => {
        dispatch(setTotalRounds(parseInt(e.target.value)))
        setRoundMessage('')
    }

    const handleNumberOfDivers = (e) => {
        setNumberOfDivers(parseInt(e.target.value))
        setDiverMessage('')
    }

    const handleSubmit = () => {
        if (numberOfJudges === 0) {
            setJudgeMessage('Please select a number of judges')
            return
        }
        if (totalRounds === 0) {
            setRoundMessage('Please select a number of rounds')
            return
        }
        if (numberOfDivers === 0) {
            setDiverMessage('Please enter a number of divers')
            return
        }

        const judgeArray = judgeArrayBuilder(numberOfDivers, totalRounds, numberOfJudges)
        const diverScoreArray = diverArrayBuilder(numberOfDivers, totalRounds)
        const diverCodesArray = diverArrayBuilder(numberOfDivers, totalRounds)
        const diverDescriptionsArray = diverArrayBuilder(numberOfDivers, totalRounds)
        const diverDifficultyArray = diverArrayBuilder(numberOfDivers, totalRounds)
        let nameArray = []
        for (let i = 0; i < numberOfDivers; i++) {

            nameArray.push('Diver ' + (i + 1))
        }

        dispatch(setJudgeScoresArray(judgeArray))
        dispatch(setDiverScoresArray(diverScoreArray))
        dispatch(setDiverCodesArray(diverCodesArray))
        dispatch(setDiverDescriptionsArray(diverDescriptionsArray))
        dispatch(setDiverDifficultyArray(diverDifficultyArray))
        dispatch(setDiverNameArray(nameArray))
    }


  return (
    <div>
        
        <div className='containerLeft'>
            <h3>How many judges today?</h3> {numberOfJudges}
            <label><input type='radio' name='judgeNumber' value={3} onChange={handleJudgeNumberChange}></input>3</label>
            <label><input type='radio' name='judgeNumber' value={5} onChange={handleJudgeNumberChange}></input>5</label>
            <label><input type='radio' name='judgeNumber' value={7} onChange={handleJudgeNumberChange}></input>7</label>
            <p>{judgeMessage}</p>
        </div>
        
        <div className='containerLeft'>
            <h3>Is this a 6 dive competition or an 11 dive competition?</h3> {totalRounds}
            <label><input type='radio' name='diveNumber' value={6} onChange={handleTotalRounds}></input>6</label>
            <label><input type='radio' name='diveNumber' value={11} onChange={handleTotalRounds}></input>11</label>
            <p>{roundMessage}</p>
        </div>
        
        <div className='containerLeft'>
            <h3 style={{paddingRight: '0.5em'}}>Approximately how many divers are diving today?</h3> {numberOfDivers}
            <input style={{width: '2em'}} placeholder='0' name='diverInput' type='text' onChange={handleNumberOfDivers}></input>
            <p>{diverMessage}</p>
        </div>
        <button onClick={handleSubmit}>Start Scoring!</button>
    </div>
  )
}

export default StartingQuestionsComponent