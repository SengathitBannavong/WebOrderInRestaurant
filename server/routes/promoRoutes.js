import express from 'express';
import { addPromoCode, addUsedPromoCode, deletePromoCode, getAllPromoCodes, getPromoCodeByCode, getPromoCodeById, validatePromoCode } from '../controllers/promoCodeController.js';

const router = express.Router();

router.get('/', getAllPromoCodes);
router.get('/id/:id', getPromoCodeById);
router.get('/code/:code', getPromoCodeByCode);
router.get('/code/:code/validate', validatePromoCode);
router.put('/code/:code/used', addUsedPromoCode);
router.post('/', addPromoCode);
router.delete('/id/:id', deletePromoCode);

export default router;
