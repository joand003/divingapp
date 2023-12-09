"use client";
import React, { useState } from "react";
import { selectMeetInfoObject, setMeetInfoObject } from "../../lib/redux/slices/meetInfoObject/meetInfoObjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { girlsMeetArray2324, boysMeetArray2324 } from "@/functions/meetArrays";

export default function MeetSelectionComponent({
    selectedMeet,
    setSelectedMeet,
    meetMessage,
}) {
    const dispatch = useDispatch();
    const [diverMeetArray, setDiverMeetArray] = useState([]);
    const [meetArrays, setMeetArrays] = useState([girlsMeetArray2324, boysMeetArray2324]);
    const [meetArrayNames, setMeetArrayNames] = useState(["Andover Girls 2023-24", "Andover Boys 2023-24"]);
    const [selectedMeetName, setSelectedMeetName] = useState("");
    const [meetName, setMeetName] = useState("");
    const [meetLocation, setMeetLocation] = useState("");
    const [meetDate, setMeetDate] = useState("");
    const meetInfoObject = useSelector(selectMeetInfoObject);

    const handleMeetChange = (e) => {
        dispatch(
            setMeetInfoObject(
                diverMeetArray[
                    e.target.options[e.target.selectedIndex].getAttribute(
                        "data-index"
                    )
                ]
            )
        );
        setSelectedMeet(e.target.value);
    };

    const handleSelectedMeetArray = (e) => {
        setSelectedMeetName(e.target.value);
        setDiverMeetArray(meetArrays[e.target.options[e.target.selectedIndex].getAttribute("data-index")]);
        setSelectedMeet("Select Meet");
        dispatch(setMeetInfoObject({}));
    }

    const handleCreateMeet = () => {
        let newMeetObject = {...meetInfoObject};
        newMeetObject.meet = meetName;
        newMeetObject.location = meetLocation;
        newMeetObject.date = meetDate;
        dispatch(setMeetInfoObject(newMeetObject));
    }

    return (
        <div className="flex justify-center flex-col w-fit items-center">
            <p>{meetMessage}</p>
            <div className="flex flex-row space-x-16">
                <div className="flex flex-col text-center items-center">
                    <h2 className="text-center">Select a Scheduled Meet</h2>
                <select
                    className="text-center my-2 rounded-lg"
                    value={selectedMeetName}
                    onChange={handleSelectedMeetArray}
                    name="meetArraySelection"
                >
                    {!selectedMeetName && <option value="selectMeetArray">Select Dive Season</option>}
                    {meetArrayNames.map((item, index) => {
                        return (
                            <option
                                data-index={index}
                                value={item}
                                key={index}
                            >
                                {item}
                            </option>
                        )
                    })}
                </select>
                <select
                className="text-center my-2 rounded-lg"
                value={selectedMeet}
                onChange={handleMeetChange}
                name="MeetSelection"
            >
                {selectedMeet === "Select Meet" && <option value="selectMeet">Select Meet</option>}
                {diverMeetArray.map((item, index) => {
                    return (
                        <option
                            data-index={index}
                            value={`${item.meet} @ ${item.location}, ${item.date}`}
                            key={item.date + index}
                        >
                            {item.meet} @ {item.location}, {item.date}
                        </option>
                    );
                })}
            </select>
                </div>
                <div className="">
                    <h2 className="text-center">Create a new Meet</h2>
                    <div className="flex flex-col">
                    <label htmlFor="meet name">Enter Meet Name: </label><input type="text" placeholder="Meet Name" className="text-center my-2 py-0 rounded-lg" name="meet name" value={meetName} onChange={(e)=>{setMeetName(e.target.value)}}/>
                    <label htmlFor="meet location">Enter Meet Location: </label><input type="text" placeholder="Meet Location" className="text-center my-2 py-0 rounded-lg" name="meet location" value={meetLocation} onChange={(e)=>{setMeetLocation(e.target.value)}}/>
                    <label htmlFor="meet date">Enter Meet Date: </label><input type="text" placeholder="Meet Date MM/DD/YYYY" className="text-center my-2 py-0 rounded-lg" name="meet date" value={meetDate} onChange={(e)=>{setMeetDate(e.target.value)}}/>
                    </div>
                    <button className="" onClick={handleCreateMeet}>Enter Meet</button>
                </div>
            </div>
        </div>
    );
}
