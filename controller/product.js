require('../mongo')

const express = require('express')
const router = express.Router()
const { uploadImg } = require('../middleware/storage')

const Product = require('../models/Product')
const User = require('../models/User')

router.get('/api/products', async (req, res) => {
  const data = await Product.find()
    .populate('usuario')
  res.json(data)
})

router.get('/api/products/:id', async (req, res) => {
  const { id } = req.params
  const data = await Product.findById(id)
  res.json(data)
})

router.post('/api/product', uploadImg.single('imgUrl'), async (req, res) => {
  try {
    const { nombre, descripcion, categoria, talla, color, fit, genero, temporada, precio, cantidad, userId } = req.body

    const user = await User.findById(userId)

    const data = new Product({
      nombre,
      imgUrl: '/uploads/' + req.file.filename,
      descripcion,
      categoria,
      talla,
      color,
      fit,
      genero,
      temporada,
      precio,
      cantidad,
      usuario: user._id
    })

    const createProduct = await data.save()
    user.productos = user.productos.concat(data._id)
    await user.save()
    res.status(201).json(createProduct)
  } catch (error) {
    console.error('Error al crear el producto:', error)
    res.status(500).json({ error: error.message })
  }
})

router.put('/api/product/:id', uploadImg.single('imgUrl'), async (req, res) => {
  try {
    const id = req.params.id
    const { nombre, descripcion, categoria, talla, color, fit, genero, temporada, precio, cantidad, estado } = req.body
    const data = {
      nombre,
      imgUrl: '/uploads/' + req.file.filename || '',
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
    console.error('Error al crear el producto:', error)
    res.status(500).json({ error: error.message })
  }
})

router.delete('/api/product/:id', async (req, res) => {
  try {
    const id = req.params.id

    const deleteProduct = await Product.findByIdAndDelete(id)
    res.status(200).json(deleteProduct)
  } catch (error) {
    console.error('Error al crear el producto:', error)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
