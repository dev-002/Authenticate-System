const express = require('express');
const mongoose = require('mongoose');
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));

// Mongoose Database
const dburl = process.env.DB_URL || 'mongodb://localhost:27017/Authentication-System'
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection-error"));
db.once("open", ()=>console.log("Database Connected"));

//Route
const indexRoute = require('./routes/index');
const authenticateRoute = require('./routes/login');

app.use('/', indexRoute);
app.use('/form', authenticateRoute);

app.listen(process.env.PORT || 5000 , ()=> console.log("Server is Running ...."));