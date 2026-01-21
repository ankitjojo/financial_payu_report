// const { CHARGES } = require("../../../config/formulaConfig")

function handleUPICLI(payload, CHARGES) {
    // UPI CLI logic
    let nAmount = payload.nTotal
    let serviceFee = nAmount*CHARGES.UPICLI_PERCENTAGE_CHARGES
    return serviceFee
}
module.exports = {handleUPICLI}