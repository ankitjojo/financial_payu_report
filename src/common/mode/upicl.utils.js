// const { CHARGES } = require("../../../config/formulaConfig")

function handleUPICL(payload, CHARGES) {
    // UPI CL logic
    let nAmount = payload.nTotal
    let serviceFee = nAmount*CHARGES.UPICL_PERCENTAGE_CHARGES
    return serviceFee
}

module.exports = {handleUPICL}
