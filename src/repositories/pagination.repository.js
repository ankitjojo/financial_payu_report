const { getDB } = require("../../database/mongodb");

/**
 * Generic pagination function for MongoDB (native driver)
 */
async function paginateQuery({
  collectionName,
  fixedFilter = {},
  page = 1,
  limit = 10,
  skip,
  searchValue,
  searchFields = [],
    projection = {} // 👈 NEW
}) {
  const db = await getDB();
  const collection = db.collection(collectionName);
//   const fixedFilter
  // Calculate skip if not explicitly passed
  const calculatedSkip = skip ?? (page - 1) * limit;

  // Build search query
  let query = {};
  if (searchValue && searchFields.length > 0) {
    query.$or = searchFields.map((field) => ({
      [field]: { $regex: searchValue, $options: "i" }
    }));
  }
 const finalFilter = {...fixedFilter,...query}
  // Execute queries
  const [data, totalCount, finalData] = await Promise.all([
    collection
      .find(finalFilter, { projection }) // 👈 projection applied here
      .sort({ dInvoiceCreatedAt: 1 })
      .skip(calculatedSkip)
      .limit(limit)
      .toArray(),
    collection.countDocuments(finalFilter),
    //  collection
    //   .find(finalFilter, { projection }) // 👈 projection applied here
    // //   .sort({ dInvoiceCreatedAt: 1 })
    // //   .skip(calculatedSkip)
    // //   .limit(limit)
    //   .toArray(),
  ]);

  return {
    data,
    finalData,
    pagination: {
      totalRecords: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      limit,
      skip: calculatedSkip,
      hasNextPage: calculatedSkip + limit < totalCount,
      hasPreviousPage: page > 1
    }
  };
}

module.exports = { paginateQuery };
