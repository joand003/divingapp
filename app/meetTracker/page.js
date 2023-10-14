"use client";
import React, { useEffect } from "react";
import DiveSelectionComponent from "../../Components/DiveSelectionComponent";
import JudgeComponent from "../../Components/JudgeComponent";
import StartingQuestionsComponent from "../../Components/StartingQuestionsComponent";
import ResultsTableComponent from "../../Components/ResultsTableComponent";
import { useSelector, useDispatch } from "react-redux";
import { selectDiveMode } from "@/lib/redux/slices/diveMode/diveModeSlice";
import { setUserObject } from "@/lib/redux/slices/userObject/userObjectSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const diveMode = useSelector(selectDiveMode);

  useEffect(() => {
    async function fetchData() {
      const user = await axios.get("/api/getUserInfo");

      if (user.data.error === "User not logged in") {
        router.push("/login");
      }

      dispatch(
        setUserObject({ username: user.data.username, email: user.data.email })
      );
    }
    fetchData();
  });

  return (
    <div className="flex flex-col justify-center pt-6">
      <h1 className="text-center">Diving App</h1>
      {diveMode === "meetTracker" ? '' : <StartingQuestionsComponent />}
      {diveMode === "meetTracker" ? <DiveSelectionComponent /> : ""}
      {diveMode === "meetTracker" ? <JudgeComponent /> : ""}
      {diveMode === "meetTracker" ? <hr></hr> : ""}
      {diveMode === "meetTracker" ? <ResultsTableComponent /> : ""}
    </div>
  );
}
