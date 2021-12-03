const express = require("express")
const products = require("./routes/productRoute")
const user = require("./routes/userRoute")
const cookieParser = require("cookie-parser")

const app = express()

const errorMiddleware = require("./middleware/error")

app.use(express.json())
app.use(cookieParser())

// Route Imports

app.use("/api/v1", user)
app.use("/api/v1", products);

// middleware for error
app.use(errorMiddleware)


module.exports = app