const thirdPartyCred = {
      PAYU_CURRENCY_WISE_CREDS: {
    '₹': { PAYU_MERCHANT_ID: process.env.NAVKAR_PAYU_INR_MID, PAYU_SECRET_KEY: process.env.NAVKAR_PAYU_INR_SALT },
    $: { PAYU_MERCHANT_ID: process.env.PAYU_USD_MID, PAYU_SECRET_KEY: process.env.PAYU_USD_SALT },
    CA$: { PAYU_MERCHANT_ID: process.env.PAYU_CAD_MID, PAYU_SECRET_KEY: process.env.PAYU_CAD_SALT },
    AED: { PAYU_MERCHANT_ID: process.env.PAYU_AED_MID, PAYU_SECRET_KEY: process.env.PAYU_AED_SALT },
    '€': { PAYU_MERCHANT_ID: process.env.PAYU_EUR_MID, PAYU_SECRET_KEY: process.env.PAYU_EUR_SALT },
    '£': { PAYU_MERCHANT_ID: process.env.PAYU_GBP_MID, PAYU_SECRET_KEY: process.env.PAYU_GBP_SALT },
    A$: { PAYU_MERCHANT_ID: process.env.PAYU_AUD_MID, PAYU_SECRET_KEY: process.env.PAYU_AUD_SALT },
    'د.إ': { PAYU_MERCHANT_ID: process.env.PAYU_AED_MID, PAYU_SECRET_KEY: process.env.PAYU_AED_SALT } // this is duplicate we have added due to getting error instead of AED.

  },
  PAYU_BASE_URL: process.env.PAYU_BASE_URL|| 'https://info.payu.in',
  PAYU_SUPPORTED_CURRENCIES: ['A$', '₹', 'CA$', '$', '€', '£', 'AED']
}