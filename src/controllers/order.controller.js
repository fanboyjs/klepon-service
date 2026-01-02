import Order from '../models/order.js'
import order_item from '../models/order_item.js'
import product from '../models/product.js'

export const createOrder = async (req,res)=>{
    try {
        const {customerName, customerPhone, pickupDate, totalPrice, status, products} = req.body
        const data = {
            customerName,
            customerPhone,
            pickupDate,
            totalPrice,
            status
        }

        const order = await Order.create(data)

        // Loop dan buat order items
        const orderItems = []
        for (const product of products) {
            const itemData = {
                orderId: order._id,
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: product.qty,
                subtotal: product.price * product.qty
            }
            const orderItem = await order_item.create(itemData)
            orderItems.push(orderItem)
        }

        res.status(200).json({msg:"Order created success", order, orderItems})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getOrder = async (req,res)=>{
    try {
        const orders = await Order.find().sort({createdAt:-1})
        res.status(200).json({msg:"get order success",orders})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getOrderById = async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id)
        if(!order) return res.status(400).json({msg:"order not found"})
        res.status(200).json({msg:`success get order ${req.params.id}`,order})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}


export const updateOrder = async (req,res)=>{
    try {
        const order = await Order.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!order) return res.status(400).json({msg:"order not found"})
        res.status(200).json({msg:`success get order ${req.params.id}`, order})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const deleteOrder = async (req,res)=>{
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        if(!order) return res.status(400).json(({msg:"order not found"}))
        res.status(200).json({msg:`success delete order ${req.params.id}`,order})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}