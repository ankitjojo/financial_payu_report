const { CHARGES } = require("../../../config/formulaConfig")

function handleNetBanking(payload, CHARGES) {
    // Net Banking specific logic
    let nAmount = payload.nTotal
    let serviceFee = nAmount*CHARGES.NB_PERCENTAGE_CHARGES
    return serviceFee
}
module.exports = {handleNetBanking}