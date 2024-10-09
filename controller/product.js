require('../mongo')

const express = require('express')
const router = express.Router()

// const { uploadImg } = require('../middleware/storage')
const authorizationVerification = require('../middleware/authorizationVerification')

const Product = require('../models/Product')
const User = require('../models/User')

router.get('/api/products', async (req, res) => {
  const data = await Product.find()
    .populate('usuario')
  res.json(data)
})

router.get('/api/products/:tienda', async (req, res) => {
  const { tienda } = req.params
  const data = await Product.find()
    .populate({
      path: 'usuario',
      match: { _id: tienda }
    })
  res.json(data)
})

router.get('/api/products/:tienda/:id', async (req, res) => {
  try {
    const { tienda, id } = req.params
    const data = await Product.find({
      usuario: tienda,
      _id: id
    })
    res.json(data)
  } catch (error) {
    res.json({ error })
  }
})

router.post('/api/product', authorizationVerification, async (req, res) => {
  try {
    const { nombre, descripcion, categoria, talla, color, fit, genero, temporada, precio, cantidad, imgUrl } = req.body

    const userId = req.userId
    const userRole = req.userRole

    if (userRole === 'Administrador') {
      const user = await User.findById(userId)

      const data = new Product({
        nombre,
        imgUrl,
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
    } else {
      res.status(403).json({ error: 'Access denied: insufficient permissions' })
    }
  } catch (error) {
    console.error('Error al crear el producto:', error)
    res.status(500).json({ error: error.message })
  }
})

router.put('/api/product/:id', authorizationVerification, async (req, res) => {
  try {
    const id = req.params.id
    const userRole = req.userRole

    if (userRole === 'Administrador') {
      const { nombre, descripcion, categoria, talla, color, fit, genero, temporada, precio, cantidad, imgUrl, estado } = req.body
      const data = {
        nombre,
        imgUrl,
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
      const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
      res.status(200).json(updateProduct)
    } else {
      res.status(403).json({ error: 'Access denied: insufficient permissions' })
    }
  } catch (error) {
    console.error('Error al crear el producto:', error)
    res.status(500).json({ error: error.message })
  }
})

router.delete('/api/product/:id', authorizationVerification, async (req, res) => {
  try {
    const userRole = req.userRole
    if (userRole === 'Administrador') {
      const id = req.params.id
      const deleteProduct = await Product.findByIdAndDelete(id)
      res.status(200).json(deleteProduct)
    } else {
      res.status(403).json({ error: 'Access denied: insufficient permissions' })
    }
  } catch (error) {
    console.error('Error al crear el producto:', error)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
