const { getDB } = require('../../database/mongodb');
const defaultFromDateIST = new Date("2025-10-01T00:00:00+05:30"); // Nov 1st start
const defaultToDateIST = new Date("2025-12-31T23:59:59+05:30"); // Nov 30th end
const MAX_LIMIT = 100;


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
    .find(filter, projection )
    // .find(filter, { projection })
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

function validatePaginationParams(query = {}) {
  let {
    page = 1,
    limit = 20,
    search= "",
    from,
    to
  } = query;

  // Normalize numbers
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = page && limit ? (page - 1) * limit : 0;
  // skip = (page - 1) * limit;
  fromDate = from ? new Date(Number(from)) : defaultFromDateIST;
  toDate = to ? new Date(Number(to)) : defaultToDateIST;

  console.log({ fromDate, toDate });
  // Validation & defaults
  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;

  // Prevent abuse
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  if (skip !== undefined && (isNaN(skip) || skip < 0)) {
    skip = 0;
  }

  const searchValue =
    typeof search === "string" && search.trim().length > 0
      ? search.trim()
      : undefined;

  return {
    page,
    limit,
    skip,
    searchValue,
    fromDate,
    toDate
  };
}
function validatePaginationDateParams(query = {}) {
  let {
    // page = 1,
    // limit = 10000,
    // search= "",
    from,
    to
  } = query;

  // Normalize numbers
//   page = parseInt(page, 10);
//   limit = parseInt(limit, 10);
//   const skip = page && limit ? (page - 1) * limit : 0;
  // skip = (page - 1) * limit;
  fromDate = from ? new Date(Number(from)) : defaultFromDateIST;
  toDate = to ? new Date(Number(to)) : defaultToDateIST;

  console.log({ fromDate, toDate });
  // Validation & defaults
//   if (isNaN(page) || page < 1) page = 1;
//   if (isNaN(limit) || limit < 1) limit = 10;

//   // Prevent abuse
//   const MAX_LIMIT = 10000;
//   if (limit > MAX_LIMIT) limit = MAX_LIMIT;

//   if (skip !== undefined && (isNaN(skip) || skip < 0)) {
//     skip = 0;
//   }

//   const searchValue =
//     typeof search === "string" && search.trim().length > 0
//       ? search.trim()
//       : undefined;

  return {
    // page,
    // limit,
    // skip,
    // searchValue,
    fromDate,
    toDate
  };
}
module.exports = {
  findDocuments,
//   bulkWrite,
  addParsedDateField,
  validatePaginationParams,
  validatePaginationDateParams
};
