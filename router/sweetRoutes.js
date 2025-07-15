import express from 'express';
import { addSweet } from '../controller/add.js';
import { deleteSweet } from '../controller/delete.js';
import { updateSweet } from '../controller/update.js';
import { viewAllSweets } from '../controller/viewAll.js';
import { searchSweets } from '../controller/search.js';
import { purchaseSweet } from '../controller/purchase.js';
import { restockSweet } from '../controller/restock.js';

const router = express.Router();

router.post('/add', addSweet);
router.delete('/delete/:id', deleteSweet);
router.put('/update/:id', updateSweet);
router.get('/view', viewAllSweets);
router.get('/search', searchSweets);
router.post('/purchase/:id', purchaseSweet);
router.post('/restock/:id', restockSweet);

export default router;
