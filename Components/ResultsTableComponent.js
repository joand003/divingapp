import React from 'react'
import { useSelector } from 'react-redux'
import { selectDiverNameArray } from '../lib/redux/slices/diverNameArray/diverNameArraySlice'
import { selectTotalScoresArray } from '../lib/redux/slices/totalScoresArray/totalScoresArraySlice'


const ResultsTableComponent = () => {
    const diverNameArray = useSelector(selectDiverNameArray);
    const totalScoresArray = useSelector(selectTotalScoresArray);
    
    const placeArray = totalScoresArray.map((score, index) => ({index, score})).sort((a, b) => b.score - a.score).map((data) => data.index + 1)

  return (
    <div className='flex justify-center'>
      <table>
        <thead>
          <tr>
            <th>Diver #</th>
            <th>Name</th>
            <th>Total</th>
            <th>Place</th>
          </tr>
        </thead>
        <tbody>
            {
                diverNameArray.map((diver, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{diver}</td>
                            <td>{totalScoresArray[index]}</td>
                            <td>{placeArray[index]}</td>
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
      </div>
  )
}

export default ResultsTableComponent