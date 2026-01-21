const {IDEAL_REQUIRED_PARAMS, CHARGES} = require("../../config/formulaConfig")
// const {CHARGES} = require("../../config/formulaConfig")
const {
  MODE_ENUM,
  PAYMENT_SOURCE_ENUM,
  CARD_CATEGORY_ENUM,
  MODE_TYPE_ENUM,
} = require("../enums/formulaParams.enum")
const obj = {
//   _id: "6969cda0d47bf9302866ecdb",
//   sUserPurchasedOn: "email",
//   sCustomerId: "DpNpKSXn6efv",
//   sState: "Karnataka",
  sRegion: "India",
  eGatewayCode: "P",
//   sPaymentGateway: "Payu",
  sPaymentMode: "CARD",
  sPaymentAccountDetail: "XXXXXXXXXXXX0738",
//   sTransactionId: 3905239258,
//   sPlanType: "SVOD",
  nTotal: 360.0,
  sCurrencySymbol: "₹",
  sCurrency: "INR",
//   nSgstAmount: 0.0,
//   nCgstAmount: 0.0,
//   nIgstAmount: 54.91,
//   nTotalTaxAmount: 54.91,
//   nSubTotalAmount: 305.08,
  sPlanName: "12 Months",
  sFullPaymentDate: "02/10/2025, 13:48:54 GMT",
//   sMainDate: "2/10/2025",
//   sStartDate: "2/10/2025",
//   sEndDate: "3/10/2026",
//   sPlanId: "6707a42330e0d1ac10db6531",
//   nInvoiceCounter: 1000185,
//   sInvoiceNumber: "NS0210251000185",
//   sEmail: "malayshahkk@gmail.com",
  dCreatedAt: "2025-10-02T13:48:54.000Z",
//   dUpdatedAt: "2026-01-20T12:45:19.613Z",
//   addedon: "2025-10-02 19:18:32",
  bank_name: "Credit Card",
  cardtype: "domestic",
  category: "creditcard",
  currency_type: "INR",
  issuing_bank: "AXIS",
  mode: "CC",
  network_type: "MAST",
  payment_source: "payu",
  service_fees: 7.2,
  settlement_amount: 352.8,
  txnid: "txn1759412912015qhwrwsvnm",
  dInvoiceCreatedAt: "2025-10-02T13:48:54.000Z",
  tsp_charges: 0
};

const calculateFormulaController = async (req, res) => {
    try {
        const result = calculateFormula(obj)
        const settlementAmount = obj.nTotal - result
        console.log({result})
        return res.status(200).json({ success: true, result ,settlementAmount})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error.message })
    }
}

function calculateFormula(obj) {
    try {
        // Mode case handling 
        const finalServiceFee  = handlePaymentByMode(obj.mode, obj)
        console.log({finalServiceFee})
        return finalServiceFee

        
    } catch (error) {
        console.log({"calculateFormula_error": error})
        return null
    }
}

// ----------------- MODE (CC, DC, UPI, UPICC, UPIPPI, UPISI) -----------------

function handleCC(payload) {
  // CC specific logic
  return handleCreditCardByCategory(payload.cardtype, payload)
}

function handleDC(payload) {
    return handleDebitCardByNetwork(payload.network_type, payload)
  // DC specific logic
}

function handleUPICC(payload) {
  // UPI + Card logic
  let nAmount = payload.nTotal
  let serviceFee = nAmount*CHARGES.UPI_CC_PERCENTAGE_CHARGES
  return serviceFee
}

function handleUPIPPI(payload) {
  // UPI PPI logic
  let nAmount = payload.nTotal
  let serviceFee = nAmount*CHARGES.UPIPPI_PERCENTAGE_CHARGES
  return serviceFee
}

function handleUPISI(payload) {
  // UPI SI logic

}

function handleNetBanking(payload) {
    // Net Banking specific logic
    let nAmount = payload.nTotal
    let serviceFee = nAmount*CHARGES.NB_PERCENTAGE_CHARGES
    return serviceFee
}

function handleCash(payload) {
    // Cash specific logic
    let nAmount = payload.nTotal
    let serviceFee = nAmount*CHARGES.CASH_PERCENTAGE_CHARGES
    return serviceFee
}
function handleUPICL(payload) {
    // UPI CL logic
    let nAmount = payload.nTotal
    let serviceFee = nAmount*CHARGES.UPICL_PERCENTAGE_CHARGES
    return serviceFee
}

function handleUPICLI(payload) {
    // UPI CLI logic
    let nAmount = payload.nTotal
    let serviceFee = nAmount*CHARGES.UPICLI_PERCENTAGE_CHARGES
    return serviceFee
}


function handlePaymentByMode(mode, payload) {
  switch (mode) {
    case MODE_ENUM.CC:
      return handleCC(payload);

    case MODE_ENUM.DC:
      return handleDC(payload);

    case MODE_ENUM.UPI:
      return handleUpiByPaymentSource(payload);

    case MODE_ENUM.UPICC:
      return handleUPICC(payload);

    case MODE_ENUM.UPIPPI:
      return handleUPIPPI(payload);

    case MODE_ENUM.UPICL:
      return handleUPICL(payload);

    case MODE_ENUM.UPICLI:
      return handleUPICLI(payload);

    case MODE_ENUM.UPISI:
      return handleUpiSiRecurring(payload);

    case MODE_ENUM.NB:
      return handleNetBanking(payload);

    case MODE_ENUM.CASH:
      return handleCash(payload);

    default:
      throw new Error(`Unsupported payment mode: ${mode}`);
  }
}

