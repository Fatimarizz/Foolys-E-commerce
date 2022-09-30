const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('dotenv').config({ path: './config.env' })
const PORT = process.env.PORT || 5000;
//Model require
// const user = require('./models/userModel')
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};
//Middleware
app.use(cors(corsOptions))
app.use(express.json())// json ka data ko convert krdo object ma

app.use("/api",require('./routes/auth.js'))

//db connection 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Fatima:2410@cluster0.tc37i7k.mongodb.net/Foolys')
mongoose.connection.on('connected', () => {
    console.log("database connected");
})
mongoose.connection.on('error', () => {
    console.log("database error occured");
})

app.listen(PORT , () => {
    console.log('http://localhost:5000/')
})

// 3rd step of heruko 
if (process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    }
    )
}