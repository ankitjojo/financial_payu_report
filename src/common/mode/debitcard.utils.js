// const { CHARGES } = require("../../../config/formulaConfig");
const { CARD_CATEGORY_ENUM } = require("../../enums/formulaParams.enum");
const { MODE_TYPE_ENUM } = require("../../enums/formulaParams.enum");

function handleDC(payload, CHARGES) {
    return handleDebitCardByNetwork(payload.network_type, payload, CHARGES)
  // DC specific logic
}

function handleDebitCardByNetwork(networkType, payload, CHARGES) {
  switch (networkType) {

    case MODE_TYPE_ENUM.RUPAY:
      return handleDCRupay(payload, CHARGES);

    default:
      return handleDebitCardByCategory(payload, CHARGES)
    //   throw new Error(`Unsupported debit card network type: ${networkType}`);
  }
}

function handleDCRupay(payload, CHARGES) {
    let nAmount = payload.nTotal
    let serviceFee = nAmount*CHARGES.RUPAY_DC_PERCENTAGE_CHARGES
    return serviceFee
  // Debit Card - RuPay Debit logic
}

function handleDebitCardByCategory(payload, CHARGES) {
  switch (payload.cardtype) {
    case CARD_CATEGORY_ENUM.INTERNATIONAL:
      return handleDCInternational(payload, CHARGES);

    default:
      // All non-international debit cards are treated as domestic
      return handleDCExceptInternationalCards(payload, CHARGES);
  }
}

function handleDCInternational(payload, CHARGES) {
    let nAmount = payload.nTotal
    let serviceFee = nAmount*CHARGES.INTERNATIONAL_DC_PERCENTAGE_CHARGES
    return serviceFee
  // Debit Card - International logic
}

function handleDCExceptInternationalCards(payload, CHARGES) {
    let nAmount = payload.nTotal
    if(nAmount <= CHARGES.DC_PRICE_THRESHOLD){
        let serviceFee = nAmount*CHARGES.DC_FEE_RATE_BELOW_THRESHOLD
        return serviceFee
    }else if(nAmount > CHARGES.DC_PRICE_THRESHOLD){
        let serviceFee = nAmount*CHARGES.DC_FEE_RATE_ABOVE_THRESHOLD
        return serviceFee
    }else{
        throw new Error("DC charge range not defined for this amount - ", nAmount)
    }
}

module.exports = {
    handleDC,

}