// ----------------- CARD CATEFIRY (international, domestic, corporate, signature_premium) -----------------
function handleCCInternational(payload) {
    let Amount = payload.nTotal
    let serviceFee = Amount*CHARGES.INTERNATION_CC_PERCENTAGE_CHARGES
    return serviceFee;
  // Credit Card - International logic
}

function handleCCCorporate(payload) {
    let Amount = payload.nTotal
    let serviceFee = Amount*CHARGES.CORPORATE_CC_PERCENTAGE_CHARGES
    return serviceFee;
  // Credit Card - Corporate logic
}

function handleCCDomestic(payload) {
    let Amount = payload.nTotal
    let serviceFee = Amount*CHARGES.DOMESTIC_CC_PERCENTAGE_CHARGES
    return serviceFee;
  // Credit Card - Domestic logic
}

function handleCCSignaturePremium(payload) {
  // Credit Card - Signature / Premium logic
    let Amount = payload.nTotal
    let serviceFee = Amount*CHARGES.SIGNATURE_PREMIUM_CC_PERCENTAGE_CHARGES
    return serviceFee;
}

function handleCreditCardByCategory(cardCategory, payload) {
  switch (cardCategory) {
    case CARD_CATEGORY_ENUM.INTERNATIONAL:
      return handleCCInternational(payload);

    case CARD_CATEGORY_ENUM.CORPORATE:
      return handleCCCorporate(payload);

    case CARD_CATEGORY_ENUM.DOMESTIC:
      return handleCCDomestic(payload);

    case CARD_CATEGORY_ENUM.SIGNATURE_PREMIUM:
      return handleCCSignaturePremium(payload);

    default:
      throw new Error(`Unsupported credit card category: ${cardCategory}`);
  }
}

// ----------------- DEBIT MODE TYPE (VISA, MAST, RUPAY, RUPAYCC) -----------------

// function handleDCRupay(payload) {
//     let nAmount = payload.nTotal
//     let serviceFee = nAmount*CHARGES.RUPAY_DC_PERCENTAGE_CHARGES
//     return serviceFee
//   // Debit Card - RuPay Debit logic
// }


function handleDebitCardByNetwork(networkType, payload) {
  switch (networkType) {

    case MODE_TYPE_ENUM.RUPAY:
      return handleDCRupay(payload);

    default:
      return handleDebitCardByCategory(payload)
    //   throw new Error(`Unsupported debit card network type: ${networkType}`);
  }
}

function handleDCInternational(payload) {
    let nAmount = payload.nTotal
    let serviceFee = nAmount*CHARGES.INTERNATIONAL_DC_PERCENTAGE_CHARGES
    return serviceFee
  // Debit Card - International logic
}

function handleDCExceptInternationalCards(payload) {
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

function handleDebitCardByCategory(payload) {
  switch (payload.cardtype) {
    case CARD_CATEGORY_ENUM.INTERNATIONAL:
      return handleDCInternational(payload);

    default:
      // All non-international debit cards are treated as domestic
      return handleDCExceptInternationalCards(payload);
  }
}

//------- UPI switch case modes 

function handleUpiSist(payload) {
    let nAmount = payload.nTotal
    let serviceFee
    if(nAmount < CHARGES.UPI_SI_REGISTRATION_PRICE_THRESHOLD){
      serviceFee = CHARGES.UPI_SI_REGISTRATION_FEE_PRICE_BELOW_THRESHOLD 
    }
      serviceFee = CHARGES.UPI_SI_REGISTRATION_FEE_PRICE_ABOVE_THRESHOLD
    
    return serviceFee
  // UPI - SIST flow logic
}

function handleUpiSimplePayments(payload) {
  // UPI - PayU Pure S2S flow logic
  // let nAmount = payload.nTotal
  if(payload.payment_source == PAYMENT_SOURCE_ENUM.SI_RECURRING){
      throw new Error("UPI SI- handleUpiSimplePayments - Recurring is not allowed for UPI Simple Payments")
  }
    let serviceFee = CHARGES.UPI_SIMPLE_ONETIME_PAYMENT_FEE_PRICE
    return serviceFee
  
}

function handleUpiSiRecurring(payload) {
  // UPI - SI Recurring flow logic
  let nAmount = payload.nTotal
    let serviceFee
    if(nAmount < CHARGES.UPI_SI_RECURRING_PRICE_THRESHOLD){
      serviceFee = CHARGES.UPI_SI_RECURRING_FEE_PRICE_BELOW_THRESHOLD 
    }
      serviceFee = CHARGES.UPI_SI_RECURRING_FEE_PRICE_ABOVE_THRESHOLD
    
    return serviceFee
}

function handleUpiByPaymentSource(paymentSource, payload) {
  switch (paymentSource) {
    case PAYMENT_SOURCE_ENUM.SIST:
      return handleUpiSist(payload);

    // case PAYMENT_SOURCE_ENUM.SI_RECURRING:
    //   return handleUpiSiRecurring(payload);

    default:
      return handleUpiSimplePayments(payload)
      // throw new Error(`Unsupported UPI payment source: ${paymentSource}`);
  }
}


module.exports = {
    calculateFormulaController
}
