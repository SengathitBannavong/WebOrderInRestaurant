import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    tableIndex: { type: String, required: true },
    tableStatus: { type: String, default: "Available" },
}, { collection: "Table" });

const tableModel = mongoose.models.table || mongoose.model("table", tableSchema);
export default tableModel;