const express = require("express")
const products = require("./routes/productRoute")

const app = express()

const errorMiddleware = require("./middleware/error")

app.use(express.json())

// Route Imports

app.use("/api/v1", products);


// middleware for error
app.use(errorMiddleware)


module.exports = app