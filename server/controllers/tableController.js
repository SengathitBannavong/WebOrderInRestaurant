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

const addTable = async (req, res) => {
    try {
        const { tableIndex, tableStatus } = req.body;
        const newTable = new tableModel({ tableIndex, tableStatus });
        await newTable.save();
        res.json({ success: true, message: "Table added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding table" });
    }
}

const updateTableStatus = async (req, res) => {
    try {
        const { tableIndex, status } = req.body;
        const updatedTable = await tableModel.findOneAndUpdate(
            { tableIndex },
            { tableStatus: status },
            { new: true }
        );
        if (!updatedTable) {
            return res.json({ success: false, message: "Table not found" });
        }
        res.json({ success: true, message: "Table status updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating table status" });
    }
}

export { addTable, getAllTables, updateTableStatus };

