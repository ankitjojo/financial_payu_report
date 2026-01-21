const MODE_ENUM = Object.freeze({
  CC: "CC",
  DC: "DC",
  UPI: "UPI", // payment_source = [sist, payuPureS2S, payu]
  UPICC: "UPICC",
  UPIPPI: "UPIPPI",
  UPISI: "UPISI", // payment_source = sirecurring;
  NB : "NB",
  CASH : "CASH",
  UPICL : "UPICL",
  UPICLI : "UPICLI"
});

const PAYMENT_SOURCE_ENUM = Object.freeze({
  SIST: "sist",
  PAYU_PURE_S2S: "payuPureS2S",
  SI_RECURRING: "sirecurring",
});

const CARD_CATEGORY_ENUM = Object.freeze({
  INTERNATIONAL: "international",
  CORPORATE: "corporate",
  DOMESTIC: "domestic",
  SIGNATURE_PREMIUM: "signature_premium",
});

const MODE_TYPE_ENUM = Object.freeze({
  VISA: "VISA",
  MAST: "MAST",
  RUPAY: "RUPAY",
  RUPAYCC: "RUPAYCC",
});

const CLIENT_SIDE_ENUM = {
  CreditCard: "CC",
  DebitCard: "DC",
  UPI: "UPI",
  NetBanking: "NB",
  Cash: "CASH",
  UPI_CC: "UPICC",
  UPI_PPI: "UPIPPI",
  UPIRecurring: "UPISI",
  UPI_CL: "UPICL",
  UPI_CLI: "UPICLI"
}
module.exports = {
  MODE_ENUM,
  PAYMENT_SOURCE_ENUM,
  CARD_CATEGORY_ENUM,
  MODE_TYPE_ENUM,
  CLIENT_SIDE_ENUM
};
