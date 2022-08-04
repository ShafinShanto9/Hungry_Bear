const mongoose = require('mongoose')
require("dotenv").config();

const URL = `mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.8oki3.mongodb.net/${process.env.MONGO_DB_DATABASE}`

mongoose.connect(URL)

let connectionObj = mongoose.connection

connectionObj.on('connected', () => {
    console.log("mongoose connetcion succesfull");
})
connectionObj.on('error', () => {
    console.log("mongoose connetcion failed");
})



