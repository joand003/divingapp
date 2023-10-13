import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentDiverNumber } from '../lib/redux/slices/currentDiverNumber/currentDiverNumberSlice'
import { selectDiverNameArray, setDiverNameArray } from '../lib/redux/slices/diverNameArray/diverNameArraySlice'


const DiverNameComponent = () => {
    const dispatch = useDispatch();
    const [changeName, setChangeName] = useState(false);
    const currentDiverNumber = useSelector(selectCurrentDiverNumber);
    const diverNameArray = useSelector(selectDiverNameArray);

    const handleShowInput = () => {
        setChangeName(true);
      };

    const handleNameChange = () => {
        let newDiverNameArray = [...diverNameArray];
        newDiverNameArray[currentDiverNumber - 1] = changeName;
        dispatch(setDiverNameArray(newDiverNameArray));
        setChangeName(false);
      };

  return (
    <div className="flex items-center justify-center">
        <h2>
          Current Diver:{" "}
          <span className="font-normal pr-4">
            {diverNameArray[currentDiverNumber - 1]}
          </span>
        </h2>
        {changeName ? (
          ""
        ) : (
          <div className="pl-4">
            <button className='mb-3' onClick={handleShowInput}>Change Name</button>
          </div>
        )}
        {changeName ? (
          <div className="pl-4">
            <button className="mb-3" onClick={handleNameChange}>Submit</button>{" "}
            <input
              placeholder="New Name"
              style={{ width: "auto" }}
              onChange={(e) => setChangeName(e.target.value)}
            ></input>
          </div>
        ) : (
          ""
        )}
      </div>
  )
}

export default DiverNameComponent