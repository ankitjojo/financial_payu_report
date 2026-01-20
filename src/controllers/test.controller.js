const DB_COLLECTION  = require("../../database/dbTables")
const { mapPayuFieldsBulkOptimized } = require("../repositories/mapPayuFields.repository")
const { findDocuments, addParsedDateField } = require("../repositories/common.repository")

async function addDateTimeStampForAllInvoices(req, res) {
    try {
        // const Collection = DB_COLLECTION.INVOICE
        const Collection = DB_COLLECTION.MISSING_PAYU_INVOICES
        const filter = {} || { eGatewayCode: 'P' }
        
        // Add dCreatedAt field by parsing sFullPaymentDate for all Payu invoices
        const result = await addParsedDateField(
            Collection,
            filter,
            'sFullPaymentDate',  // source field
            'dCreatedAt'         // target field
        )
        
        console.log({ result })
        return res.status(200).json({
            success: true,
            message: 'Date field added successfully',
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: error.message })
    }
}

async function mapPayuFields(req, res) {
    try {
        console.log("Mapping Payu fields...")
        const result = await mapPayuFieldsBulkOptimized()
        console.log({ result })
        return res.status(200).json({
            success: true,
            message: 'Payu fields mapped successfully',
            result
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = { addDateTimeStampForAllInvoices, mapPayuFields }