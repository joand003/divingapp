const judgeArrayBuilder = (numberOfDivers, numberOfRounds, numberOfJudges ) => {
    let judgeArray = []
    // Creates an array for each diver 
    for (let i = 0; i < numberOfDivers; i++) {
        let diverArray = []
        // Creates the array for each round for scoring
        for (let j = 0; j < numberOfRounds; j++) {
            let round = {}
            // Creates the correct number of judges for each round
            for (let k = 0; k < numberOfJudges; k++) {
                round[`judge${k + 1}`] = 0
            }
            diverArray.push(round)
        }
        judgeArray.push(diverArray)
    }
    return judgeArray
}

export default judgeArrayBuilder;