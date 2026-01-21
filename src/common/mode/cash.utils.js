// const { getConfigCharges } = require("../../repositories/charges.repository");


function handleCash(payload, CHARGES) {
    // Cash specific logic
    let nAmount = payload.nTotal
    let serviceFee = nAmount*CHARGES.CASH_PERCENTAGE_CHARGES
    return serviceFee
}
module.exports = {handleCash}