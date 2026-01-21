// const { CHARGES } = require("../../../config/formulaConfig")

function handleUpiSiRecurring(payload, CHARGES) {
  // UPI - SI Recurring flow logic
  let nAmount = payload.nTotal
    let serviceFee
    if(nAmount < CHARGES.UPI_SI_RECURRING_PRICE_THRESHOLD){
      serviceFee = CHARGES.UPI_SI_RECURRING_FEE_PRICE_BELOW_THRESHOLD 
    }
      serviceFee = CHARGES.UPI_SI_RECURRING_FEE_PRICE_ABOVE_THRESHOLD
    
    return serviceFee
}

module.exports = {handleUpiSiRecurring}