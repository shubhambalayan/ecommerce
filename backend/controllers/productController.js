const Product = require("../models/productModel")

// Create Proudct -- Admin
exports.createProduct = async (req, res, next)=>{
    const product = await Product.create(req.body)

    res.status(200).json({
        success:true,
        product
    })
}

// Get All Products
exports.getAllProducts = async (req, res)=>{

    const products = await Product.find()

    res.status(200).json({
        success:true,
        products
    })
}

// Get single product

exports.getSingleProduct = async (req, res, next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    res.status(200).json({
        success:true,
        product
    })
}

// Update Product -- Admin
exports.updateProduct = async (req, res, next)=>{

    let product = await Product.findById(req.params.id);
    
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found XD"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true, 
        useFindAndModify:false,
        runValidatros:true
    })

    res.status(200).json({
        success:true,
        product
    })

}

// Delete Product -- Admin

exports.deleteProduct = async (req, res)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not Found"
        })
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product has been deleted successfully"
    })
}