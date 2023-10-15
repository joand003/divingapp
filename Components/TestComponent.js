'use client'
import React, { useState } from "react";
import judgeArrayBuilder from "../functions/judgeArrayBuilder";
import {
  selectJudgeScoresArray,
  setJudgeScoresArray,
} from "../lib/redux/slices/judgeScoresArray/judgeScoresArraySlice";
import { useSelector, useDispatch } from "react-redux";
import ScoreButtonComponent from "./ScoreButtonComponent";
import {
  addJudgesToNewDiver,
  addNewDiverToArray,
} from "../functions/addNewDiver";
import { selectDiverScoresArray } from "../lib/redux/slices/diverScoresArray/diverScoresArraySlice";
import axios from "axios";
import diverArrayBuilder from "@/functions/diverArrayBuilder";

const TestComponent = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const judgeScores = useSelector(selectJudgeScoresArray);
  const diverScores = useSelector(selectDiverScoresArray);
  const judgeArray = judgeArrayBuilder(4, 6, 6);
  // const judgeScoreObject = judgeArray[0][0]
  // const currentDiveRound = 1
  // const currentDiverNumber = 1

  const sampleArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const totalScoresArray = sampleArray.map((diver, index) => {
    return diver.reduce((score, current) => {
      return score + current;
    }, 0);
  });

  const handleOnChange = (e) => {
    setValue(e.target.value);
    console.log(`datavalue: ${e.target.options[e.target.selectedIndex].getAttribute('data-index')}`);   
  };

  return (
    <div>
      TestComponent
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
      <select value="options" name='diverOptionsTEST' onChange={handleOnChange}>
        <option value="options">Options</option>
        {sampleArray.map((diver, index) => {
          return (
            <option data-index={index} key={index} value={totalScoresArray[index]}>
              Diver {diver + 1} score: {totalScoresArray[index]}: {index}
            </option>
          );
        })}
      </select>
      <p>Value: {value}</p>

{/* Testing buttons */}
        <button onClick={async()=> {
         try {
          const response = await axios.post("/api/sgTest", {
            message: {
              diverNameArray: ['diver1', 'diver2', 'diver3'],
              diverScoreArray: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
              diverDifficultyArray: [1, 2, 3],
              diverCodesArray: [1, 2, 3],
              judgeScoresArray: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
              meetInfoObject: {
                date: 'date',
                location: 'location',
                meet: 'meet'
              }
            }
          });
          console.log(response);
        } catch (error) {
          console.log(`error sending email: ${error}`);
        }   
        }}>test email</button>

    </div>
  );
};

export default TestComponent;
