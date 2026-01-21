// const { CHARGES } = require("../../../config/formulaConfig")

function handleUPIPPI(payload, CHARGES) {
  // UPI PPI logic
  let nAmount = payload.nTotal
  let serviceFee = nAmount*CHARGES.UPIPPI_PERCENTAGE_CHARGES
  return serviceFee
}

module.exports = {handleUPIPPI}