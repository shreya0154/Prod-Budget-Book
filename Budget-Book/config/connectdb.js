const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
// const userAuth = require('./routes/auth.route')

const PORT = 8080 || process.env.PORT;
const app = express()
require('dotenv').config()

app.use(cors());
app.use(express.json())
app.use(morgan('dev'))


const mongoose = require('mongoose')

const connectdb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`server running on ${mongoose.connection.host}`.bgCyan.white)
    }
    catch(error){
        console.log(`${error}`.bgRed)
    }
}

module.exports = connectdb