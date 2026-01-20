const { getDB } = require('../../database/mongodb');

/**
 * Generic find function
 * @param {string} collectionName - MongoDB collection name
 * @param {object} filter - MongoDB filter query
 * @param {object} projection - MongoDB projection
 * @returns {Promise<Array>}
 */
const findDocuments = async (
  collectionName,
  filter = {},
  projection = {}
) => {
  const db = await getDB();

  return await db
    .collection(collectionName)
    .find(filter, { projection })
    .toArray();
};

/**
 * Generic bulkWrite function
 * @param {string} collectionName - MongoDB collection name
 * @param {Array} operations - Array of bulk write operations
 * @returns {Promise<BulkWriteResult>}
 */
const bulkWrite = async (collectionName, operations) => {
  const db = await getDB();
  return await db.collection(collectionName).bulkWrite(operations, { ordered: false });
};

/**
 * Add a new date field by parsing an existing string date field
 * @param {string} collectionName - MongoDB collection name
 * @param {object} filter - MongoDB filter query
 * @param {string} sourceDateField - Source field containing date string (e.g., 'sFullPaymentDate')
 * @param {string} targetDateField - Target field to store parsed Date (e.g., 'dCreatedAt')
 * @returns {Promise<BulkWriteResult>}
 */
const addParsedDateField = async (collectionName, filter, sourceDateField, targetDateField) => {
  const db = await getDB();
  
  // Find all documents matching the filter
  const documents = await db.collection(collectionName).find(filter).toArray();
  
  if (documents.length === 0) {
    return { matchedCount: 0, modifiedCount: 0 };
  }

  // Build bulk operations
  const operations = documents.map(doc => {
    const dateString = doc[sourceDateField];
    let parsedDate = null;

    if (dateString) {
      // Parse date format: "01/10/2025, 00:47:39 GMT" -> DD/MM/YYYY, HH:mm:ss GMT
      const [datePart, timePart] = dateString.split(', ');
      const [day, month, year] = datePart.split('/');
      const timeWithoutGMT = timePart.replace(' GMT', '');
      parsedDate = new Date(`${year}-${month}-${day}T${timeWithoutGMT}Z`);
    }

    return {
      updateOne: {
        filter: { _id: doc._id },
        update: { $set: { [targetDateField]: parsedDate } }
      }
    };
  });

  return await bulkWrite(collectionName, operations);
};

module.exports = {
  findDocuments,
//   bulkWrite,
  addParsedDateField
};
