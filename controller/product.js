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
    try {
        const {nombre, imgUrl, descripcion, categoria, talla, color, fit, genero, temporada, precio, cantidad} = req.body

        const data = new Product({
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

        const createProduct = await data.save()
        res.status(201).json(createProduct)

    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: error.message })
    }

})

router.put('/api/product/:id', uploadImg.single('imgUrl') ,async(req, res)=>{
    try {
        const id = req.params.id
        const {nombre, imgUrl, descripcion, categoria, talla, color, fit, genero, temporada, precio, cantidad, estado} = req.body
        const data = {
            nombre, 
            imgUrl: '/uploads/'+req.file.filename || '', 
            descripcion, 
            categoria, 
            talla, 
            color, 
            fit, 
            genero, 
            temporada, 
            precio, 
            cantidad,
            estado
        }

        console.log(id)
        console.log(req.body)

        // const updateProduct = await Product.findByIdAndUpdate(id, data, {new: true})
        const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
        res.status(200).json(updateProduct)

    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: error.message })
    }
})

router.delete('/api/product/:id', async(req, res)=>{
    try {
        const id = req.params.id 

        const deleteProduct = await Product.findByIdAndDelete(id)
        res.status(200).json(deleteProduct)
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: error.message })
    }
})

module.exports = router