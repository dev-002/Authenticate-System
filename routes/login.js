const express = require('express');
const User = require('../models/userSchema');

const router = express.Router();

async function authenticate({ username, password }) {
    try {
        const user = await User.findOne({ username: username, password: password });
        // user is array of all the matched data
        return user;
        // but since this is a async function it will return a promise
    }
    catch (e) {
        console.log(e.message);
    }
};

async function userCreate({ name, username, password }) {
    try {
        const user = await User.create({ name, username, password });
    }
    catch (e) {
        console.log(e.message);
    }
};

router.get('/login', (req, res) => {
    res.render('signForm', { userflag: false });
});

router.post('/login', async (req, res) => {
    try {
        const user = await authenticate(req.body);
        if (user !== null) {
            res.render('loggedin', { ...req.body, alertflag: false });
        }
        else
            res.render('signForm', { ...req.body, userflag: true });
    }
    catch (e) {
        console, log(e.message);
    }
});

router.post('/signup', (req, res) => {

    userCreate(req.body);

    res.render('loggedin', { ...req.body, alertflag: true })
});

module.exports = router;