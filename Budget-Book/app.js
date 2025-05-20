const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const mongoose = require('mongoose')
const connectdb = require('./config/connectdb');
// const userAuth = require('./routes/auth.route')

const PORT = 8080 || process.env.PORT;
const app = express()
require('dotenv').config() 

app.use(cors());
app.use(express.json())
app.use(morgan('dev'))


// connectdb()
mongoose.connect(process.env.MONGO_URL)
const conn = mongoose.connection
conn.on("error", ()=>{
    console.log("error while connecting to DB")
})
conn.once("open", ()=>{
    console.log("connected to DB")
    // init();
})




// dono sahi hai bs yahan switch kro to correspondingly routes "auth.route" waale mein hi switch krna
app.use('/expensetracker/api/v1/auth', require('./routes/auth.route'))
app.use('/expensetracker/api/v1/transactions', require('./routes/transaction.route'))
// require('./routes/auth.route')(app);
// require('./routes/avatar.route')(app);

// console.log("calling users");
// require('./routes/allUsers.route')(app);
// require('./routes/messages.route')(app);


app.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`)
})


