require('../mongo')

const express = require('express')
const router = express.Router()
const {uploadImg} = require('../middleware/storage')

const Product = require('../models/Product')

router.get('/api/products', async (req, res)=>{
    data = await Product.find()
    res.json(data)
})

router.get('/api/products/:id', async (req, res)=>{
    const {id} = req.params
    data = await Product.findById(id)
    res.json(data)
})

router.post('/api/product', uploadImg.single('imgUrl') ,async(req, res)=>{
    
    const {nombre, imgUrl, descripcion, categoria, talla, color, fit, genero, temporada, precio, cantidad} = req.body

    try {
        const product = new Product({
            nombre, 
            imgUrl: '/uploads/'+req.file.filename, 
            descripcion, 
            categoria, 
            talla, 
            color, 
            fit, 
            genero, 
            temporada, 
            precio, 
            cantidad
        })

        const createProduct = await product.save()
        res.status(201).json(createProduct)

    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: error.message })
    }

})

module.exports = router