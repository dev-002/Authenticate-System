const express = require('express')
const ejs = require("ejs")

const app = express();

app.set("view engine", "ejs")
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}))

//Route
const indexRoute = require('./routes/index')
const verifyRoute = require('./routes/verify')

app.use('/', indexRoute)
app.use('/verify', verifyRoute)

app.listen(process.env.PORT || 5000 , ()=> console.log("Server is Running ...."))