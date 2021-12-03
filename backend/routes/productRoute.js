const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct  } = require("../controllers/productController")
const { registerUser, getUsers } = require("../controllers/userController")
const { isAuthenticatedUser } = require("../middleware/auth")


const router = express.Router()

router.get("/products", getAllProducts)
router.get("/product/:id", getSingleProduct)
router.post("/product/new", isAuthenticatedUser, createProduct)
router.put("/product/:id", isAuthenticatedUser, updateProduct)
router.delete("/product/:id", isAuthenticatedUser, deleteProduct)


module.exports = router