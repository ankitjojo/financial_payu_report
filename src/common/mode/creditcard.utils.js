// const { CHARGES } = require("../../../database/dbTables");
const { CARD_CATEGORY_ENUM } = require("../../enums/formulaParams.enum");

function handleCC(payload, CHARGES) {
  // CC specific logic
  return handleCreditCardByCategory(payload.cardtype, payload, CHARGES)
}
function handleCCInternational(payload, CHARGES) {
    let Amount = payload.nTotal
    let serviceFee = Amount*CHARGES.INTERNATION_CC_PERCENTAGE_CHARGES
    return serviceFee;
  // Credit Card - International logic
}


function handleCCCorporate(payload, CHARGES) {
    let Amount = payload.nTotal
    let serviceFee = Amount*CHARGES.CORPORATE_CC_PERCENTAGE_CHARGES
    return serviceFee;
  // Credit Card - Corporate logic
}

function handleCCDomestic(payload, CHARGES) {
    let Amount = payload.nTotal
    let serviceFee = Amount*CHARGES.DOMESTIC_CC_PERCENTAGE_CHARGES
    return serviceFee;
  // Credit Card - Domestic logic
}

function handleCCSignaturePremium(payload, CHARGES) {
  // Credit Card - Signature / Premium logic
    let Amount = payload.nTotal
    let serviceFee = Amount*CHARGES.SIGNATURE_PREMIUM_CC_PERCENTAGE_CHARGES
    return serviceFee;
}

function handleCreditCardByCategory(cardCategory, payload, CHARGES) {
  switch (cardCategory) {
    case CARD_CATEGORY_ENUM.INTERNATIONAL:
      return handleCCInternational(payload, CHARGES);

    case CARD_CATEGORY_ENUM.CORPORATE:
      return handleCCCorporate(payload, CHARGES);

    case CARD_CATEGORY_ENUM.DOMESTIC:
      return handleCCDomestic(payload, CHARGES);

    case CARD_CATEGORY_ENUM.SIGNATURE_PREMIUM:
      return handleCCSignaturePremium(payload, CHARGES);

    default:
      throw new Error(`Unsupported credit card category: ${cardCategory}`);
  }
}

module.exports = {handleCC}