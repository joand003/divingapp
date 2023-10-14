'use client'
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
import { selectMeetInfoObject, setMeetInfoObject } from "../lib/redux/slices/meetInfoObject/meetInfoObjectSlice";
import { selectDiveMode, setDiveMode } from '@/lib/redux/slices/diveMode/diveModeSlice'


const StartingQuestionsComponent = () => {
    const dispatch = useDispatch();
    const [numberOfDivers, setNumberOfDivers] = useState(0)
    const [selectedMeet, setSelectedMeet] = useState("Select Meet");
    const [judgeMessage, setJudgeMessage] = useState('')
    const [roundMessage, setRoundMessage] = useState('')
    const [diverMessage, setDiverMessage] = useState('')
    const [meetMessage, setMeetMessage] = useState('')
    const numberOfJudges = useSelector(selectNumberOfJudges);
    const totalRounds = useSelector(selectTotalRounds);
    const diveMode = useSelector(selectDiveMode);

    const diverMeetArray = [
        {meet: "Conference Relay", location: "Northdale MS", date: "8/24/23"},
        {meet: "Andover vs Blaine", location: "Northdale MS", date: "8/29/23"},
        {meet: "Andover vs Maple Grove", location: "Maple Grove MS", date: "8/31/23"},
        {meet: "Andover vs Armstrong", location: "Fred Moore", date: "9/7/23"},
        {meet: "Bengal Invite", location: "Northdale MS", date: "9/9/23"},
        {meet: "Andover vs Anoka", location: "Fred Moore", date: "9/14/23"},
        {meet: "Fargo Invite", location: "Hulbert Aquatic Center", date: "9/16/23"},
        {meet: "Anoka vs Rogers", location: "VandenBerge MS", date: "9/21/23"},
        {meet: "Maroon and Gold Invite", location: "Jean K Freeman Aquatic Center", date: "9/23/23"},
        {meet: "Andover vs Elk River", location: "Fred Moore", date: "9/28/23"},
        {meet: "Andover vs Coon Rapids", location: "Fred Moore", date: "10/10/23"},
        {meet: "True Team", location: "Northdale MS", date: "10/14/23"},
        {meet: "Tournament of Champions", location: "TBD", date: "10/17/23"},
        {meet: "True Team State", location: "Jean K Freeman Aquatic Center", date: "10/21/23"},
        {meet: "JV Championship", location: "Northdale MS", date: "10/28/23"},
        {meet: "7AA Section Diving Prelim", location: "Northdale MS", date: "11/10/23"},
        {meet: "7AA Section Diving Finals", location: "Northdale MS", date: "11/11/23"},
        {meet: "State Diving Prelims", location: "Jean K Freeman Aquatic Center", date: "11/16/23"},
        {meet: "State Diving Finals", location: "Jean K Freeman Aquatic Center", date: "11/18/23"}
    ];

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
        if (selectedMeet === "Select Meet") {
            setMeetMessage('Please select a meet')
            return
        } else {
            setMeetMessage('')
        }
        if (numberOfJudges === 0) {
            setJudgeMessage('Please select a number of judges')
            return
        } else {
            setJudgeMessage('')
        }
        if (totalRounds === 0) {
            setRoundMessage('Please select a number of rounds')
            return
        } else {
            setRoundMessage('')
        }
        if (numberOfDivers === 0) {
            setDiverMessage('Please enter a number of divers')
        } else {
            setDiverMessage('')
        }

        if (numberOfJudges === 0 || totalRounds === 0 || numberOfDivers === 0 || selectedMeet === "Select Meet") {
            return
        }

        const judgeArray = judgeArrayBuilder(numberOfDivers, totalRounds, numberOfJudges)
        const diverScoreArray = diverArrayBuilder(0, numberOfDivers, totalRounds)
        const diverCodesArray = diverArrayBuilder('N/A', numberOfDivers, totalRounds)
        const diverDescriptionsArray = diverArrayBuilder('N/A', numberOfDivers, totalRounds)
        const diverDifficultyArray = diverArrayBuilder(0, numberOfDivers, totalRounds)
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
        dispatch(setDiveMode('meetTracker'))
    }

    const handleMeetChange = (e) => {
        dispatch(setMeetInfoObject(diverMeetArray[e.target.options[e.target.selectedIndex].getAttribute('data-index')]))
        setSelectedMeet(e.target.value);
      };


  return (
    <div className='flex justify-center text-center flex-col py-4'>
              <div className='flex justify-center'>
        <select className='text-center' value={selectedMeet} onChange={handleMeetChange} name='MeetSelection'>
          <option value="selectMeet">Select Meet</option>
          {diverMeetArray.map((item, index) => {
            return (
              <option data-index={index} value={`${item.meet} @ ${item.location}, ${item.date}`} key={item.date + index}>
                {item.meet} @ {item.location}, {item.date}
              </option>
            );
          })}
        </select>
        <p>{meetMessage}</p> 
      </div>
        <div className='flex flex-row items-center justify-center text-center py-2'>
            <h3>How many judges today?</h3>
            <div className='flex flex-row justify-start space-x-4 ml-4'> 
            <label><input className='radio' type='radio' name='judgeNumber' value={3} onChange={handleJudgeNumberChange}></input><span className='text-xl pl-1'>3</span></label>
            <label><input className='radio' type='radio' name='judgeNumber' value={5} onChange={handleJudgeNumberChange}></input><span className='text-xl pl-1'>5</span></label>
            <label><input className='radio' type='radio' name='judgeNumber' value={7} onChange={handleJudgeNumberChange}></input><span className='text-xl pl-1'>7</span></label>
            <p>{judgeMessage}</p>
            </div>
        </div>

        <div className='flex justify-center items-center text-center py-2'>
            <h3>Is this a 6 dive competition or an 11 dive competition?</h3>
            <div className='flex flex-row items-center justify-start space-x-4 ml-4'>
            <label><input className='radio' type='radio' name='diveNumber' value={6} onChange={handleTotalRounds}></input><span className='text-xl pl-1'>6</span></label>
            <label><input className='radio' type='radio' name='diveNumber' value={11} onChange={handleTotalRounds}></input><span className='text-xl pl-1'>11</span></label>
            <p>{roundMessage}</p>
            </div>
        </div>
        
        <div className='flex justify-center items-center text-center py-2'>
            <h3 style={{paddingRight: '0.5em'}}>Approximately how many divers are diving today?</h3>
            <input className='lg:w-10 w-3 text-center' placeholder='0' name='diverInput' type='text' onChange={handleNumberOfDivers}></input>
            <p>{diverMessage}</p>
        </div>
        <div>
        <button onClick={handleSubmit}>Start Scoring!</button>
        </div>
    </div>
  )
}

export default StartingQuestionsComponent