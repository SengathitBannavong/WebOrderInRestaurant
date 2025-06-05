import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    capacity: { type: Number, required: true },
    used: { type: Number, default: 0 },
}, { collection: "promocodes" });

const promoCodeModel = mongoose.models.promocode || mongoose.model("promocode", promoCodeSchema);
export default promoCodeModel;
