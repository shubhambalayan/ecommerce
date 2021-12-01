const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct  } = require("../controllers/productController")

const router = express.Router()

router.get("/products", getAllProducts)
router.get("/product/:id", getSingleProduct)
router.post("/product/new", createProduct)
router.put("/product/:id", updateProduct)
router.delete("/product/:id", deleteProduct)



module.exports = router