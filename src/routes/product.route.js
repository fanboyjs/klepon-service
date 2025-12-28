import express from 'express';
import { createProduct, deleteProduct, getProduct, getProductById, updateProduct } from '../controllers/product.controller.js';

const router = express.Router()

router
.post('/',createProduct)
.get('/',getProduct)
.get('/:id',getProductById)
.put('/:id',updateProduct)
.delete('/:id',deleteProduct)

export default router