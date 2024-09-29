require('../mongo')

const express = require('express')
const router = express.Router()

const Product = require('../models/Product')

router.get('/products', async (req, res)=>{
    const allProducts = await Product.find()
    res.json(allProducts)
})

module.exports = router


// const product = new Product({
//     nombre: "Pantalones vaqueros",
//     descripcion: "Jeans de mezclilla con diseño ajustado y elástico.",
//     categoria: "Pantalones",
//     talla: "32",
//     color: "Azul oscuro",
//     fit: "Slim",
//     genero: "Hombre",
//     temporada: "Invierno",
//     precio: 39.99,
//     cantidad: 30
// })

// const createProduct = async() =>{
//     try {
//         const res = await product.save()
//         console.log(res)
//     } catch (error) {
//         console.log(error)
//     }
// }

// createProduct()