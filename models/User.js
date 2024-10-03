const {Schema, model} = require('mongoose')

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
    estado: {
        type: Number,
        required: true,
        enum: [0, 1],
        default: 1
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.hashContraseña
    }
})

const User = model('user', userSchema)
module.exports = User