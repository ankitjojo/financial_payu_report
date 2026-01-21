const { setCharges, getConfigList } = require("../repositories/charges.repository");

const getConfigListController = async (req, res) => {
    try {
        // const { charge } = req.query;
        const configList = await getConfigList();
        return res.status(200).json({ success: true, data: configList });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error.message })
    }
}

const setConfigCharges = async (charge) => {
    try {
        // const {  charge } = req.body;
        const configList = await setCharges(charge);
        return { success: true, data: configList };
    } catch (error) {
        console.log(error)
        return { success: false, data: error.message }
    }
}
const setConfigChargesController = async (req, res) => {
    try {
        const { charge } = req.body;
        const configList = await setCharges(charge);
        return res.status(200).json({ success: true, data: configList });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = {
    getConfigListController, setConfigChargesController, setConfigCharges
}
