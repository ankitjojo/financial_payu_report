const { MODE_ENUM } = require("../enums/formulaParams.enum");
const { handleCC } = require("../common/mode/creditcard.utils");
const { handleDC } = require("../common/mode/debitcard.utils");
const { handleUpiByPaymentSource } = require("../common/mode/upi.utils");
const { handleUPICC } = require("../common/mode/upicc.utils");
const { handleUPIPPI } = require("../common/mode/upippi.utils");
const { handleUPICL } = require("../common/mode/upicl.utils");
const { handleUPICLI } = require("../common/mode/upicli.utils");
const { handleUpiSiRecurring } = require("../common/mode/upisi.utils");
const { handleNetBanking } = require("../common/mode/netbanking.utils");
const { handleCash } = require("../common/mode/cash.utils");
const { findDocuments, validatePaginationDateParams, validatePaginationParams } = require("../repositories/common.repository");
const DB_COLLECTION_ENUM = require("../../database/dbTables");
const { paginateQuery } = require("../repositories/pagination.repository");
const { getSpecificCharges } = require("../repositories/charges.repository");
const { toFixedNumber } = require("../common/common.utils");



const getCalculatedServiceChargeController = async (req, res) => {
    try {
        const resultMap = {};
        // const MODE = "CC"
        // const MODE = "DC"
        // const MODE = "UPI"
        // const MODE = "UPISI"
        // const MODE = "UPISI"
        const { page, limit, skip, searchValue, fromDate, toDate } = validatePaginationParams(req.query);
        const transactionsArray = await paginateQuery({
            collectionName: DB_COLLECTION_ENUM.INVOICE,
            fixedFilter: { currency_type: "INR", eGatewayCode: "P", dInvoiceCreatedAt: { $gte: fromDate, $lte: toDate } },
            skip,
            limit,
            searchValue,
            page,
            searchFields: ["mode"],
            projection: { addedon: 1, payment_source: 1, txnid: 1, cardtype: 1, network_type: 1, nTotal: 1, sTransactionId: 1, mode: 1, dInvoiceCreatedAt: 1 }
        })
        // const transactionsArray = await paginateQuery({collectionName: DB_COLLECTION_ENUM.INVOICE, filter: {currency_type:"INR", eGatewayCode: "P", mode: MODE }, projection: {payment_source:1,txnid:1, cardtype: 1, network_type: 1, nTotal: 1, sTransactionId: 1, mode: 1 } }) || []
        // const obj = req.body;
        console.log("transactionsArray--transactionsArray-length", transactionsArray.data.length)
        // console.log(JSON.stringify(transactionsArray, null, 2));

        // console.log(transactionsArray)
        const CONFIG_CHARGE = await getSpecificCharges(req.query.charge)
        console.log("CONFIG_CHARGE---getCalculatedServiceChargeController -- ", JSON.stringify(CONFIG_CHARGE.name, null, 2));

        //----------------------------- Xxxx------------------eeeeee---------------------------
        let totalServiceFee = 0;
        let totalSettlementAmount = 0;

        for (const obj of transactionsArray.data) {
            const key = obj.txnid;
            if (!key) {
                throw new Error("Missing txnid in transaction object");
            }

            // 1️⃣ Calculate serviceFee
            const serviceFee = toFixedNumber(handlePaymentByMode(obj.mode, obj, CONFIG_CHARGE));
            obj.serviceFee = serviceFee;

            // 2️⃣ Calculate settlementAmount
            let settlementAmount;
            if (obj.nTotal > 2) {
                settlementAmount = toFixedNumber(obj.nTotal - serviceFee);
            } else {
                settlementAmount = toFixedNumber(0 - serviceFee);
            }
            obj.settlementAmount = settlementAmount;

            // 3️⃣ Accumulate totals
            totalServiceFee += toFixedNumber(serviceFee);
            totalSettlementAmount += toFixedNumber(settlementAmount);
        }

        // 4️⃣ Attach totals at parent level
        transactionsArray.totalServiceFee = toFixedNumber(totalServiceFee);
        transactionsArray.totalSettlementAmount = toFixedNumber(totalSettlementAmount);

        return res.status(200).json({ success: true, thisPageServiceFee: toFixedNumber(totalServiceFee), thisPageSettlementAmount: toFixedNumber(totalSettlementAmount), data: transactionsArray.data, pagination: transactionsArray.pagination })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error.message })
    }
}

// const getConfigListController = async (req, res) => {
//     try {
//         // const { charge } = req.query;
//         const configList = await getConfigList();
//         return res.status(200).json({ success: true, data: configList });
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ success: false, error: error.message })
//     }
// }






