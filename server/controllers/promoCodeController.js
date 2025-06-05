import promoCodeModel from "../model/promoCodeModel.js";

// Get all promo codes
const getAllPromoCodes = async (req, res) => {
    try {
        const codes = await promoCodeModel.find({});
        res.json({ success: true, data: codes });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving promo codes" });
    }
};

// Get a single promo code by ID
const getPromoCodeById = async (req, res) => {
    try {
        const { id } = req.params;
        const promo = await promoCodeModel.findById(id);
        if (!promo) return res.status(404).json({ success: false, message: "Promo code not found" });
        res.json({ success: true, data: promo });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving promo code" });
    }
}

// Get a single promo code by code
const getPromoCodeByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const promo = await promoCodeModel.findOne({ code: code.trim().toLowerCase() });
        if (!promo) return res.status(404).json({ success: false, message: "Promo code not found" });
        res.json({ success: true, data: promo });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving promo code" });
    }
}

const addUsedPromoCode = async (req,res) => {
    try {
        const { code } = req.params;
        const promo = await promoCodeModel.findOne({ code: code.trim().toLowerCase() });
        if (!promo) res.status(404).json({ success: false, message: "Promo code not found" });
        if (promo.used >= promo.capacity) res.status(400).json({ success: false, message: "Promo code capacity reached" });
        promo.used += 1;
        await promo.save();
        return res.json({ success: true, data: promo });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error updating promo code" });
    }
}

// Add a new promo code
const addPromoCode = async (req, res) => {
    try {
        let { code, discount, capacity } = req.body;
        if (!code || discount === undefined) return res.status(400).json({ success: false, message: "Missing code or discount" });
        code = code.trim().toLowerCase(); // Normalize code
        if (typeof discount !== 'number' || discount <= 0) return res.status(400).json({ success: false, message: "Discount must be a positive number" });
        if (typeof capacity !== 'number' || capacity <= 0) return res.status(400).json({ success: false, message: "Capacity must be a positive number" });
        const exists = await promoCodeModel.findOne({ code });
        if (exists) return res.status(400).json({ success: false, message: "Promo code already exists" });
        const promo = new promoCodeModel({ code, discount, capacity });
        await promo.save();
        res.json({ success: true, data: promo });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding promo code" });
    }
};

// Delete a promo code
const deletePromoCode = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await promoCodeModel.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, message: "Promo code not found" });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting promo code" });
    }
};

// Validate a promo code
const validatePromoCode = async (req, res) => {
    try {
        const { code } = req.params;
        if (!code) return res.status(400).json({ success: false, message: "Missing code" });
        const promo = await promoCodeModel.findOne({ code: code.trim().toLowerCase() });
        if (!promo) return res.status(404).json({ success: false, message: "Promo code not found" });
        if (promo.used >= promo.capacity) return res.status(200).json({ success: false, message: "Promo code capacity reached" });
        res.json({ success: true, data: promo });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error validating promo code" });
    }
};

export { addPromoCode, addUsedPromoCode, deletePromoCode, getAllPromoCodes, getPromoCodeByCode, getPromoCodeById, validatePromoCode };

