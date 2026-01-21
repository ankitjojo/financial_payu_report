const { getDB } = require('../../database/mongodb');
const DB_COLLECTION = require('../../database/dbTables');

async function getConfigList(){
    const db = await getDB();
    // const ChargesCollection = db.collection(DB_COLLECTION.CHARGES);
    // const configList = await db.collection(DB_COLLECTION.CHARGES).find({},{projection:{name:1,_id:0}}).toArray();
    const configList = await db
  .collection(DB_COLLECTION.CHARGES)
  .distinct("name");

    return configList;
}

async function getChargesByName(chargeName) {
  const db = await getDB();
  const projection = { projection: { _id: 0} }
  const ChargesCollection = db.collection(DB_COLLECTION.CHARGES);
  // Try to fetch requested plan
  let config = await ChargesCollection.findOne({ name: chargeName },projection);

  // Fallback to default if not found
  if (!config) {
    config = await ChargesCollection.findOne({ name: 'default' },projection);
  }
  console.log("config-- called here --",config);
  return config;
}

let cachedCharges = {};
let CHARGES = {}; // mutable, shared object

async function setCharges(chargeName = 'default', useCache = false) {
  if (useCache && cachedCharges[chargeName]) {
    return cachedCharges[chargeName];
  }

  const config = await getChargesByName(chargeName);
   if(!config){
    console.log("No config found in DB *---");
    throw new Error("No config found in DB-----");
    // return STATIC_CHARGES;
   }
  // Remove internal fields if needed
//   const { _id, name, ...CHARGES } = config;

//   // Cache
//   cachedCharges[chargeName] = CHARGES;
  CHARGES = config;
  return config;
}

 function getConfigCharges() {
    return CHARGES;
}

async function getSpecificCharges(name="default"){
    if(CHARGES && CHARGES.name === name){
        return CHARGES;
    }
    return await setCharges(name);
}

/**
 * Clear the cached charges (call after updating DB)
 */
function clearChargesCache() {
  cachedCharges = {};
}

module.exports = { setCharges, clearChargesCache,getChargesByName,getConfigCharges,getConfigList,getSpecificCharges };




