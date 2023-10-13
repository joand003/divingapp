import React from 'react'
import { useSelector } from 'react-redux'
import { selectDiverNameArray } from '../lib/redux/slices/diverNameArray/diverNameArraySlice'
import { selectDiverScoresArray } from '../lib/redux/slices/diverScoresArray/diverScoresArraySlice'


const ResultsTableComponent = () => {
    const diverNameArray = useSelector(selectDiverNameArray);
    const diverScoresArray = useSelector(selectDiverScoresArray);

    // need to add totals and redo how the map is working for the table so that it had place as well, but will need to redo how it is mapped


    const totalScoresArray = diverScoresArray.map((diver, index) => {
        return diver.reduce((score, current)=>{
            return (Number(score) + Number(current)).toFixed(2)
        }, 0)
    })


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