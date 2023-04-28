const express = require('express');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

const router = express.Router();

async function authenticate({ username, password }) {
    try {
        const user = await User.findOne({ username: username });
        const hashedpassword = user && await bcrypt.compare(password, user.password);
        // user is object of the matched data
        return hashedpassword ? user : null;
        // but since this is a async function it will return a promise
    }
    catch (e) {
        console.log(e.message);
    }
};

async function userCreate({ name, username, password }) {
    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        await User.create({ name, username, password: hashedpassword });
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
            res.cookie('logged', 'true', {
                expires: new Date(2025-05-17)
            });
            res.render('loggedin', { ...req.body, alertflag: false });
        }
        else
            res.render('signForm', { ...req.body, userflag: true });
        // rendering from the post route 
        // forecully requires us to resubmit the form details
    }
    catch (e) {
        console.log(e.message);
    }
});

router.post('/signup', (req, res) => {

    userCreate(req.body);

    res.render('loggedin', { ...req.body, alertflag: true })
});

module.exports = router;