const mongoose = require("mongoose");
require('dotenv').config()

let mongoURL = process.env.REACT_APP_MONGO_URL

mongoose.connect(mongoURL, {useUnifiedTopology:true, useNewUrlParser:true})

let db = mongoose.connection

db.on("connected", () => {
    console.log(`Mongo DB Connected Successfull`)
})

db.on('error', () => {
    console.log(`Mongo DB Connection Failed`)
})

module.exports = mongoose;