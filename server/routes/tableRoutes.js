import express from 'express';
import { getAllTables } from '../controllers/tableController.js';

const tableRouter = express.Router();

tableRouter.get('/list', getAllTables);

export default tableRouter;