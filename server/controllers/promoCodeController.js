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

// Add a new promo code
const addPromoCode = async (req, res) => {
    try {
        const { code, discount } = req.body;
        if (!code || !discount) return res.status(400).json({ success: false, message: "Missing code or discount" });
        const exists = await promoCodeModel.findOne({ code });
        if (exists) return res.status(400).json({ success: false, message: "Promo code already exists" });
        const promo = new promoCodeModel({ code, discount });
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
        const { code } = req.query;
        if (!code) return res.status(400).json({ success: false, message: "Missing code" });
        const promo = await promoCodeModel.findOne({ code: code.trim().toLowerCase() });
        if (!promo) return res.status(404).json({ success: false, message: "Promo code not found" });
        res.json({ success: true, data: promo });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error validating promo code" });
    }
};

export { getAllPromoCodes, addPromoCode, deletePromoCode, validatePromoCode };
