'use client'
import React, { useEffect, useState } from "react";
import ScoreButtonComponent from "./ScoreButtonComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  selectJudgeScoresArray,
  setJudgeScoresArray,
} from "../lib/redux/slices/judgeScoresArray/judgeScoresArraySlice";
import {
  selectCurrentDiveRound,
  setCurrentRound,
  increaseCurrentRound,
} from "../lib/redux/slices/currentDiveRound/currentDiveRoundSlice";
import {
  setDiverScoresArray,
  selectDiverScoresArray,
} from "../lib/redux/slices/diverScoresArray/diverScoresArraySlice";
import {
  selectCurrentDiverNumber,
  increaseCurrentDiverNumber,
  setCurrentDiverNumber,
} from "../lib/redux/slices/currentDiverNumber/currentDiverNumberSlice";
import { selectNumberOfJudges } from "../lib/redux/slices/numberOfJudges/numberOfJudgesSlice";
import {
  selectDiverDifficultyArray,
  setDiverDifficultyArray,
} from "../lib/redux/slices/diverDifficultyArray/diverDifficultyArraySlice";
import {
  selectDiverNameArray,
  setDiverNameArray,
} from "../lib/redux/slices/diverNameArray/diverNameArraySlice";
import { selectTotalRounds } from "../lib/redux/slices/totalRounds/totalRoundsSlice";
import {
  selectDiverCodesArray,
  setDiverCodesArray,
} from "../lib/redux/slices/diverCodesArray/diverCodesArraySlice";
import {
  selectDiverDescriptionsArray,
  setDiverDescriptionsArray,
} from "../lib/redux/slices/diverDescriptionsArray/diverDescriptionsArraySlice";
import {
  addNewDiverToArray,
  addJudgesToNewDiver,
} from "../functions/addNewDiver";
import { selectMeetInfoObject } from "../lib/redux/slices/meetInfoObject/meetInfoObjectSlice";
import { setDiveMode } from "@/lib/redux/slices/diveMode/diveModeSlice";
import { setTotalScoresArray } from "@/lib/redux/slices/totalScoresArray/totalScoresArraySlice";
import axios from "axios";
import {useRouter} from "next/navigation";


const JudgeComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSubmited, setIsSubmited] = useState(false);
  const [emailData, setEmailData] = useState(false);
  const [useTotal, setUseTotal] = useState(false);
  const [newTotalScore, setNewTotalScore] = useState('');
  const numberOfJudges = useSelector(selectNumberOfJudges);
  const diverDifficultyArray = useSelector(selectDiverDifficultyArray);
  const judgeScoresArray = useSelector(selectJudgeScoresArray);
  const currentDiveRound = useSelector(selectCurrentDiveRound);
  const currentDiverNumber = useSelector(selectCurrentDiverNumber);
  const diverScoreArray = useSelector(selectDiverScoresArray);
  const totalRounds = useSelector(selectTotalRounds);
  const diverNameArray = useSelector(selectDiverNameArray);
  const diverCodesArray = useSelector(selectDiverCodesArray);
  const diverDescriptionsArray = useSelector(selectDiverDescriptionsArray);
  const meetInfoObject = useSelector(selectMeetInfoObject);

  const dropLowestAndHighestScore = (scoreArray) => {
    scoreArray.sort((a, b) => a - b);
    scoreArray.pop();
    scoreArray.shift();

    return scoreArray;
  };

  useEffect(() => {
    let total = 0;
    let newScore = 0;
    if (numberOfJudges === 3) {
      total =
        judgeScoresArray[currentDiverNumber - 1][currentDiveRound - 1].judge1 +
        judgeScoresArray[currentDiverNumber - 1][currentDiveRound - 1].judge2 +
        judgeScoresArray[currentDiverNumber - 1][currentDiveRound - 1].judge3;
      newScore =
        total *
        diverDifficultyArray[currentDiverNumber - 1][currentDiveRound - 1];
      newScore = Number.parseFloat(newScore).toFixed(2);
      const updatedScoresArray = [...diverScoreArray[currentDiverNumber - 1]];
      updatedScoresArray[currentDiveRound - 1] = newScore;
      const newDiverScoreArray = diverScoreArray.map((array) =>
        array === diverScoreArray[currentDiverNumber - 1]
          ? updatedScoresArray
          : array
      );
      dispatch(setDiverScoresArray(newDiverScoreArray));
    } else if (numberOfJudges === 5) {
      let scoreArray = [];
      for (let i = 0; i < 5; i++) {
        scoreArray.push(
          judgeScoresArray[currentDiverNumber - 1][currentDiveRound - 1][
            "judge" + (i + 1)
          ]
        );
      }
      const droppedScoreArray = dropLowestAndHighestScore(scoreArray);
      const total = droppedScoreArray.reduce((a, b) => a + b, 0);
      newScore =
        total *
        diverDifficultyArray[currentDiverNumber - 1][currentDiveRound - 1];
      newScore = Number.parseFloat(newScore).toFixed(2);
      const updatedScoresArray = [...diverScoreArray[currentDiverNumber - 1]];
      updatedScoresArray[currentDiveRound - 1] = newScore;
      const newDiverScoreArray = diverScoreArray.map((array) =>
        array === diverScoreArray[currentDiverNumber - 1]
          ? updatedScoresArray
          : array
      );
      dispatch(setDiverScoresArray(newDiverScoreArray));
    } else if (numberOfJudges === 7) {
      let scoreArray = [];
      for (let i = 0; i < 7; i++) {
        scoreArray.push(
          judgeScoresArray[currentDiverNumber - 1][currentDiveRound - 1][
            "judge" + (i + 1)
          ]
        );
      }
      const droppedScoreArray = dropLowestAndHighestScore(scoreArray);
      const droppedScoreArray2 = dropLowestAndHighestScore(droppedScoreArray);
      const total = droppedScoreArray2.reduce((a, b) => a + b, 0);
      newScore =
        total *
        diverDifficultyArray[currentDiverNumber - 1][currentDiveRound - 1];
      newScore = Number.parseFloat(newScore).toFixed(2);
      const updatedScoresArray = [...diverScoreArray[currentDiverNumber - 1]];
      updatedScoresArray[currentDiveRound - 1] = newScore;
      const newDiverScoreArray = diverScoreArray.map((array) =>
        array === diverScoreArray[currentDiverNumber - 1]
          ? updatedScoresArray
          : array
      );
      dispatch(setDiverScoresArray(newDiverScoreArray));
    }
    if (useTotal) {
      let newScore = Number(newTotalScore);
    newScore = Number.parseFloat(newScore).toFixed(2);
    const updatedScoresArray = [...diverScoreArray[currentDiverNumber - 1]];
    updatedScoresArray[currentDiveRound - 1] = newScore;
    const newDiverScoreArray = diverScoreArray.map((array) =>
      array === diverScoreArray[currentDiverNumber - 1]
        ? updatedScoresArray
        : array
    );
    dispatch(setDiverScoresArray(newDiverScoreArray));
    }
  }, [
    judgeScoresArray,
    diverDifficultyArray,
    currentDiverNumber,
    currentDiveRound,
    newTotalScore,
  ]);

  useEffect(() => {
    const tempArray = diverScoreArray.map((diver) => {
      return diver.reduce((score, current)=>{
          return (Number(score) + Number(current)).toFixed(2)
      }, 0)
  })
    dispatch(setTotalScoresArray(tempArray))
  }, [diverScoreArray])

  const handleSubmit = async () => {
    if (emailData) {
      try {
        await axios.post("/api/email", {
          message: {
            diverNameArray,
            diverScoreArray,
            diverDifficultyArray,
            diverCodesArray,
            judgeScoresArray,
            meetInfoObject,
          }
        });
      } catch (error) {
        console.log(`error sending email: ${error}`);
      }
    }

    try {
        await axios.post("/api/diveData", {
            data: {
                diverNameArray,
                diverScoreArray,
                diverDifficultyArray,
                diverCodesArray,
                meetInfoObject
            }
        })
        setIsSubmited(true)
    } catch (error) {
        console.log(`error sending data to database: ${error}`)
    }
  };

  const handleRestart = () => {
    setIsSubmited(false)
    dispatch(setCurrentDiverNumber(1))
    dispatch(setCurrentRound(1))
    dispatch(setDiveMode(""))
    router.push('/')
}

  const handleNextDiver = () => {
    setUseTotal(false)
    setNewTotalScore('')
    if (diverScoreArray.length == currentDiverNumber) {
      dispatch(increaseCurrentRound());
      dispatch(setCurrentDiverNumber(1));
    } else {
      dispatch(increaseCurrentDiverNumber());
    }
  };

  const handleAddAnotherDiver = () => {
    // Add them immutably
    let newJudgeArray = [
      ...judgeScoresArray,
      addJudgesToNewDiver(totalRounds, numberOfJudges),
    ];
    dispatch(setJudgeScoresArray(newJudgeArray));
    let newDiverArray = [...diverScoreArray, [0, 0, 0]];
    dispatch(setDiverScoresArray(newDiverArray));
    let newDifficultyArray = [
      ...diverDifficultyArray,
      addNewDiverToArray(totalRounds),
    ];
    dispatch(setDiverDifficultyArray(newDifficultyArray));
    let newCodesArray = [...diverCodesArray, addNewDiverToArray(totalRounds)];
    dispatch(setDiverCodesArray(newCodesArray));
    let newDescriptionsArray = [
      ...diverDescriptionsArray,
      addNewDiverToArray(totalRounds),
    ];
    dispatch(setDiverDescriptionsArray(newDescriptionsArray));
    let newNameArray = [
      ...diverNameArray,
      "Diver " + (diverNameArray.length + 1),
    ];
    dispatch(setDiverNameArray(newNameArray));
  };

  const handleEmail = () => {
    setEmailData(!emailData);
  }

  const handleUseTotalScore = () => {
    setUseTotal(!useTotal);
  }

  const handleTotalScore = (e) => {
    setNewTotalScore(e.target.value)
  }




  return (
    <div className="mb-4 text-center">
      <p>Would you prefer to just enter the total score? <input className="w-4" name="usetotalScore" type="checkbox" checked={useTotal} onChange={handleUseTotalScore}/></p>
      {useTotal ? (<div>
        <label htmlFor="totalScoreInput">Score: </label><input placeholder="score" className="w-20" name="totalScoreInput" onChange={handleTotalScore} value={newTotalScore}/>
        </div>)
         : ("")}
      {Object.entries(
        judgeScoresArray[currentDiverNumber - 1][currentDiveRound - 1]
      ).map(([key, value], index) => {
        return (
          <div className="font-normal mt-4" key={key}>
            <h4 className="mb-0">
              Judge {index + 1} score:{" "}
              <span className="font-normal">{value}</span>
            </h4>
            <ScoreButtonComponent judgeNumber={index + 1} />
          </div>
        );
      })}
      <h4>
        Total:{" "}
        <span className="font-normal">
          {diverScoreArray[currentDiverNumber - 1][currentDiveRound - 1]}
        </span>
      </h4>
      <div className="flex justify-center space-x-4">
      {diverScoreArray.length == currentDiverNumber &&
      currentDiveRound == totalRounds && !isSubmited ? (
        <div><button onClick={handleSubmit}>Submit</button> <div className="inline pl-4"><input onChange={handleEmail} className="w-4" type="checkbox" name="emailResults" /><label className="pl-2" htmlFor="emailResults">email results?</label></div></div>
      ) : (
        ""
      )}
      {diverScoreArray.length > currentDiverNumber &&
      currentDiveRound <= totalRounds ? (
        <button onClick={handleNextDiver}>Next Diver</button>
      ) : (
        ""
      )}
      {diverScoreArray.length == currentDiverNumber &&
      currentDiveRound < totalRounds ? (
        <button onClick={handleNextDiver}>Next Round</button>
      ) : (
        ""
      )}
      {diverScoreArray.length == currentDiverNumber &&
      currentDiveRound === 1 ? (
        <button onClick={handleAddAnotherDiver}>Add diver</button>
      ) : (
        ""
      )}
      {isSubmited ? (<button onClick={handleRestart}>Restart</button>) : ("")}
      </div>
    </div>
  );
};

export default JudgeComponent;