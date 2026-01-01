import Order from '../models/order.js'
import orderItem from '../models/order_item.js'
import product from '../models/product.js'

export const createOrder = async (req,res)=>{
    try {
        const {orderNumber, customerName, customerPhone, pickupDate,totalPrice, status, products} = req.body
        const data = {
            orderNumber,
            customerName,
            customerPhone,
            pickupDate,
            totalPrice,
            status
        }

        // const order = await Order.create(data)

        products.forEach(product => {
            console.log(product)
        });
        // const orderItem = await orderItem.create(products)
        res.status(200).json({msg:"Order created success"})
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