import express from 'express';
import { createOrder, deleteOrder, getOrder, getOrderById, updateOrder } from '../controllers/order.controller.js';

const router = express.Router()

router
.post('/',createOrder)
.get('/',getOrder)
.get('/:id',getOrderById)
.put('/:id',updateOrder)
.delete('/:id',deleteOrder)

export default router