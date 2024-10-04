require('mongoose')

const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

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
      res.status(200).json(user)
    }
  } catch (error) {
    res.status(400).json(error).end()
  }
})

module.exports = router
