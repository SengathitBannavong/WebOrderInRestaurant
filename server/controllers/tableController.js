import tableModel from '../model/tableModel.js';

const getAllTables = async (req, res) => {
    try {
        const tables = await tableModel.find({});
        res.json({ success: true, data: tables });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { getAllTables };