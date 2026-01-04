import express from 'express';
import { createOrderItem, deleteOrderItem, getOrderItem, getOrderItemById, updateOrderItem } from '../controllers/orderItem.controller.js';

const router = express.Router()

router
.post('/',createOrderItem)
.get('/',getOrderItem)
.get('/:id',getOrderItemById)
.put('/:id',updateOrderItem)
.delete('/:id',deleteOrderItem)

export default router