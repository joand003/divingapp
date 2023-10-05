const addNewDiverToArray = (numberOfRounds) => {
    let diverArray = []
    for (let j = 0; j < numberOfRounds; j++) {
        diverArray.push([0])
    }
    return diverArray
}

const addJudgesToNewDiver = (numberOfRounds, numberOfJudges) => {
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
        return diverArray
}

export { addNewDiverToArray, addJudgesToNewDiver };
