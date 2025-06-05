import express from 'express';
import { addTable, getAllTables, updateTableStatus } from '../controllers/tableController.js';

const tableRouter = express.Router();

tableRouter.get('/list', getAllTables);
tableRouter.post('/add', addTable);
tableRouter.put('/status', updateTableStatus);

export default tableRouter;