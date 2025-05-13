import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
}, { collection: "promocodes" });

const promoCodeModel = mongoose.models.promocode || mongoose.model("promocode", promoCodeSchema);
export default promoCodeModel;
