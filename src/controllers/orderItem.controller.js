import OrderItem from '../models/order_item.js'

export const createOrderItem = async (req,res)=>{
    try {
        const {orderID, productID, productName, price, quantity, subtotal} = req.body
        const data = {
            orderID,
            productID,
            productName,
            price,
            quantity,
            subtotal
        }

        const orderItem = await OrderItem.create(data)
        res.status(200).json({msg:"OrderItem created success", orderItem})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getOrderItem = async (req,res)=>{
    try {
        const orderItem = (await OrderItem.find()).sort({createdAt:-1})
        res.status(200).json({msg:"get Order Item Success", orderItem})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getOrderItemById = async (req,res)=>{
    try {
        const orderItem = await OrderItem.findById(req.params.id)
        if(!orderItem) return res.status(400).json({msg:"order not found"})
        res.status(200).json({msg:`success get order item ${req.params.id}`,orderItem})
    } catch (error) {
        req.status(500).json({msg:error.message})
    }
}

export const updateOrderItem = async (req,res)=>{
    try {
        const orderItem = await OrderItem.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!orderItem) return res.status(400).json({msg:"orderitem not found"})
        res.status(200).json({msg:`success get order Item ${req.params.id}`, order})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const deleteOrderItem = async (req,res)=>{
    try {
        const orderItem = await OrderItem.findByIdAndDelete(req.params.id)
        if(!orderItem) return res.status(400).json(({msg:"orderItem not found"}))
        res.status(200).json({msg:`success delete orderItem ${req.params.id}`,orderItem})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}