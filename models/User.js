const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  hashContrasena: {
    type: String,
    required: true
  },
  productos: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  rol: {
    type: String,
    required: true,
    enum: ['Administrador', 'Usuario'],
    default: 'Usuario'
  },
  estado: {
    type: Number,
    required: true,
    enum: [0, 1],
    default: 1
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.hashContraseña
  }
})

const User = model('User', userSchema)
module.exports = User
