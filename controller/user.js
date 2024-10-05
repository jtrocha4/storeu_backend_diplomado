require('../mongo')

const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const User = require('../models/User')

router.get('/api/users', async (req, res) => {
  const data = await User.find()
    .populate('productos')
  res.json(data)
})

router.post('/api/user', async (req, res) => {
  try {
    const { nombreUsuario, nombre, apellido, correo, contrasena } = req.body

    const saltRounds = 10
    const hashContrasena = await bcrypt.hash(contrasena, saltRounds)

    const data = new User({
      nombreUsuario,
      nombre,
      apellido,
      correo,
      hashContrasena
    })

    const createUser = await data.save()
    res.status(201).json(createUser)
  } catch (error) {
    console.error('Error al crear el producto:', error)
    res.status(500).json({ error: error.message })
  }
})

router.put('/api/user/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { nombreUsuario, nombre, apellido, correo, contrasena, productos, rol } = req.body

    const saltRounds = 10
    const hashContrasena = await bcrypt.hash(contrasena, saltRounds)

    const data = {
      nombreUsuario,
      nombre,
      apellido,
      correo,
      hashContrasena,
      productos,
      rol
    }

    const updateUser = await User.findByIdAndUpdate(id, data, { new: true })
    res.status(200).json(updateUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
