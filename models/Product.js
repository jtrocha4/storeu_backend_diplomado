const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String
  },
  descripcion: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  talla: {
    type: [String],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  fit: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    enum: ['Hombre', 'Mujer', 'Unisex'],
    required: true
  },
  temporada: {
    type: String
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  cantidad: {
    type: Number,
    required: true,
    min: 0
  },
  usuario: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  estado: {
    type: Number,
    required: true,
    enum: [0, 1],
    default: 1
  }
})

const Product = model('Product', productSchema)
productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = Product
