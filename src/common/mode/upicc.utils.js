// const { CHARGES } = require("../../../config/formulaConfig")

function handleUPICC(payload, CHARGES) {
  // UPI + Card logic
  let nAmount = payload.nTotal
  let serviceFee = nAmount*CHARGES.UPI_CC_PERCENTAGE_CHARGES
  return serviceFee
}

module.exports = {handleUPICC}