require('mongoose')

const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/', async (req, res) => {
  try {
    const { nombreUsuario, contrasena } = req.body

    const user = await User.findOne({ nombreUsuario })

    const passwordCorrect =
    (user === null)
      ? false
      : await bcrypt.compare(contrasena, user.hashContrasena)

    if (!(user && passwordCorrect)) {
      res.status(401).json({ error: 'invalid user or password' })
    } else {
      const userForToken = {
        userName: user.nombreUsuario,
        name: user.nombre,
        id: user._id
      }

      const token = jwt.sign(userForToken, process.env.SECRETKEY)
      res.status(200).json(token)
    }
  } catch (error) {
    res.status(400).json(error).end()
  }
})

module.exports = router
