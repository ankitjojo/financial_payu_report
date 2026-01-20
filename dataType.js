const requiredFields = {
    sCustomerId : 1,
    sPaymentGateway : 1,
    eGatewayCode : 1,
    sTransactionId : 1,
    sPaymentMode : 1, // Google , Apple, UPI, CARD
    nTotal : 1,
    nSubTotalAmount : 1,
    nTotalTaxAmount: 1,
    sRegion : 1, // Country name
    sState : 1, // State
    dPaymentTime : 1, // full date time value 
    sPlaneName : 1,
    sCreditCardType : Credit/Debit,
    sUpiType : mandate / onetime
}