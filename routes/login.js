const express = require('express');
const User = require('../models/userSchema');

const router = express.Router();

async function authenticate({ username, password }) {
    const user = await User.find({ username: username, password: password });
    return user;
};

async function userCreate({ name, username, password }) {
    try {
        const user = await User.create({ name, username, password });
        await user.save();
    }
    catch (e) {
        console.log(e.message);
    }
};

router.get('/login', (req, res) => {
    res.render('signForm');
});

router.post('/login', (req, res) => {
    const user = authenticate(req.body);
    console.log(user);
    if (user !== []) {
        res.render('loggedin', { ...req.body });
    }
    else
        res.render('signForm');
});

router.post('/signup', (req, res) => {

    userCreate(req.body);

    res.render('loggedin', { ...req.body })
});

module.exports = router;