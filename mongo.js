require('dotenv').config()

const mongoose = require('mongoose')

const connectionString = process.env.CONNECTION_MONGODB

const connectionDB = async() =>{
    try {
        await mongoose.connect(connectionString)
        console.log('Database connected')
    } catch (error) {
        console.log(error)
    }
}

connectionDB()