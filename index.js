require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const productController = require('./controller/product')
const userController = require('./controller/user')

app.get('/', (req, res) => {
  res.send('<h1>Storeu-Api</h1>')
})

app.use('/', productController)
app.use('/', userController)

const PORT = process.env.PORT || 3002
app.listen(PORT)

console.log(`Server running on port http://localhost:${PORT}`)
