const { getCharges } = require("../src/repositories/charges.repository");

const IDEAL_REQUIRED_PARAMS = {

    MODE : "mode", // [CC,DC, UPI, UPICC, UPIPPI, UPISI(sirecurring)]
    PAYMENT_SOURCE : "payment_source", // [sist, payuPureS2S, sirecurring]
    CARD_CATEGORY :  "cardtype",// "cardCategory", // [international, corporate, domestic, signature_premium]
    MODE_TYPE : "network_type", // bankcode //[VISA, MAST, RUPAY, RUPAYCC ]

    // CARD_TYPE : "card_type",// [international, corporate, domestic, signature_premium]


    

}
// mode = UPI , payment_source = [sist, payuPureS2S, payu]
// mode = UPISI, payment_source = sirecurring;
const CHARGES = {
    INTERNATION_CC_PERCENTAGE_CHARGES : 3 / 100,
    DOMESTIC_CC_PERCENTAGE_CHARGES : 2 / 100,
    CORPORATE_CC_PERCENTAGE_CHARGES : 2.25 / 100,
    SIGNATURE_PREMIUM_CC_PERCENTAGE_CHARGES : 2 / 100,
    
    RUPAY_DC_PERCENTAGE_CHARGES : 0 / 100,
    INTERNATIONAL_DC_PERCENTAGE_CHARGES : 3 / 100,

    DC_PRICE_THRESHOLD: 2000,

    DC_FEE_RATE_BELOW_THRESHOLD: 0.40 / 100,
    DC_FEE_RATE_ABOVE_THRESHOLD: 0.85 / 100,

    NB_PERCENTAGE_CHARGES : 1.70 / 100,
    CASH_PERCENTAGE_CHARGES : 1.70 / 100,

    UPI_SI_REGISTRATION_PRICE_THRESHOLD: 250,
    UPI_SI_REGISTRATION_FEE_PRICE_BELOW_THRESHOLD: 2,
    UPI_SI_REGISTRATION_FEE_PRICE_ABOVE_THRESHOLD: 5,

    UPI_SI_RECURRING_PRICE_THRESHOLD: 250,

    UPI_SI_RECURRING_FEE_PRICE_BELOW_THRESHOLD: 2,
    UPI_SI_RECURRING_FEE_PRICE_ABOVE_THRESHOLD: 5,
 
    UPI_SIMPLE_ONETIME_PAYMENT_FEE_PRICE : 0,

    UPI_CC_PERCENTAGE_CHARGES : 2 / 100,
    UPIPPI_PERCENTAGE_CHARGES : 1.2 / 100,
    UPICL_PERCENTAGE_CHARGES : 2 / 100,
    UPICLI_PERCENTAGE_CHARGES : 0 / 100,

}

// const getConfigCharges = () => {
//     return getCharges();
// }
const PAYU_SHEET = {
    CARD_TYPE : "cardtype"
}
module.exports = {
    // getConfigCharges,
    CHARGES,
    IDEAL_REQUIRED_PARAMS,
    PAYU_SHEET
}