const express = require("express")
const { registerUser, getUsers, loginUser, logout } = require("../controllers/userController")

const router = express.Router()

router.post("/register", registerUser)
router.get("/users", getUsers)
router.post("/login", loginUser)
router.get("/logout", logout)

module.exports = router