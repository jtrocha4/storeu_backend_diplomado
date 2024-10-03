require('../mongo')

const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const User = require('../models/User')

router.get('/api/users', async(req, res)=>{
    const data = await User.find()
    res.json(data)
})

router.post('/api/user', async(req, res)=>{
    try {
        const {nombreUsuario, nombre, apellido, correo, contrasena} = req.body

        const saltRounds  = 10
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
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