function handlePaymentByMode(mode, payload, CHARGES) {
    switch (mode) {
        case MODE_ENUM.CC:
            return handleCC(payload, CHARGES);

        case MODE_ENUM.DC:
            return handleDC(payload, CHARGES);

        case MODE_ENUM.UPI:
            return handleUpiByPaymentSource(payload.payment_source, payload, CHARGES);

        case MODE_ENUM.UPICC:
            return handleUPICC(payload, CHARGES);

        case MODE_ENUM.UPIPPI:
            return handleUPIPPI(payload, CHARGES);

        case MODE_ENUM.UPICL:
            return handleUPICL(payload, CHARGES);

        case MODE_ENUM.UPICLI:
            return handleUPICLI(payload, CHARGES);

        case MODE_ENUM.UPISI:
            return handleUpiSiRecurring(payload, CHARGES);

        case MODE_ENUM.NB:
            return handleNetBanking(payload, CHARGES);

        case MODE_ENUM.CASH:
            return handleCash(payload, CHARGES);

        default:
            throw new Error(`Unsupported payment mode: ${mode}`);
    }
}
// Default November month range in IST


async function getTotalServiceFeeAndSettlementAmount(req, res) {
    try {
        let totalServiceFee = 0;
        let totalSettlementAmount = 0;
        let CONFIG_CHARGE = await getSpecificCharges(req.body.charge)
        if (!CONFIG_CHARGE) {
            return res.status(500).json({ success: false, error: "No config found for your request" })
        }
        // const CONFIG_CHARGE = setConfig;

        const { fromDate, toDate } = validatePaginationDateParams(req.query);
        const fixedFilter = { currency_type: "INR", eGatewayCode: "P", dInvoiceCreatedAt: { $gte: fromDate, $lte: toDate } }
        const projection = { payment_source: 1, txnid: 1, cardtype: 1, network_type: 1, nTotal: 1, sTransactionId: 1, mode: 1 }

        const transactionsArray = await findDocuments(DB_COLLECTION_ENUM.INVOICE, fixedFilter, projection) || []
        console.log("CONFIG_CHARGE---getTotalServiceFeeAndSettlementAmount -- ", JSON.stringify(CONFIG_CHARGE.name, null, 2));

        for (const obj of transactionsArray) {
            const key = obj.txnid;
            if (!key) {
                throw new Error("Missing txnid in transaction object");
            }

            // 1️⃣ Calculate serviceFee
            const serviceFee = toFixedNumber(handlePaymentByMode(obj.mode, obj, CONFIG_CHARGE));
            obj.serviceFee = serviceFee;

            // 2️⃣ Calculate settlementAmount
            let settlementAmount;
            if (obj.nTotal > 2) {
                settlementAmount = toFixedNumber(obj.nTotal - serviceFee);
            } else {
                settlementAmount = toFixedNumber(0 - serviceFee);
            }
            obj.settlementAmount = settlementAmount;

            // 3️⃣ Accumulate totals
            totalServiceFee += toFixedNumber(serviceFee);
            totalSettlementAmount += toFixedNumber(settlementAmount);
        }

        // 4️⃣ Attach totals at parent level
        transactionsArray.totalServiceFee = toFixedNumber(totalServiceFee);
        transactionsArray.totalSettlementAmount = toFixedNumber(totalSettlementAmount);

        return res.status(200).json({ success: true, totalServiceFee: toFixedNumber(totalServiceFee), totalSettlementAmount: toFixedNumber(totalSettlementAmount), data: transactionsArray.data, pagination: transactionsArray.pagination })
    } catch (error) {
        console.log("getTotalServiceFeeAndSettlementAmount", error)
        return res.status(500).json({ success: false, error: error.message })
    }
}


// const rawgetCalculatedServiceChargeController = async (req, res) => {
//     try {
//         const resultMap = {};
//         // const MODE = "CC"
//         // const MODE = "DC"
//         // const MODE = "UPI"
//         // const MODE = "UPISI"
//         const MODE = "UPISI"
//         const transactionsArray = await findDocuments(DB_COLLECTION_ENUM.INVOICE, {currency_type:"INR", eGatewayCode: "P", mode: MODE }, { projection: {payment_source:1,txnid:1, cardtype: 1, network_type: 1, nTotal: 1, sTransactionId: 1, mode: 1 } }) || []
//         // const obj = req.body;
//         console.log("transactionsArray--transactionsArray-length", transactionsArray.length)
//         console.log(JSON.stringify(transactionsArray, null, 2));

//         // console.log(transactionsArray)
//         for (const obj of transactionsArray) {
//             // const key = obj.sTransactionId
//             const key = obj.txnid
//             if (!key) {
//                 throw new Error("Missing sTransactionId in transaction object");
//             }

//             resultMap[key] = toFixedNumber(handlePaymentByMode(obj.mode, obj));
//         }
//         // const result = handlePaymentByMode(obj.mode, obj)
//         // const settlementAmount = obj.nTotal - result
//         console.log({ resultMap })
//         return res.status(200).json({ success: true, resultMap })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ success: false, error: error.message })
//     }
// }
// module.exports = { validatePaginationParams };

module.exports = {
    getCalculatedServiceChargeController, getTotalServiceFeeAndSettlementAmount, 
    // getConfigListController, setConfigChargesController
}