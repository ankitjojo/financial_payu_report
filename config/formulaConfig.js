const IDEAL_REQUIRED_PARAMS = {

    MODE : "mode", // [CC,DC, UPI, UPICC, UPIPPI, UPISI]
    PAYMENT_SOURCE : "payment_source", // [sist, payuPureS2S, sirecurring]
    CARD_CATEGORY :  "cardtype",// "cardCategory", // [international, corporate, domestic, signature_premium]
    MODE_TYPE : "network_type", // bankcode //[VISA, MAST, RUPAY, RUPAYCC ]

    // CARD_TYPE : "card_type",// [international, corporate, domestic, signature_premium]


    

}

const CHARGES = {
    INTERNATION_CC_PERCENTAGE_CHARGES : 3 / 100,
    DOMESTIC_CC_PERCENTAGE_CHARGES : 2 / 100,
    CORPORATE_CC_PERCENTAGE_CHARGES : 2.25 / 100,
    SIGNATURE_PREMIUM_CC_PERCENTAGE_CHARGES : 2 / 100,
    
    RUPAY_DC_PERCENTAGE_CHARGES : 0 / 100,
    INTERNATIONAL_DC_PERCENTAGE_CHARGES : 3 / 100,
    DC_MIN_RANGE_PRICE : 2000,
    DC_MAX_RANGE_PRICE : 2000,
    DC_MIN_RANGE_PERCENTAGE_CHARGES : 0.40 / 100,
    DC_MAX_RANGE_PERCENTAGE_CHARGES : 0.85 / 100,
    
    NB_PERCENTAGE_CHARGES : 1.70 / 100,
    CASH_PERCENTAGE_CHARGES : 1.70 / 100,

    UPIPPI_PERCENTAGE_CHARGES : 1.2 / 100,
    UPICL_PERCENTAGE_CHARGES : 2 / 100,
    UPICLI_PERCENTAGE_CHARGES : 0 / 100,
    

}
const PAYU_SHEET = {
    CARD_TYPE : "cardtype"
}
module.exports = {
    CHARGES,
    IDEAL_REQUIRED_PARAMS,
    PAYU_SHEET
}