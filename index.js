require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()


const productController = require('./controller/product')

app.get('/', (req, res)=>{
    res.send('<h1>Storeu-Api</h1>')
})

app.use('/', productController)

const PORT = process.env.PORT || 3002
app.listen(PORT)

console.log(`Server running on port http://localhost:${PORT}`)