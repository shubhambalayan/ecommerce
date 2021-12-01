const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apiFeatures")

// Create Proudct -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next)=>{
    const product = await Product.create(req.body)

    res.status(200).json({
        success:true,
        product
    })
})

// Get All Products
exports.getAllProducts = async (req, res)=>{

    const resultPerPage = 5
    const productCount = await Product.countDocuments()

    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query

    res.status(200).json({
        success:true,
        products,
        productCount
    })
}

// Get single product

exports.getSingleProduct = catchAsyncErrors(async (req, res, next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success:true,
        product
    })
})

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next)=>{

    let product = await Product.findById(req.params.id);
    
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
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

})

// Delete Product -- Admin

exports.deleteProduct = catchAsyncErrors(async (req, res)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product has been deleted successfully"
    })
})