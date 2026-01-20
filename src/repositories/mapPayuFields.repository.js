const { getDB } = require("../../database/mongodb");
const DB_COLLECTIONS = require("../../database/dbTables");

async function mapPayuFieldsBulkOptimized(batchSize = 100) {
  const db = await getDB();

  // const invoiceCursor = db.collection(DB_COLLECTIONS.MISSING_PAYU_INVOICES).find({
  const invoiceCursor = db.collection(DB_COLLECTIONS.INVOICE).find({
    eGatewayCode: 'P',
    sTransactionId: { $exists: true },
  });

  let invoiceBatch = [];

  while (await invoiceCursor.hasNext()) {
    invoiceBatch.push(await invoiceCursor.next());

    if (invoiceBatch.length === batchSize) {
      await processBatch(db, invoiceBatch);
      invoiceBatch = [];
    }
  }

  // flush remaining
  if (invoiceBatch.length) {
    await processBatch(db, invoiceBatch);
  }
}

/**
 * Process one batch of invoices
 */
async function processBatch(db, invoices) {
  const transactionIds = invoices.map(i => i.sTransactionId);

  const payuDocs = await db.collection(DB_COLLECTIONS.PAYU_SHEET).find({
    bank_ref_no: { $in: transactionIds },
  }).toArray();

  if (!payuDocs.length){
    console.log("RETURN No Payu docs found for transaction IDs:", transactionIds);
    return
  };

  const payuMap = new Map();
  for (const p of payuDocs) {
    payuMap.set(p.bank_ref_no, p);
  }

  const bulkOps = [];

  for (const invoice of invoices) {
    const payu = payuMap.get(invoice.sTransactionId);
    if (!payu){
      console.log("RETURN No Payu doc found for transaction ID:", invoice.sTransactionId);
      continue
    };

    bulkOps.push({
      updateOne: {
        filter: { _id: invoice._id },
        update: {
          $set: {
            network_type: payu.network_type ?? null,
            cardtype: payu.cardtype ?? null,
            issuing_bank: payu.issuing_bank ?? null,
            mode: payu.mode ?? null,
            payment_source: payu.payment_source ?? null,
            category: payu.category ?? null,
            currency_type: payu.currency_type ?? null,
            bank_name: payu.bank_name ?? null,
            txnid: payu.txnid ?? null,
            addedon: payu.addedon ?? null,
            settlement_amount: payu.settlement_amount ?? null,
            service_fees: payu.service_fees ?? null,
            dUpdatedAt: new Date(),
            tsp_charges: payu.tsp_charges ?? null,
          },
          // $set: {
          //   sPayuNetworkType: payu.network_type ?? null,
          //   sPayuCardType: payu.cardtype ?? null,
          //   sPayuIssuingBank: payu.issuing_bank ?? null,
          //   sPayuMode: payu.mode ?? null,
          //   sPayuPaymentSource: payu.payment_source ?? null,
          //   sPayuCategory: payu.category ?? null,
          //   sPayuCurrencyType: payu.currency_type ?? null,
          //   sPayuBankName: payu.bank_name ?? null,
          //   sPayuTxnId: payu.txnid ?? null,
          //   sPayuAddedOn: payu.addedon ?? null,
          //   nPayuSettlementAmount: payu.settlement_amount ?? null,
          //   nPayuServiceFees: payu.service_fees ?? null,
          //   dUpdatedAt: new Date(),
          // },
        },
      },
    });
  }

  if (bulkOps.length) {
    console.log("Bulk writing Payu fields for invoices... - ", bulkOps.length)
  //  const bulkWriteResult = await db.collection(DB_COLLECTIONS.MISSING_PAYU_INVOICES).bulkWrite(bulkOps, {
  const bulkWriteResult =   await db.collection(DB_COLLECTIONS.INVOICE).bulkWrite(bulkOps, {
      ordered: false,
    });
    console.log("Bulk write result:", bulkWriteResult)
  }
}

module.exports = {
    mapPayuFieldsBulkOptimized
}
