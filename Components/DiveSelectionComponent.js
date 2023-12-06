'use client';  
import React, { useState, useEffect } from "react";
import divelist from "../functions/divelist";
import { useSelector, useDispatch } from "react-redux";
import {
  setDiverCodesArray,
  selectDiverCodesArray,
} from "../lib/redux/slices/diverCodesArray/diverCodesArraySlice";
import {
  setDiverDifficultyArray,
  selectDiverDifficultyArray,
} from "../lib/redux/slices/diverDifficultyArray/diverDifficultyArraySlice";
import {
  setDiverDescriptionsArray,
  selectDiverDescriptionsArray,
} from "../lib/redux/slices/diverDescriptionsArray/diverDescriptionsArraySlice";
import { selectCurrentDiveRound } from "../lib/redux/slices/currentDiveRound/currentDiveRoundSlice";
import {
  selectCurrentDiverNumber,
} from "../lib/redux/slices/currentDiverNumber/currentDiverNumberSlice";
import {
  selectDiverNameArray,
} from "../lib/redux/slices/diverNameArray/diverNameArraySlice";
import { selectTotalRounds } from "@/lib/redux/slices/totalRounds/totalRoundsSlice";
import DiverNameComponent from "./DiverNameComponent";
import { selectDiveMode } from "@/lib/redux/slices/diveMode/diveModeSlice";

const DiveSelectionComponent = () => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState("Select Difficulty");
  const [selectedCode, setSelectedCode] = useState("Select Dive");
  const dispatch = useDispatch();
  const diveMode = useSelector(selectDiveMode);
  const diverCodesArray = useSelector(selectDiverCodesArray);
  const diverDifficultyArray = useSelector(selectDiverDifficultyArray);
  const diverDescriptionsArray = useSelector(selectDiverDescriptionsArray);
  const currentDiveRound = useSelector(selectCurrentDiveRound);
  const currentDiverNumber = useSelector(selectCurrentDiverNumber);
  const diverNameArray = useSelector(selectDiverNameArray);
  const totalRounds = useSelector(selectTotalRounds);
  const diveListArray = divelist;
  const difficultyArray = [
    1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6,
    2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9,
  ];

  const diveCodeArray = diveListArray.map((dive) => {
    return dive.dive;
  });

  const handleCodeChange = (e) => {
    setSelectedCode(e.target.value);
    const dataArrayCodes = [...diverCodesArray[currentDiverNumber - 1]];
    dataArrayCodes[currentDiveRound - 1] = e.target.value;
    const newArrayCodes = diverCodesArray.map((array) =>
      array === diverCodesArray[currentDiverNumber - 1] ? dataArrayCodes : array
    );
    dispatch(setDiverCodesArray(newArrayCodes));

    const diveObject = diveListArray.find((dive) => {
      return dive.dive === e.target.value;
    });

    setSelectedDifficulty(diveObject.difficulty);
    const dataArrayDifficulty = [
      ...diverDifficultyArray[currentDiverNumber - 1],
    ];
    dataArrayDifficulty[currentDiveRound - 1] = diveObject.difficulty;
    const newArrayDifficulty = diverDifficultyArray.map((array) =>
      array === diverDifficultyArray[currentDiverNumber - 1]
        ? dataArrayDifficulty
        : array
    );
    dispatch(setDiverDifficultyArray(newArrayDifficulty));

    const dataArrayDescription = [
      ...diverDescriptionsArray[currentDiverNumber - 1],
    ];
    dataArrayDescription[currentDiveRound - 1] = diveObject.description;
    const newArrayDescription = diverDescriptionsArray.map((array) =>
      array === diverDescriptionsArray[currentDiverNumber - 1]
        ? dataArrayDescription
        : array
    );
    dispatch(setDiverDescriptionsArray(newArrayDescription));
  };
  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
    const dataArrayDifficulty = [
      ...diverDifficultyArray[currentDiverNumber - 1],
    ];
    dataArrayDifficulty[currentDiveRound - 1] = e.target.value;
    const newArrayDifficulty = diverDifficultyArray.map((array) =>
      array === diverDifficultyArray[currentDiverNumber - 1]
        ? dataArrayDifficulty
        : array
    );
    dispatch(setDiverDifficultyArray(newArrayDifficulty));
  };

  useEffect(() => {
    setSelectedCode("Select Dive");
    setSelectedDifficulty("Select Difficulty");
  }, [currentDiverNumber, currentDiveRound]);

  return (
    <div className="text-center">
      {diveMode === 'meetTracker' ? <DiverNameComponent />: ''}
      {diveMode === 'meetTracker' ? <div className="container">
        <h2 style={{ marginTop: 0 }}>
          Dive Round:{" "}
          <span className="font-normal" style={{ paddingRight: "1em" }}>
            {currentDiveRound}/{totalRounds}
          </span>{" "}
          Diver #:{" "}
          <span className="font-normal">
            {currentDiverNumber}/{diverNameArray.length}
          </span>
        </h2>
      </div> : ''}
      <div className="flex space-x-12 justify-center">
        <select value={selectedCode} onChange={handleCodeChange} name="diveCodeSelector">
          <option value="Select Dive" disabled>
            Select Dive
          </option>
          {diveCodeArray.map((diveCode) => {
            return (
              <option value={diveCode} key={diveCode}>
                {diveCode}
              </option>
            );
          })}
        </select>
        <select
          value={selectedDifficulty}
          className="paddingLeft"
          onChange={handleDifficultyChange}
          name="difficultySelector"
        >
          <option value="Select Difficulty" disabled>
            Select Difficulty
          </option>
          {difficultyArray.map((difficulty) => {
            return (
              <option value={difficulty} key={difficulty}>
                {difficulty}
              </option>
            );
          })}
        </select>
      </div>
      <h3>
        Current Dive:{" "}
        <span className="font-normal">
          {diverCodesArray[currentDiverNumber - 1][currentDiveRound - 1]}
        </span>{" "}
        <span className="font-normal px-5">-</span> Difficulty:{" "}
        <span className="font-normal">
          {diverDifficultyArray[currentDiverNumber - 1][currentDiveRound - 1]}
        </span>
      </h3>
      <p>
        <span className="font-bold">Description:</span>{" "}
        {diverDescriptionsArray[currentDiverNumber - 1][currentDiveRound - 1]}
      </p>
    </div>
  );
};

export default DiveSelectionComponent;
