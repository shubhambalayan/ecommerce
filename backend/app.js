const express = require("express")
const products = require("./routes/productRoute")

const app = express()


app.use(express.json())

// Route Imports

app.use("/api/v1", products);



module.exports = app