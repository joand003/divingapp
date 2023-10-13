const diverArrayBuilder = (value, numberOfDivers, numberOfRounds) => {
    let diverArray = []
    for (let i = 0; i < numberOfDivers; i++) {
        let diver = []
        for (let j = 0; j < numberOfRounds; j++) {
            diver.push([value])
        }
        diverArray.push(diver)
    }
    return diverArray
}

export default diverArrayBuilder;