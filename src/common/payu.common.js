const config = require("../../config/config")


async function verifyPayuPayment(iOrderId, sCurrencySymbol = '$') {
  try {
    const data = {
      key: config.PAYU_CURRENCY_WISE_CREDS[sCurrencySymbol].PAYU_MERCHANT_ID,
      command: 'verify_payment',
      var1: iOrderId
    }

    data.hash = generateHashCommandV2({ ...data, sCurrencySymbol })

    const verifyPayment = await axios.post(`${config.PAYU_BASE_URL}/merchant/postservice.php?form=2`, data, {
      headers: {
        Accept: 'application/json', // Add your JWT token here
        'Content-Type': 'application/x-www-form-urlencoded'
      }

    })
    console.log("verifyPayment ---- verifyPayment")
    console.log(verifyPayment)
    let ePaymentStatus = 'PENDING'
    const oTransactionDetails = verifyPayment?.data?.transaction_details[iOrderId]
    // if (verifyPayment?.data?.transaction_details?.success === 'success') {
    if (oTransactionDetails?.status === 'success') {
      ePaymentStatus = 'SUCCESS'
    } else {
      ePaymentStatus = 'FAILURE'
    }
    return { ePaymentStatus, oTransactionDetails }
  } catch (error) {
    console.log(error)
    return null;
  }
}

module.exports = {verifyPayuPayment}