// const { CHARGES } = require("../../../config/formulaConfig")
const { PAYMENT_SOURCE_ENUM } = require("../../enums/formulaParams.enum")

function handleUpiSist(payload, CHARGES) {
    let nAmount = payload.nTotal
    let serviceFee
    if(nAmount < CHARGES.UPI_SI_REGISTRATION_PRICE_THRESHOLD){
      serviceFee = CHARGES.UPI_SI_REGISTRATION_FEE_PRICE_BELOW_THRESHOLD 
    }
      serviceFee = CHARGES.UPI_SI_REGISTRATION_FEE_PRICE_ABOVE_THRESHOLD
    
    return serviceFee
  // UPI - SIST flow logic
}

function handleUpiSimplePayments(payload, CHARGES) {
  // UPI - PayU Pure S2S flow logic
  // let nAmount = payload.nTotal
//   console.log("handleUpiSimplePyments---handleUpiSimplePayments---handleUpiSimplePayments")
//   console.log(payload)
  if(payload?.payment_source === PAYMENT_SOURCE_ENUM.SI_RECURRING){
    console.log("UPI SI- handleUpiSimplePayments - Recurring is not allowed for UPI Simple Payments")
      throw new Error("UPI SI- handleUpiSimplePayments - Recurring is not allowed for UPI Simple Payments")
  }
    let serviceFee = CHARGES.UPI_SIMPLE_ONETIME_PAYMENT_FEE_PRICE
    return serviceFee
  
}

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

function handleUpiByPaymentSource(paymentSource, payload, CHARGES) {
  switch (paymentSource) {
    case PAYMENT_SOURCE_ENUM.SIST:
      return handleUpiSist(payload, CHARGES);

    // case PAYMENT_SOURCE_ENUM.SI_RECURRING:
    //   return handleUpiSiRecurring(payload);

    default:
      return handleUpiSimplePayments(payload, CHARGES)
      // throw new Error(`Unsupported UPI payment source: ${paymentSource}`);
  }
}

module.exports = {handleUpiByPaymentSource}