import Product from "../models/product.js";
import { request, response } from "express";

export const createProduct = async (req, res)=>{
    try {
        const {name, description, price, category, imageUrl,isActive}= req.body
        const data = {
            name,
            description,
            price,
            category,
            imageUrl,
            isActive
        }
        const product = await Product.create(data)
        res.status(200).json({msg:"Product created success",product})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getProduct = async (req,res)=>{
    try {
        const products = await Product.find().sort({createdAt:-1})
        res.status(200).json({msg:"get product success",products})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getProductById = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        if(!product) return res.status(400).json({msg:"product not found"})
        res.status(200).json({msg:`success get product ${req.params.id}`,product})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const updateProduct = async (req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if(!product) return res.status(400).json({msg:"product not found"})
        res.status(200).json({msg:`success get product ${req.params.id}`,product})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const deleteProduct = async (req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product) return res.status(400).json(({msg:"product not found"}))
            res.status(200).json({msg:`succes delete product ${req.params.id}`,product})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}