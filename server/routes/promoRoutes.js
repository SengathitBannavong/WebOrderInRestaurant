import express from 'express';
import { getAllPromoCodes, addPromoCode, deletePromoCode, validatePromoCode } from '../controllers/promoCodeController.js';

const router = express.Router();

router.get('/', getAllPromoCodes);
router.post('/', addPromoCode);
router.delete('/:id', deletePromoCode);
router.get('/validate', validatePromoCode);

export default router;
