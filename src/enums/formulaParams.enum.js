const MODE_ENUM = Object.freeze({
  CC: "CC",
  DC: "DC",
  UPI: "UPI",
  UPICC: "UPICC",
  UPIPPI: "UPIPPI",
  UPISI: "UPISI",
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

module.exports = {
  MODE_ENUM,
  PAYMENT_SOURCE_ENUM,
  CARD_CATEGORY_ENUM,
  MODE_TYPE_ENUM,
};
