const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const cookieParse = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

const {passportInitialize} = require('./passportConfig');
passportInitialize(passport);

const app = express();
app.use(passport.initialize());
// app.use(passport.session());
app.use(session({
    secret: 'Hello',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParse());

// Mongoose Database
const dburl = process.env.DB_URL || 'mongodb://localhost:27017/Authentication-System'
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection-error"));
db.once("open", () => console.log("Database Connected"));

//Route
const indexRoute = require('./routes/index');
const authenticateRoute = require('./routes/login');
const secretMessageRoute = require('./routes/secret');
const authGoogleRoute = require('./routes/authGoogle');

app.use('/', indexRoute);
app.use('/form', authenticateRoute);
app.use('/secret', secretMessageRoute);
app.use('/auth/google', authGoogleRoute);

app.listen(process.env.PORT || 5000, () => console.log("Server is Running ...."));