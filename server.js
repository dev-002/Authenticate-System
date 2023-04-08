const express = require('express')
const ejs = require("ejs")

const app = express();

app.set("view engine", "ejs")
app.set('views', __dirname + '/views');

//Route
const indexRoute = require('./routes/index')

app.use('/', indexRoute)

app.listen(process.env.PORT || 5000 , ()=> console.log("Server is Running ...."))